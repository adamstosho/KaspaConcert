# KaspaConcert Implementation Roadmap 🚀

This document outlines the step-by-step plan to transition **KaspaConcert** from its current high-fidelity UI prototype to a fully functional, production-grade application on the Kaspa Mainnet.

## 🟢 Phase 1: Frontend Logic & State Management
**Goal:** Make the UI functional with local state management before hooking up the backend.

### 1.1 Wallet Connection Module
*   [ ] **Install Dependencies**: `@kaspa/wallet-worker` (or analogous web SDK).
*   [ ] **Create `WalletContext`**:
    *   Manage `isConnected`, `address`, `balance`, `network` (Mainnet/Testnet).
    *   Implement `connect()`: Detect Kasware/Kaspium or fall back to web-wallet creation.
    *   Implement `disconnect()`: Clear local state.
*   [ ] **Update Header**: Connect the mock "Connect Wallet" button to the real `WalletContext`.

### 1.2 Session Management (Frontend)
*   [ ] **Create `SessionContext`**:
    *   Store `sessionId`, `streamUrl`, `creatorAddress`, `totalTips`, `tipHistory`.
*   [ ] **Create Page Logic (`/create`)**:
    *   Form validation for Title, Stream URL, Wallet Address.
    *   Generate a robust `sessionId` (e.g., UUID or slug).
    *   Redirect to `creator/dashboard/[id]`.

### 1.3 Viewer Experience (`/session/[id]`)
*   [ ] **Video Player**: Implement a robust component to handle YouTube/Twitch embeds via URL parsing.
*   [ ] **Tipping Logic**:
    *   State for `selectedAmount`.
    *   "Send Tip" button triggers the signing flow.
    *   Mock "Optimistic UI" updates (show tip immediately while pending).

---

## 🟡 Phase 2: Backend & Real-Time Infrastructure
**Goal:** Enable instant data synchronization between Creator and Viewers.

### 2.1 Node.js + Express + Socket.io Server
The PRD specifies a separate Node.js backend to handle WebSockets efficiently.
*   [ ] **Setup Server**: Initialize a new folder `server/`.
*   [ ] **WebSocket Events**:
    *   `join_session`: Client joins a specific room.
    *   `new_tip`: Backend broadcasts a new tip event to the room.
    *   `update_stats`: Broadcast total donation amount.
*   [ ] **Session Store**:
    *   Implement an in-memory store (Map/Redis) to keep track of active sessions and their current tip totals.

### 2.2 Kaspa Blockchain Listener
*   [ ] **RPC Connection**: Connect the backend to a public Kaspa RPC node.
*   [ ] **Transaction Monitor**:
    *   Listen for new blocks/transactions using the Kaspa SDK/RPC.
    *   Filter for UTXOs sent to *Active Creator Addresses*.
*   [ ] **Confirmation Logic**:
    *   Step 1: Detect transaction in mempool (emit `TIP_PENDING`).
    *   Step 2: Detect transaction in a block (emit `TIP_CONFIRMED`).

---

## 🔵 Phase 3: Kaspa Integration (The Core)
**Goal:** Implement the actual value transfer.

### 3.1 Client-Side Signing
*   [ ] **Transaction Construction**: Use Kaspa SDK to build a transaction:
    *   Inputs: Selected UTXOs from Viewer wallet.
    *   Outputs: Creator Address + Change to Viewer.
*   [ ] **Signing**: Request signature from the connected wallet extension (e.g., Kasware).

### 3.2 Broadcasting
*   [ ] **Submit Transaction**: Send the signed raw transaction to the Kaspa RPC (via Backend proxy or direct).
*   [ ] **Handle Errors**: Graceful UI for "Insufficient Funds" or "Rejected Signature".

---

## 🟣 Phase 4: Polish & Production
**Goal:** Meet all Hackathon criteria for a winning submission.

### 4.1 UI Finalization
*   [ ] **Creator Dashboard**:
    *   Ensure the "Live Feed" animates smoothly for every new tip.
    *   Add a "Copy Link" & "QR Code" feature for sharing.
*   [ ] **Mobile Responsiveness**: Double-check the Viewer page on mobile (crucial for "app-like" feel).
*   [ ] **Edge Cases**: Empty states, Loading skeletons, 404 pages.

### 4.2 Documentation
*   [ ] **README.md**: Write clear instructions on how to run both Frontend and Backend locally.
*   [ ] **Demo Video Script**: Plan the 3-minute video flow (Intro -> Create Session -> Viewer Joins -> Tips -> Instant Confirmation).

### 4.3 Deployment
*   [ ] **Frontend**: Deploy to Vercel/Netlify.
*   [ ] **Backend**: Deploy to Render/Heroku/Railway.
*   [ ] **Env Variables**: Configure RPC URLs and WebSocket endpoints securely.

---

## 🏁 Immediate Next Steps (Action Items)

1.  **Scaffold the Backend**: Create the `server` directory and set up a basic Socket.io server.
2.  **Implement `Create` Logic**: Make the "Start Streaming" button actually generate a session.
3.  **Implement `Session` View**: Create the Viewer interface with a dummy video player and tip button.
