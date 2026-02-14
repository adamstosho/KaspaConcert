/**
 * Validation Layer – Ensures tx amount matches session, address integrity, no duplicate events.
 * userFlow §6.4.
 */

import { getSession } from './sessionService.js'

const seenTxHashes = new Map() // sessionId -> Set of txHash

const MIN_TIP_KAS = 0.0001
const MAX_TIP_KAS = 1_000_000

/**
 * Validate create session body.
 * @param {object} body - { title, streamUrl, creatorAddress }
 * @returns {{ valid: boolean, error?: string }}
 */
export function validateCreateSession(body) {
  if (!body || typeof body !== 'object') {
    return { valid: false, error: 'Invalid body' }
  }
  const title = body.title != null ? String(body.title).trim() : ''
  const streamUrl = body.streamUrl != null ? String(body.streamUrl).trim() : ''
  const creatorAddress = body.creatorAddress != null ? String(body.creatorAddress).trim() : ''

  if (!title) return { valid: false, error: 'Session title is required' }
  if (!streamUrl) return { valid: false, error: 'Stream URL is required' }
  try {
    new URL(streamUrl)
  } catch {
    return { valid: false, error: 'Stream URL must be a valid URL' }
  }
  if (!creatorAddress) return { valid: false, error: 'Kaspa receiving address is required' }
  if (creatorAddress.length < 50) {
    return { valid: false, error: 'Kaspa address appears invalid (too short)' }
  }

  return { valid: true }
}

/**
 * Validate tip submit payload (from WebSocket).
 * @param {object} payload - { sessionId, txHash, amount, from }
 * @returns {{ valid: boolean, error?: string }}
 */
export function validateTipSubmit(payload) {
  if (!payload || typeof payload !== 'object') {
    return { valid: false, error: 'Invalid payload' }
  }

  const sessionId = payload.sessionId != null ? String(payload.sessionId).trim() : ''
  const txHash = payload.txHash != null ? String(payload.txHash).trim() : ''
  const amount = Number(payload.amount)
  const from = payload.from != null ? String(payload.from).trim() : ''

  if (!sessionId) return { valid: false, error: 'sessionId is required' }
  if (!txHash) return { valid: false, error: 'txHash is required' }
  if (!Number.isFinite(amount) || amount < MIN_TIP_KAS || amount > MAX_TIP_KAS) {
    return { valid: false, error: `Amount must be between ${MIN_TIP_KAS} and ${MAX_TIP_KAS} KAS` }
  }

  const session = getSession(sessionId)
  if (!session) return { valid: false, error: 'Session not found' }
  if (session.status !== 'live') return { valid: false, error: 'Session is not live' }

  // Duplicate tx hash for same session
  if (!seenTxHashes.has(sessionId)) seenTxHashes.set(sessionId, new Set())
  if (seenTxHashes.get(sessionId).has(txHash)) {
    return { valid: false, error: 'Duplicate transaction' }
  }
  seenTxHashes.get(sessionId).add(txHash)

  return { valid: true, session }
}
