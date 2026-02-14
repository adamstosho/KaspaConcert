/**
 * Session Service – Create and manage sessions.
 * Stores: sessionId, title, streamUrl, creatorAddress, status.
 * PRD §6.2, userFlow §6.1.
 */

import { v4 as uuidv4 } from 'uuid'
import { loadData, saveData } from './storage.js'

const SESSIONS_FILE = 'sessions.json'

// In-memory cache
let sessions = {}

const SESSION_PREFIX = 'sess_'

/**
 * Load sessions from disk on startup
 */
export function loadSessions() {
  sessions = loadData(SESSIONS_FILE)
  console.log(`Loaded ${Object.keys(sessions).length} session(s) from storage`)
}

/**
 * Save sessions to disk
 */
function saveSessions() {
  saveData(SESSIONS_FILE, sessions)
}

/**
 * Generate a short, URL-friendly session ID.
 */
function generateSessionId() {
  return SESSION_PREFIX + uuidv4().replace(/-/g, '').slice(0, 12)
}

/**
 * Create a new session.
 * @param {object} input - { title, streamUrl, creatorAddress }
 * @returns {object} Session record with id, shareableUrl, createdAt, status: 'live'
 */
export function createSession({ title, streamUrl, creatorAddress }) {
  const id = generateSessionId()
  const session = {
    id,
    title: String(title).trim(),
    streamUrl: String(streamUrl).trim(),
    creatorAddress: String(creatorAddress).trim(),
    status: 'live',
    createdAt: new Date().toISOString(),
    endedAt: null,
    totalTips: 0,
    tipsCount: 0,
  }
  sessions[id] = session
  saveSessions()
  return session
}

/**
 * Get a session by ID.
 * @param {string} sessionId
 * @returns {object|null}
 */
export function getSession(sessionId) {
  if (!sessionId) return null
  return sessions[sessionId] ?? null
}

/**
 * List sessions (e.g. for browse page).
 * @param {object} options - { status?: 'live'|'ended', limit?: number }
 * @returns {object[]}
 */
export function listSessions(options = {}) {
  const { status, limit = 50 } = options
  let list = Object.values(sessions)
  if (status) list = list.filter((s) => s.status === status)
  list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  return list.slice(0, limit)
}

/**
 * End a session (freeze stats, set status to 'ended').
 * @param {string} sessionId
 * @returns {object|null} Updated session or null
 */
export function endSession(sessionId) {
  const session = sessions[sessionId]
  if (!session || session.status === 'ended') return null
  session.status = 'ended'
  session.endedAt = new Date().toISOString()
  saveSessions()
  return session
}

/**
 * Update session tip totals (called when a tip is confirmed).
 * @param {string} sessionId
 * @param {number} amount
 */
export function recordConfirmedTip(sessionId, amount) {
  const session = sessions[sessionId]
  if (!session) return

  const numericAmount = Number(amount) || 0
  session.totalTips = (Number(session.totalTips) || 0) + numericAmount
  session.tipsCount = (Number(session.tipsCount) || 0) + 1

  console.log(`[SessionService] Recorded tip for ${sessionId}: +${numericAmount} KAS. New Total: ${session.totalTips}, Count: ${session.tipsCount}`)

  saveSessions()
}

export { sessions }
