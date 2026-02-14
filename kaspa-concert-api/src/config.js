/**
 * KaspaConcert API – Configuration
 * Loads from process.env; defaults for development.
 */

const config = {
  port: Number(process.env.PORT) || 4000,
  nodeEnv: process.env.NODE_ENV || 'development',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  frontendOrigin: process.env.FRONTEND_ORIGIN || process.env.CORS_ORIGIN || 'http://localhost:3000',
  /** Base URL for Kaspa API (e.g. https://api.kas.fyi). When set, transaction monitor polls GET /v1/transactions/{txId} for real confirmation. */
  kaspaRpcUrl: process.env.KASPA_RPC_URL
    ? String(process.env.KASPA_RPC_URL).trim().replace(/\/$/, '')
    : null,
  /** Optional API key for Kaspa Developer Platform (x-api-key header). */
  kaspaApiKey: process.env.KASPA_API_KEY ? String(process.env.KASPA_API_KEY).trim() : null,
  mockConfirmDelayMs: Number(process.env.MOCK_CONFIRM_DELAY_MS) || 2500,
}

/** Allowed CORS origins (split by comma). */
config.corsOrigins = config.corsOrigin
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean)

// Explicitly add the production frontend URL to the allowed origins
if (!config.corsOrigins.includes('https://kaspa-concert.vercel.app')) {
  config.corsOrigins.push('https://kaspa-concert.vercel.app')
}
if (!config.corsOrigins.includes('https://kaspa-concert.vercel.app/')) {
  config.corsOrigins.push('https://kaspa-concert.vercel.app/') // Just in case
}

export default config
