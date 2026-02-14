import 'dotenv/config'
/**
 * KaspaConcert API – Entry point.
 * Node.js + Express: session management, REST, WebSocket (Socket.IO), transaction monitor.
 * PRD §7.3, userFlow PART B.
 */

import http from 'http'
import express from 'express'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
import config from './config.js'
import sessionsRouter from './routes/sessions.js'
import { createSocketServer } from './socket.js'
import { loadSessions } from './services/sessionService.js'
import { loadTips } from './services/tipService.js'

const app = express()

app.use(express.json())
app.use(
  cors({
    origin: config.corsOrigins.length ? config.corsOrigins : true,
    methods: ['GET', 'POST', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
)

app.use(
  rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 100,
    message: { error: 'Too many requests' },
    standardHeaders: true,
    legacyHeaders: false,
  })
)

app.get('/health', (req, res) => {
  res.json({ ok: true, service: 'kaspa-concert-api', timestamp: new Date().toISOString() })
})

app.use('/sessions', sessionsRouter)

// Load persisted data on startup
loadSessions()
loadTips()

const httpServer = http.createServer(app)
createSocketServer(httpServer, { origin: config.corsOrigins })

httpServer.listen(config.port, () => {
  console.log(`KaspaConcert API listening on port ${config.port} (${config.nodeEnv})`)
  console.log(`CORS origin(s): ${config.corsOrigins.join(', ') || '*'}`)
  if (!config.kaspaRpcUrl) {
    console.log(`Transaction confirm: mock (${config.mockConfirmDelayMs}ms delay)`)
  } else {
    console.log(`Transaction confirm: Kaspa API (${config.kaspaRpcUrl})${config.kaspaApiKey ? ' with API key' : ''}`)
  }
})
