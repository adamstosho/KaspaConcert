# KaspaConcert – Setup & Run

One-time setup and run order so the app and API work together.

---

## 1. Backend (API)

The UI talks to the backend for sessions and live tips. Run it first.

```bash
cd kaspa-concert-api
npm install
npm run dev
```

- **URL:** http://localhost:4000  
- **Health:** http://localhost:4000/health → `{ "ok": true, "service": "kaspa-concert-api" }`

**Optional:** Copy `.env.example` to `.env` and change `PORT`, `CORS_ORIGIN`, or `FRONTEND_ORIGIN` only if your frontend is not at `http://localhost:3000`. Defaults work for local dev.

---

## 2. Frontend (UI)

```bash
cd kaspa-concert-ui
npm install
npm run dev
```

- **URL:** http://localhost:3000  
- **API:** The app uses `NEXT_PUBLIC_API_URL` if set; otherwise **http://localhost:4000**. No `.env` needed for local dev if the API runs on 4000.

**Optional:** Copy `kaspa-concert-ui/.env.example` to `kaspa-concert-ui/.env.local` and set `NEXT_PUBLIC_API_URL` if the API is on another host/port (e.g. in production).

---

## 3. Run order

1. Start **backend**: `cd kaspa-concert-api && npm run dev`  
2. Start **frontend**: `cd kaspa-concert-ui && npm run dev`  
3. Open http://localhost:3000 — Create a session, open the session link, send a tip; creator dashboard and browse sessions use the same API and WebSocket.

---

## 4. Kaspa wallet (real data only)

The app uses **real data only** — no mock wallets or fake balances.

- **KasWare Wallet (extension)** – Connect to send real KAS tips. Address and balance come from the extension. Tips are signed and broadcast by KasWare; real `txHash` is sent to the backend.
- **Enter address (view only)** – Paste your Kaspa address (e.g. `kaspa:...` or `kaspa1...`) to view the session and feed. Balance is not shown (view-only). **Sending tips requires KasWare extension** — the Send Tip button is disabled for view-only.

**Create page:** Click **Connect KasWare Wallet** to fill your receiving address from the extension, or type/paste your Kaspa address manually. Sessions and tips are stored and streamed via the backend.

## 5. PWA (installable app)

The UI includes a **web app manifest** (`/manifest.json`) and layout metadata:

- **Add to Home Screen** works on supported browsers (Chrome, Safari, etc.).
- **Theme color** and **standalone display** are set (Kaspa blue `#4F7CFF`, dark background `#1A1A1A`).
- **Icons**: `icon.svg` and placeholder logo are referenced in the manifest.

No service worker is included; add one (e.g. next-pwa or custom) if you need offline caching.

## 6. What’s next (optional)

| Area | Status | Next step |
|------|--------|-----------|
| **Backend + UI wiring** | Done | Create session, viewer tips, creator dashboard, browse sessions use API + Socket.IO. |
| **Real Kaspa (extension)** | Done | KasWare Wallet: connect → send tip → real txHash → backend confirms. |
| **PWA** | Done | Manifest + metadata; optional: service worker for offline. |
| **Hackathon** | Partial | README + “reproduce in &lt;10 min”; add 3‑min demo video, screenshot, document Kaspa integration (and AI usage if any). |

For full local flow: backend + frontend as above; use KasWare extension for real tips.
