/**
 * WebSocket Gateway – Manages real-time communication; broadcasts TIP_PENDING, TIP_CONFIRMED, SESSION_UPDATED.
 * userFlow §6.2, §8.
 */

import { Server } from 'socket.io'
import { v4 as uuidv4 } from 'uuid'
import { getSession } from './services/sessionService.js'
import { validateTipSubmit } from './services/validationLayer.js'
import { watchTip, setEmitConfirmed } from './services/transactionMonitor.js'
import { recordTip } from './services/tipService.js'

const ROOM_PREFIX = 'session:'

/**
 * Create Socket.IO server and attach to HTTP server.
 * @param {import('http').Server} httpServer
 * @param {object} corsOptions - { origin: string[] }
 * @returns {import('socket.io').Server}
 */
export function createSocketServer(httpServer, corsOptions) {
  const io = new Server(httpServer, {
    cors: {
      origin: corsOptions.origin,
      methods: ['GET', 'POST'],
    },
    pingTimeout: 60000,
    pingInterval: 25000,
  })

  // Transaction monitor will call this to emit TIP_CONFIRMED to the session room.
  setEmitConfirmed((payload) => {
    const room = ROOM_PREFIX + payload.sessionId
    io.to(room).emit('TIP_CONFIRMED', payload)
    // Record confirmed tip
    recordTip(payload.sessionId, payload)

    // Update session stats and broadcast
    const session = getSession(payload.sessionId)
    if (session) {
      console.log(`[Socket] Broadcasting SESSION_UPDATED for ${payload.sessionId}: Total=${session.totalTips}, Count=${session.tipsCount}`)
      io.to(room).emit('SESSION_UPDATED', {
        sessionId: payload.sessionId,
        totalTips: session.totalTips || 0,
        tipsCount: session.tipsCount || 0,
      })
    }
  })

  io.on('connection', (socket) => {
    socket.on('join_session', (sessionId, callback) => {
      if (!sessionId || typeof sessionId !== 'string') {
        callback?.({ error: 'sessionId required' })
        return
      }
      const session = getSession(sessionId.trim())
      if (!session) {
        callback?.({ error: 'Session not found' })
        return
      }
      const room = ROOM_PREFIX + session.id
      socket.join(room)
      callback?.({ session })
    })

    socket.on('tip_submit', (payload, callback) => {
      const result = validateTipSubmit(payload)
      if (!result.valid) {
        callback?.({ error: result.error })
        return
      }

      const tipId = payload.tipId || uuidv4()
      const sessionId = payload.sessionId
      const amount = Number(payload.amount)
      const from = payload.from || 'Anonymous'
      const txHash = payload.txHash
      const timestamp = new Date().toISOString()

      const pendingPayload = {
        tipId,
        sessionId,
        amount,
        from,
        txHash,
        status: 'pending',
        timestamp,
      }

      const room = ROOM_PREFIX + sessionId
      io.to(room).emit('TIP_PENDING', pendingPayload)

      // Record pending tip
      recordTip(sessionId, pendingPayload)

      watchTip(pendingPayload)
      callback?.({ ok: true, tipId })
    })

    socket.on('disconnect', () => { })
  })

  return io
}
