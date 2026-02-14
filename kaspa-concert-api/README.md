# KaspaConcert API

Backend for **KaspaConcert**: session management, WebSocket gateway, and transaction monitor. Built per PRD and userFlow (Node.js + Express + Socket.IO).

## Architecture

- **Session Service** – Create, get, list, and end sessions (in-memory store).
- **REST API** – `POST /sessions`, `GET /sessions`, `GET /sessions/:id`, `PATCH /sessions/:id/end`.
- **WebSocket (Socket.IO)** – Join by `sessionId`; emit `TIP_PENDING` and `TIP_CONFIRMED` to the session room.
- **Transaction Monitor** – On tip submit: emit pending; then confirm (mock delay or, when configured, Kaspa API polling).
- **Validation Layer** – Session create validation; tip submit validation (amount, duplicate tx, session live).

## Setup

**Minimum (local dev, frontend on port 3000):**

```bash
cd kaspa-concert-api
npm install
npm run dev
```

Server runs at **http://localhost:4000**. Defaults: CORS allows `http://localhost:3000`, so the UI can call the API without editing `.env`.

**Optional – custom port or CORS:**

```bash
cp .env.example .env
# Edit .env: PORT, CORS_ORIGIN, FRONTEND_ORIGIN if needed
npm run dev
```

If your frontend runs on a different origin (e.g. `http://localhost:3001`), set in `.env`:

- `CORS_ORIGIN=http://localhost:3001`
- `FRONTEND_ORIGIN=http://localhost:3001`

If port 4000 is in use, set `PORT=4001` (or another port) in `.env` and set `NEXT_PUBLIC_API_URL=http://localhost:4001` in the frontend `.env.local`.

## Environment

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | HTTP port | `4000` |
| `NODE_ENV` | Environment | `development` |
| `CORS_ORIGIN` | Allowed CORS origin(s), comma-separated | `http://localhost:3000` |
| `FRONTEND_ORIGIN` | Base URL for shareable links | same as CORS_ORIGIN |
| `KASPA_RPC_URL` | Optional; HTTP base URL for Kaspa API. **Recommended:** `https://api.kaspa.org` (no API key). Alternative: `https://api.kas.fyi` (requires API key; signup at developer.kas.fyi is currently down). When set, transaction monitor polls for real confirmation. | (none) |
| `KASPA_API_KEY` | Optional; only for `https://api.kas.fyi`. Not needed for `https://api.kaspa.org`. | (none) |
| `MOCK_CONFIRM_DELAY_MS` | Mock confirmation delay (ms), used when `KASPA_RPC_URL` is not set | `2500` |

## REST API

### POST /sessions

Create a session.

**Body:** `{ "title": string, "streamUrl": string, "creatorAddress": string }`

**Response:** `201` – `{ id, title, streamUrl, creatorAddress, status, createdAt, shareableUrl }`

### GET /sessions

List sessions. Query: `?status=live|ended&limit=50`.

**Response:** `200` – `{ sessions: Session[] }`

### GET /sessions/:id

Get one session.

**Response:** `200` – session object, or `404`.

### PATCH /sessions/:id/end

End a session (status → `ended`, freeze stats).

**Response:** `200` – updated session, or `404`.

### GET /health

Health check. **Response:** `200` – `{ ok: true, service: "kaspa-concert-api" }`.

## WebSocket (Socket.IO)

Connect to `http://localhost:4000` (same origin as HTTP).

### Client → Server

- **join_session** `(sessionId, callback)` – Join room for session. Callback: `(err)` or `({ session })`.
- **tip_submit** `(payload, callback)` – Submit a tip. Payload: `{ sessionId, txHash, amount, from? }`. Callback: `({ error })` or `({ ok: true, tipId })`.

### Server → Client

- **TIP_PENDING** – Tip received, not yet confirmed. Payload: `{ tipId, sessionId, amount, from, txHash, status: "pending", timestamp }`.
- **TIP_CONFIRMED** – Tip confirmed. Same shape with `status: "confirmed"`; backend has updated session totals.

## Security

- No private keys on backend; all signing is client-side.
- Rate limiting: 100 requests per minute per IP.
- CORS restricted to configured origin(s).
