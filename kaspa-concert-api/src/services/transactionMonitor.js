/**
 * Transaction Monitor – Subscribes to Kaspa RPC (or mock), confirms inclusion, triggers TIP_CONFIRMED.
 * userFlow §6.3, §8. When KASPA_RPC_URL is set, polls Kaspa API for tx acceptance; otherwise mock confirm after delay.
 */

import config from '../config.js'
import { getSession, recordConfirmedTip } from './sessionService.js'

/** @type {(payload: TipPayload) => void} */
let emitConfirmed = () => {}

/**
 * Register callback to emit TIP_CONFIRMED to WebSocket room.
 * @param {function} fn - (payload) => void
 */
export function setEmitConfirmed(fn) {
  emitConfirmed = fn
}

/**
 * Tip payload shape (pending and confirmed).
 * @typedef {object} TipPayload
 * @property {string} tipId
 * @property {string} sessionId
 * @property {number} amount
 * @property {string} from
 * @property {string} txHash
 * @property {'pending'|'confirmed'} status
 * @property {string} timestamp - ISO string
 */

/**
 * Start watching a tip: emit TIP_PENDING immediately; then confirm (mock or real).
 * @param {TipPayload} payload - Must have status: 'pending', tipId, sessionId, amount, from, txHash, timestamp
 */
export function watchTip(payload) {
  const sessionId = payload.sessionId
  const session = getSession(sessionId)
  if (!session || session.status !== 'live') return

  if (config.kaspaRpcUrl) {
    confirmViaKaspaRpc(payload)
  } else {
    setTimeout(() => {
      recordConfirmedTip(sessionId, payload.amount)
      emitConfirmed({ ...payload, status: 'confirmed', timestamp: new Date().toISOString() })
    }, config.mockConfirmDelayMs)
  }
}

const POLL_INTERVAL_MS = 4000
const MAX_POLL_ATTEMPTS = 75 // ~5 minutes

/**
 * Normalize tx hash for Kaspa API: 64-char hex, no 0x prefix.
 * @param {string} txHash
 * @returns {string}
 */
function normalizeTxId(txHash) {
  const s = String(txHash).trim().toLowerCase()
  return s.startsWith('0x') ? s.slice(2) : s
}

/**
 * Kaspa Developer Platform (api.kas.fyi): path /v1/transactions/{id}, response { transaction: { isAccepted } }.
 * Kaspa REST server (api.kaspa.org): path /transactions/{id}, no API key; 200 = tx found = accepted.
 */
function isKaspaFyiApi(baseUrl) {
  return String(baseUrl).toLowerCase().includes('api.kas.fyi')
}

/**
 * Poll Kaspa API for transaction acceptance, then emit TIP_CONFIRMED.
 * Supports:
 * - https://api.kaspa.org — GET /transactions/{txId}, no API key; 200 = confirmed.
 * - https://api.kas.fyi — GET /v1/transactions/{txId}, x-api-key; response.transaction.isAccepted.
 * @param {TipPayload} payload
 */
async function confirmViaKaspaRpc(payload) {
  const txId = normalizeTxId(payload.txHash)
  const useKaspaFyi = isKaspaFyiApi(config.kaspaRpcUrl)
  const path = useKaspaFyi ? `/v1/transactions/${txId}` : `/transactions/${txId}`
  const url = `${config.kaspaRpcUrl}${path}`
  const headers = { Accept: 'application/json' }
  if (useKaspaFyi && config.kaspaApiKey) {
    headers['x-api-key'] = config.kaspaApiKey
  }

  let attempts = 0

  const poll = async () => {
    attempts += 1
    const session = getSession(payload.sessionId)
    if (!session || session.status !== 'live') return

    try {
      const res = await fetch(url, { headers })
      if (!res.ok) {
        if (res.status === 404) {
          if (attempts < MAX_POLL_ATTEMPTS) setTimeout(poll, POLL_INTERVAL_MS)
          return
        }
        if (attempts < MAX_POLL_ATTEMPTS) setTimeout(poll, POLL_INTERVAL_MS)
        return
      }

      const data = await res.json()

      if (useKaspaFyi) {
        const tx = data?.transaction
        if (tx && tx.isAccepted === true) {
          recordConfirmedTip(payload.sessionId, payload.amount)
          emitConfirmed({ ...payload, status: 'confirmed', timestamp: new Date().toISOString() })
          return
        }
      } else {
        // api.kaspa.org: 200 means tx found (indexer returns accepted txs)
        if (data && (data.transactionId === txId || data.transaction_id === txId || data.id === txId || Object.keys(data).length > 0)) {
          recordConfirmedTip(payload.sessionId, payload.amount)
          emitConfirmed({ ...payload, status: 'confirmed', timestamp: new Date().toISOString() })
          return
        }
      }

      if (attempts < MAX_POLL_ATTEMPTS) setTimeout(poll, POLL_INTERVAL_MS)
    } catch (err) {
      if (attempts < MAX_POLL_ATTEMPTS) setTimeout(poll, POLL_INTERVAL_MS)
    }
  }

  setTimeout(poll, POLL_INTERVAL_MS)
}
