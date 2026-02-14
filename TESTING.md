# 🧪 KaspaConcert - Comprehensive Testing Guide

This document provides step-by-step instructions to test the full functionality of KaspaConcert, including the **Simulated Demo Mode** (for quick verification without funds) and the **Real Testnet Transaction Flow** (for full blockchain integration).

---

## 🏗️ Prerequisites

Before testing, ensure both the backend (API) and frontend (UI) are running locally.

### 1. Start the Backend API
```bash
cd kaspa-concert-api
npm run start
# Expected Output: "KaspaConcert API listening on port 4000... Transaction confirm: Kaspa API (https://api-tn10.kaspa.org)"
```

### 2. Start the Frontend UI
```bash
cd kaspa-concert-ui
npm run dev
# Expected Output: "Ready in ... ms - Local: http://localhost:3000"
```

---

## 🔮 Part 1: Quick Demo Mode (Simulation)
**Best for:** Rapid testing, UI verification, recording demo videos, or judging without a wallet.

This mode simulates the *entire* user experience (connectivity, tipping, real-time updates) without requiring a real wallet or KAS tokens.

1.  **Create a Session:**
    *   Navigate to [http://localhost:3000/create](http://localhost:3000/create).
    *   Enter a Title (e.g., "Test Concert").
    *   Enter a Stream URL (e.g., `https://www.youtube.com/watch?v=jfKfPfyJRdk` - Lofi Hip Hop).
    *   Enter a Kaspa Address (Any string starting with `kaspa:` works for demo, or use your real one).
    *   Click **Create Session**.

2.  **Enter Demo Mode:**
    *   On the Success page, click **Go to Dashboard** or copy the **Shareable Link**.
    *   **CRITICAL STEP:** Append `?demo=true` to the URL in your browser address bar.
    *   Example: `http://localhost:3000/session/your-session-id-here?demo=true`

3.  **Simulate Tips:**
    *   Look for the floating **🔮 Simulate Tip** button in the bottom-right corner.
    *   Click it!
    *   **Observe:**
        *   A new tip appears in the "Live Tip Feed" with a status of **"⏳ Tip pending"**.
        *   After ~1.5 seconds, the status changes to **"✓ Confirmed tip"**.
        *   The "Total Tips" counter updates instantly in the Stats panel.
        *   The "Tip Trend" graph updates (if enabled).

---

## ⛓️ Part 2: Real-World Testing (Testnet)
**Best for:** Verifying blockchain integration, wallet connectivity, and actual KAS transfers.

### 1. Wallet Setup (KasWare)
1.  Install the **KasWare Wallet** browser extension (Chrome/Brave/Edge).
2.  Create a new wallet or import an existing one.
3.  **Switch to Testnet 10 (TN10):**
    *   Open KasWare.
    *   Go to Settings -> Network.
    *   Select **Kaspa Testnet 10**.
4.  **Get Testnet KAS:**
    *   Use the [Kaspa Testnet Faucet](https://faucet.kaspanet.io/) to request funds to your address.
    *   *Note: Ensure you have at least 1-2 KAS for testing.*

### 2. Connect & Create
1.  Go to [http://localhost:3000/create](http://localhost:3000/create).
2.  Click **Connect KasWare Wallet**.
3.  Approve the connection in the extension.
4.  Your address should auto-fill.
5.  Create a session as described in Part 1.

### 3. The Tipping Flow
1.  Open the Session URL (e.g., `http://localhost:3000/session/your-session-id`).
2.  **Connect Wallet** as a viewer (top-right or "Connect Wallet" button).
3.  **Send a Real Tip:**
    *   In the "Support the Creator" panel, select **1 KAS** (or enter a custom amount).
    *   Click **Send 1 KAS**.
4.  **Sign Transaction:**
    *   The KasWare popup will appear.
    *   Review the transaction.
    *   Click **Sign & Send**.
5.  **Verify Real-Time Update:**
    *   You will see **"⏳ Tip pending"** in the feed immediately.
    *   Wait for block inclusion (usually <1 second on Kaspa!).
    *   The status will flip to **"✓ Confirmed tip"** automatically once the backend detects it on the blockchain.

---

## 🧪 Part 3: Advanced Scenarios

### 1. Mobile Testing
1.  Open Chrome DevTools (F12).
2.  Toggle Device Toolbar (Ctrl+Shift+M).
3.  Select "iPhone 12" or "Pixel 5".
4.  Verify the **Mobile Menu** (Hamburger icon) works correctly.
5.  Verify the **Connect Wallet** modal is responsive and centered.

### 2. Error Handling
1.  **Reject Transaction:** Try to send a tip but click **Reject** in the KasWare popup. Verify the app shows "User rejected transaction" without crashing.
2.  **Network Disconnect:** Stop the backend server (`Ctrl+C`). Verify the UI shows a "Connecting to live feed..." warning or similar state.

---

## ❓ Troubleshooting

| Issue | Solution |
|-------|----------|
| **Wallet not connecting** | Ensure you are on `localhost` (browsers block extensions on insecure IPs). Ensure KasWare is unlocked. |
| **"Session not found"** | The API uses in-memory storage by default. If you restart the backend, all sessions are lost. Create a new one. |
| **Tips not confirming** | Ensure your backend is connected to the correct RPC (check logs). If using Testnet, ensure your wallet is also on Testnet. |
| **No "Simulate Tip" button** | Ensure `?demo=true` is correctly added to the URL. |

---

*Happy Testing! 🚀*
