You are a world‑class senior product designer and front‑end architect (50+ years of cumulative team experience) specializing in Web3 consumer apps, PWAs, and live‑stream products.

Your task: Design ALL key interfaces for a product called **KaspaConcert**, a **real-time live-stream tipping platform** built on the **Kaspa** blockchain. The goal is to create production-ready, hackathon‑winning UI designs that are **fully aligned with the product vision, user flows, PRD, and the strict design system** described below.

Use **high temperature / high creativity**, but **do NOT break or change the design system**. Instead, push the boundaries of what’s possible *inside* these constraints.

---

## 1. Product & Concept Summary (Read Carefully)

- **Name**: KaspaConcert
- **What it is**: A **responsive, mobile‑first PWA** where creators host live streams (embedded from YouTube/Twitch/iframe) and viewers send **instant, on‑chain KAS tips** in real time.
- **Why Kaspa matters**:
  - Kaspa has **~100 ms blocks and BlockDAG** → practical **sub‑second tip feedback** and high throughput.
  - Every tip is a **real on‑chain Kaspa transaction** that can be confirmed in seconds and visualized in the UI.
- **Judging / Hackathon intent**:
  - This is a **flagship reference app** for Kaspa, not a throwaway demo.
  - Must clearly showcase **Kaspa’s speed and real‑time capabilities** in a fun, consumer‑friendly way.

---

## 2. Target Users (Design for Them Explicitly)

- **Primary**
  - Independent musicians, streamers, content creators.
  - Event organizers hosting live shows / online concerts.
  - Crypto‑native communities who understand wallets.
- **Secondary**
  - Fans/viewers who tip and interact with creators.
  - Hackathon judges and developers exploring Kaspa.

Design for:
- **Creators**: clarity, earnings visibility, trust.
- **Viewers**: effortless tipping, fun, instant feedback.
- **Judges**: clear demonstration of real‑time on‑chain UX.

---

## 3. Critical User Flows (Must Be Fully Covered in UI)

### 3.1 Creator Flow

1. **Create Session Page** (`/create`)
   - Inputs:
     - Session title
     - Stream URL (YouTube Live, Twitch, or custom iframe)
     - Creator’s Kaspa receiving address (readable but clearly copyable).
   - On submit:
     - Show confirmation and generated `sessionId` + shareable link: `kaspaconcert.app/session/{sessionId}`.
     - Offer quick actions: “Copy link”, “Open session dashboard”.

2. **Creator Session Dashboard** (`/creator/session/{sessionId}`)
   - Sections:
     - Embedded live stream player.
     - Real‑time **total tips** (lifetime + current session).
     - **Live tip feed** (chronological list of tips).
     - Read‑only display of creator wallet/address.
     - Session status (LIVE / ENDED).
   - Behavior:
     - WebSocket‑driven updates, no reloads.
     - As tips are confirmed, totals and feed update in real time.
   - Controls:
     - “End Session” button → confirmation modal → session stats freeze upon end (but no withdrawal step; funds already in wallet).

3. **Post‑Session Summary View (Creator)**
   - Show:
     - Session title, stream thumbnail.
     - Total KAS earned, number of tips.
     - Top tippers (by amount).
     - Simple trend chart (sparkline) of tips over time.

### 3.2 Viewer Flow

1. **Viewer Session Page** (`/session/{sessionId}`)
   - On load:
     - Fetch session metadata and show:
       - Embedded stream player.
       - Tip panel and call‑to‑action.
       - Live tip feed.
   - Sections:
     - **Stream area**: large video area top/left.
     - **Tip & wallet panel**: on the right on desktop, below video on mobile.
     - **Live tip feed**: visible at all times (e.g., right column or below, depending on breakpoint).

2. **Wallet Connection UX**
   - Methods (conceptual UI support for):
     - Browser wallet extension (Kaspa browser wallet).
     - Kaspa Web SDK (in‑browser wallet).
     - Manual address + signing as fallback.
   - States:
     - Disconnected state: prominent “Connect Wallet” primary button.
     - Connected: show shortened address, network, approximate balance.
   - Requirements:
     - Non‑custodial: emphasize that keys never leave client.
     - Clear connection status indicators and error states.

3. **Tip Selection & Transaction Flow**
   - Tip controls:
     - Preset amounts (e.g. `0.1 KAS`, `0.5 KAS`, `1 KAS`) in button form.
     - Custom amount input.
   - Validation UI:
     - Check balance, minimum amount, network availability.
     - Friendly, human‑readable error messages on invalid input.
   - Transaction states:
     - **Draft**: amount selected, “Send Tip” enabled.
     - **Pending**:
       - Triggered immediately after sending/signed tx.
       - Show “Tip pending” animation / micro‑interaction.
       - Optionally optimistic UI (e.g., ghost card in feed).
     - **Confirmed**:
       - When backend / Kaspa RPC confirms inclusion in DAG.
       - Upgrade pending UI to “Confirmed”.
       - Animate tip card into live feed; update totals.
     - **Failed**:
       - Clear, non‑scary error: what went wrong & what to do.

4. **Live Tip Feed**
   - Show for each tip:
     - Amount tipped.
     - Timestamp.
     - Username or shortened address.
   - Real‑time behavior:
     - New tips slide in from top with a slight bounce.
     - Pending/confirmed states visually distinct.

---

## 4. Design System (STRICTLY Enforce)

You MUST implement all UI using this design system. Do not invent new colors/typography outside of these unless needed for minor supporting roles (and they must be derived neutrals).

### 4.1 Brand & Tone

- **Brand personality**: Fast, Transparent, Engaging, Cutting‑edge, Fun, Secure.
- **Tone**: Energetic, futuristic, trustworthy. Feels like a Web3 Twitch/YouTube‑meets‑Fintech hybrid.

### 4.2 Typography

- **Primary fonts**:
  - Headings / Display: **Inter** (Google Fonts).
  - Body / Paragraphs: **Roboto**.
  - Monospace / Code: **Fira Code** (for addresses, tx hashes, etc.).
- **Guidelines**:
  - Heading hierarchy: H1–H6 in Inter, Bold, approx 40px → 24px (desktop; scale down on mobile).
  - Body: Roboto Regular, 16px, line-height 1.5.
  - Font weights: only 400, 500, 700.
  - Use `Fira Code` when showing tx hashes, addresses, or logs.

### 4.3 Color System

- **Core Palette**:
  - Kaspa Blue `#4F7CFF` → **primary actions**, CTAs, main highlights.
  - Kaspa Dark `#1A1A1A` → primary dark backgrounds.
  - White `#FFFFFF` → text on dark and backgrounds for light mode.
  - Neon Purple `#9B59FF` → secondary actions, badges, notifications.
  - Neon Cyan `#00FFF7` → tip amounts, live updates, subtle accents.
  - Success Green `#00C853` → success / transaction confirmed.
  - Error Red `#FF3B30` → errors, failures, destructive actions.
  - Neutral Gray `#E5E5E5` → cards, borders, dividers when needed.
- **Usage Rules**:
  - Primary buttons: Kaspa Blue background, white text.
  - Secondary buttons: Neon Purple border, transparent background.
  - Feedback:
    - Success: green.
    - Error: red.
  - Background defaults:
    - Dark mode: `#1A1A1A` with neon accents.
    - Light mode: `#FFFFFF` plus neutral grays and Kaspa Blue accents.
  - Tip feed highlights: Neon Cyan as accent for amounts or badges.

### 4.4 Layout & Spacing

- **Grid**:
  - 12‑column responsive grid.
  - Max container width: 1440px.
  - Gutters:
    - Mobile: 16px.
    - Tablet: 24px.
    - Desktop: 32px.
- **Spacing scale**:
  - XS: 4px
  - S: 8px
  - M: 16px
  - L: 24px
  - XL: 32px
  - XXL: 48px
  - XXXL: 64px
- **Responsive breakpoints**:
  - Mobile: 320–767px
  - Tablet: 768–1023px
  - Desktop: 1024–1439px
  - Large: 1440px+

### 4.5 Core Components (Design Them as a System)

Design a reusable component library for KaspaConcert. Each component should exist in the design and be used consistently across screens.

- **Buttons**
  - Variants:
    - Primary (Kaspa Blue background, white text, 12px radius).
    - Secondary (Neon Purple border, transparent background, bold text).
    - Disabled (gray with 50% opacity).
  - States: default, hover (slight scale up + subtle shadow), active, focused, disabled, loading.
  - Sizes: small, medium, large.

- **Cards**
  - 16px rounded corners.
  - Background: light (White) or dark (`#1A1A1A`) depending on theme.
  - Soft shadow: `0 4px 12px rgba(0,0,0,0.1)`.
  - Used for: live tip entries, transaction preview, session summary, metric cards.

- **Modals / Popups**
  - Centered with backdrop blur overlay.
  - Smooth fade‑in (~200 ms).
  - Close button top‑right and ESC support visible in design.
  - Use for: “End session?”, “Confirm tip”, “Error details”.

- **Input Fields**
  - 12px radius, 12px padding.
  - Focus: Kaspa Blue border with subtle glow.
  - Error: red border, inline error message.
  - For forms: session creation, tip custom amount, etc.

- **Tooltips**
  - Dark background, white text, subtle arrow.
  - Use for blockchain jargon (“UTXO”, “Kaspa address”, gas/fees).
  - Fade‑in ~150 ms.

- **Toasts / Notifications**
  - Top‑right placement.
  - Types:
    - Success (green).
    - Error (red).
    - Info (Kaspa Blue).
  - Slide‑in from top‑right and auto‑dismiss after ~3 seconds.

- **Tables**
  - For transactions, top tippers, potentially session history.
  - Optional sortable columns.

- **Header**
  - Left: KaspaConcert logo (abstract “K” or BlockDAG‑inspired mark), app name.
  - Center or right: navigation (e.g., “Home”, “Create session”, “Docs”).
  - Right: dark/light mode toggle, wallet status (for viewer), basic user actions.
  - Sticky at top.

- **Footer**
  - Minimal: links, social icons, “Powered by Kaspa” type note.

- **Graph Components**
  - Simple sparkline or mini bar chart for tipping trend over session time.
  - Colors: success green for cumulative line, neon cyan for live highlight.

### 4.6 Animations & Micro‑Interactions

- Keep animations purposeful and subtle, in 150–250 ms range.
- **Examples**:
  - Buttons: scale 1.0 → 1.03 on hover with small shadow.
  - Tip feed: new tip card slides in from top with a slight bounce.
  - Toasts: slide from top‑right and fade out.
  - Pending transaction: shimmering or pulsing accent around “pending” card.
  - Mode toggle: smooth cross‑fade and background shift between dark/light.

### 4.7 Dark Mode / Light Mode

- **Default**: Dark mode.
- **Toggle**: Prominent in header.
- **Dark mode**:
  - Emphasize neon accents (Kaspa Blue, Neon Cyan, Neon Purple) against `#1A1A1A`.
- **Light mode**:
  - Neutral grays for surfaces, Kaspa Blue for key actions.
- Ensure all text/background combos meet **contrast ratio ≥ 4.5:1**.

### 4.8 Accessibility (A11Y)

- Use large, tappable buttons on mobile.
- Clear focus outlines for all interactive elements.
- Keyboard navigability for dialogs, modals, and forms.
- ARIA‑live region representation in the live feed design (indicate visually where screen‑reader updates would be announced).
- Minimal blockchain jargon in primary surfaces; use tooltips/microcopy for explanations.

---

## 5. Technical Framing (To Inform Layout, Not Code)

You do NOT need to write code here, but design assuming:

- **Frontend**:
  - React.js
  - Tailwind CSS for utility-first styling aligned with this design system.
  - Framer Motion (or similar) for micro‑interactions and transitions.
  - PWA (service worker + app shell, mobile‑first).
  - WebSockets for real-time updates.

- **Backend**:
  - Node.js + Express, WebSocket gateway.
  - Kaspa RPC / public node for tx broadcasting and confirmation.

Design component hierarchies and screen layouts that would map cleanly into a React + Tailwind component tree with reusable primitives.

---

## 6. Screens to Produce (End-to-End Coverage)

Design **all** of the following:

1. **Landing / Marketing Overview (Optional but Helpful for Judges)**
   - Elevator pitch: “Real‑time live‑stream tipping on Kaspa.”
   - CTA: “Create Session”, “Join Session” (with a session ID or list of active sessions).
   - Compact explanation of why Kaspa’s speed matters.

2. **Creator: Create Session Page**
   - Session creation form with validation.
   - Preview of how stream will be embedded.
   - On success, shareable session URL with copy & share UI.

3. **Creator: Live Session Dashboard**
   - Layout showing video, tip totals, live tip feed, session metadata.
   - Real-time behavior visualized (even as static mocks).
   - “End session” control with confirmation modal.

4. **Creator: Post‑Session Summary**
   - Stats overview, top tippers, sparkline graph.
   - Clean, judge‑friendly view that demonstrates real‑world utility.

5. **Viewer: Session Page**
   - Embedded video + wallet connect panel + tip panel + live feed.
   - Responsive layouts:
     - Mobile: stack video → tip panel → feed.
     - Desktop: 2 or 3 column layout within 12‑column grid.

6. **Wallet Connection Modals / Panels**
   - Connect state.
   - Connected state.
   - Error / reconnection flows.

7. **Tipping Flow States**
   - Default (ready to tip).
   - Pending transaction.
   - Confirmed transaction.
   - Failed transaction.
   - Distinct visual treatments, consistent across app.

8. **Global Elements**
   - Header (with logo, nav, dark/light toggle, wallet state).
   - Footer.
   - Global toast/notification system.

Ensure that all of the above share one coherent visual language consistent with the design system.

---

## 7. Output Expectations

- Produce **clear, high‑fidelity UI designs for all the above screens and components**, with consistent application of:
  - Typography (Inter, Roboto, Fira Code).
  - Color system (Kaspa Blue, Neon Purple, Neon Cyan, Success Green, Error Red, Kaspa Dark, Neutral Gray).
  - Spacing scale and grid.
  - States and micro‑interactions.

- Emphasize **how fast and “live” the experience feels**:
  - Pending → confirmed flows.
  - Real‑time tip feed dynamics.
  - Instant feedback after each user action.

- The final design should feel like:
  - A modern Web3 app inspired by Uniswap/OpenSea/MetaMask for aesthetic and clarity.
  - Combined with the engagement style of Twitch/YouTube Live and the real‑time feel of Discord.

Do not omit any critical feature from the flows above. Prioritize **clarity, real‑time feedback, Web3 trust cues, and hackathon‑ready polish**.