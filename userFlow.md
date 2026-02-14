KASPACONCERT
COMPLETE USER FLOW & SYSTEM ARCHITECTURE
PART A: COMPLETE USER FLOW

We will cover every interaction, from first page load to confirmed on-chain transaction.

1. Entry Points
1.1 Viewer Entry

Viewer receives a KaspaConcert session link from:

Creator

Social media

QR code

Link structure:

kaspaconcert.app/session/{sessionId}

1.2 Creator Entry

Creator opens:

kaspaconcert.app/create


Creates a new live session

2. Creator User Flow (Step-by-Step)
Step C1: Session Creation

Creator inputs:

Session title

Stream URL (YouTube Live, Twitch, custom iframe)

Kaspa receiving address

Backend generates:

sessionId

WebSocket channel

Session stored in backend

Output:
A unique shareable session URL

Step C2: Session Dashboard (Live)

Creator sees:

Embedded live stream

Real-time total tips

Live tip feed

Kaspa address (read-only)

Session status (LIVE)

Backend actions:

Subscribes to Kaspa RPC for incoming transactions

Listens for UTXOs to creator address

Step C3: Real-Time Updates

Every confirmed tip:

Instantly updates total balance

Appears in live feed

No refresh required

Step C4: Session End

Creator ends session

Backend:

Stops RPC listeners

Freezes session stats

Funds already in creator’s wallet (no withdrawal step)

3. Viewer User Flow (Step-by-Step)
Step V1: Session Load

Viewer opens session URL

Frontend loads:

Stream player

Tip panel

Wallet connect CTA

Backend:

Fetches session metadata

Opens WebSocket connection

Step V2: Wallet Connection

Viewer chooses wallet connection method:

Browser wallet extension

Kaspa Web SDK

Manual signing (fallback)

Frontend:

Detects wallet

Fetches balance

Displays wallet status

No keys ever leave the client.

Step V3: Tip Selection

Viewer:

Selects preset tip (e.g. 0.1, 0.5, 1 KAS)

Or enters custom amount

Frontend validates:

Balance

Minimum amount

Network availability

Step V4: Transaction Creation

Frontend:

Constructs Kaspa transaction:

From viewer address

To creator address

Amount selected

Wallet signs transaction locally

Step V5: Transaction Broadcast

Signed transaction sent to:

Backend relay OR

Direct Kaspa RPC endpoint

Backend:

Receives tx hash

Emits TIP_PENDING event via WebSocket

Step V6: Real-Time Feedback

Viewer sees:

“Tip pending” animation

Optimistic UI update

Backend:

Monitors Kaspa DAG for tx inclusion

Step V7: Transaction Confirmation

Once confirmed:

Backend emits TIP_CONFIRMED

Frontend updates:

Tip feed

Creator total

Confirmation state

This happens in seconds due to Kaspa’s speed.

PART B: SYSTEM ARCHITECTURE
4. High-Level Architecture Overview
[ Viewer Browser ]
        |
        |  HTTPS + WebSocket
        |
[ React PWA Frontend ]
        |
        |  REST + WS
        |
[ Node.js Backend ]
        |
        |  RPC / WebSocket
        |
[ Kaspa Network ]

5. Frontend Architecture (React PWA)
Core Modules

Session Module

Loads session data

Handles stream embedding

Wallet Module

Wallet detection

Balance fetching

Transaction signing

Tipping Module

Amount selection

Transaction construction

Broadcast handling

Real-Time Module

WebSocket listener

UI updates

Tip feed rendering

PWA Layer

Offline shell

App-like navigation

Mobile responsiveness

6. Backend Architecture (Node.js)
Core Services
6.1 Session Service

Create and manage sessions

Store:

Session ID

Creator address

Stream URL

Status

6.2 WebSocket Gateway

Manages real-time communication

Broadcasts:

Tip pending

Tip confirmed

Session updates

6.3 Transaction Monitor

Subscribes to Kaspa RPC

Watches:

Creator addresses

Transaction hashes

Confirms inclusion in DAG

6.4 Validation Layer

Ensures:

Tx amount matches session

Address integrity

No duplicate events

7. Blockchain Interaction Layer
Kaspa Integration Details

Use:

Kaspa RPC

Public node or local node

Functions:

Broadcast transaction

Subscribe to new blocks

Query UTXO set

No smart contracts required (native UTXO model)

This highlights Kaspa’s strength: speed without complexity.

8. Data Flow (Critical Path)
Tip Transaction Lifecycle

Viewer signs transaction

Tx hash sent to backend

Backend listens to Kaspa DAG

Block inclusion detected

Confirmation event broadcast

UI updates instantly

No polling loops. No delays. Fully event-driven.

9. Failure Handling Flow
Wallet Failure

UI displays actionable error

User can retry or reconnect

Network Failure

Graceful fallback

Retry logic

No UI freeze

Transaction Failure

Clear message

No false confirmations

10. Security Architecture

No private keys on backend

All signing client-side

Read-only RPC usage

HTTPS and WSS only

Rate limiting on backend

11. Scalability Considerations

Stateless backend

Horizontal scaling possible

WebSocket rooms per session

Kaspa handles throughput at L1

12. Why Judges Will Love This Architecture

Clean separation of concerns

Deep Kaspa integration

Real-time by design, not by polling

Demonstrates BlockDAG advantages

Production-grade thinking

FINAL NOTE (IMPORTANT)

This user flow and architecture:

Is fully buildable

Fits a 2-person team

Shows real engineering maturity

Aligns perfectly with Kaspathon’s goals

You are not submitting a “hack”.
You are submitting a reference application for Kaspa’s real-time future.