/**
 * REST API – Sessions: create, get, list, end.
 * PRD §7.2, userFlow §2 (Creator), §3 (Viewer).
 */

import { Router } from 'express'
import config from '../config.js'
import { createSession, getSession, listSessions, endSession } from '../services/sessionService.js'
import { validateCreateSession } from '../services/validationLayer.js'
import { getTips, getSessionTotalsFromTips } from '../services/tipService.js'

const router = Router()
const baseUrl = config.frontendOrigin.replace(/\/$/, '')

/**
 * POST /sessions – Create a new session.
 * Body: { title, streamUrl, creatorAddress }
 * Returns: { id, title, streamUrl, creatorAddress, status, createdAt, shareableUrl? }
 */
router.post('/', (req, res) => {
  const result = validateCreateSession(req.body)
  if (!result.valid) {
    return res.status(400).json({ error: result.error })
  }

  const { title, streamUrl, creatorAddress } = req.body
  const session = createSession({
    title: String(title).trim(),
    streamUrl: String(streamUrl).trim(),
    creatorAddress: String(creatorAddress).trim(),
  })

  const shareableUrl = `${baseUrl}/session/${session.id}`

  res.status(201).json({
    id: session.id,
    title: session.title,
    streamUrl: session.streamUrl,
    creatorAddress: session.creatorAddress,
    status: session.status,
    createdAt: session.createdAt,
    shareableUrl,
  })
})

/**
 * GET /sessions – List sessions (for browse page).
 * totalTips and tipsCount are derived from persisted tips so the list is always accurate.
 * Query: ?status=live|ended&limit=50
 */
router.get('/', (req, res) => {
  const status = req.query.status || undefined
  const limit = Math.min(Number(req.query.limit) || 50, 100)
  const raw = listSessions({ status, limit })
  const sessions = raw.map((s) => {
    const { totalTips, tipsCount } = getSessionTotalsFromTips(s.id)
    return {
      ...s,
      totalTips,
      tipsCount,
    }
  })
  res.json({ sessions })
})

/**
 * GET /sessions/:id/tips – Get all tips for a session.
 * IMPORTANT: This must come BEFORE /:id route to match correctly
 */
router.get('/:id/tips', (req, res) => {
  const session = getSession(req.params.id)
  if (!session) {
    return res.status(404).json({ error: 'Session not found' })
  }
  const tips = getTips(req.params.id)
  res.json({ tips })
})

/**
 * PATCH /sessions/:id/end – End a session (freeze stats).
 * IMPORTANT: This must come BEFORE /:id route to match correctly
 */
router.patch('/:id/end', (req, res) => {
  const session = endSession(req.params.id)
  if (!session) {
    return res.status(404).json({ error: 'Session not found or already ended' })
  }
  res.json(session)
})

/**
 * GET /sessions/:id – Get one session by ID.
 * totalTips and tipsCount are derived from persisted tips so they stay in sync.
 * IMPORTANT: This generic route must come LAST to avoid catching specific routes
 */
router.get('/:id', (req, res) => {
  const session = getSession(req.params.id)
  if (!session) {
    return res.status(404).json({ error: 'Session not found' })
  }
  const { totalTips, tipsCount } = getSessionTotalsFromTips(session.id)
  res.json({
    ...session,
    totalTips,
    tipsCount,
  })
})

export default router
