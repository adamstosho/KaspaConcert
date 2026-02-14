What you’re building (my understanding)
Product: KaspaConcert – a React PWA for real‑time live-stream tipping in KAS. Viewers watch an embedded stream (YouTube/Twitch/iframe) and send on-chain KAS tips that feel as instant as likes.
Kaspa angle: Uses Kaspa’s 100ms blocks + BlockDAG so tips confirm in seconds, with live UI updates (tip feed, totals) driven by events/WebSockets, not polling.
Goal: A production-grade reference app for Kaspa: clean architecture, strong UX, clear documentation, and obviously “Kaspa-native” so it scores high on originality, applicability, UX, technical implementation, and documentation.
Core features & flows (from PRD + userFlow)
Roles
Creator: creates a session (title, stream URL, Kaspa address), shares link, sees live embedded stream + total tips + live tip feed and a simple dashboard.
Viewer: opens session URL, connects wallet, selects tip amount, signs & sends KAS, then sees pending → confirmed states and the tip appear in the live feed.
Key flows
Creator flow: /create → submit session → get sessionId URL → watch dashboard update in real time → end session (stats frozen; funds already in their wallet).
Viewer flow: open /session/{sessionId} → stream + tip panel + connect wallet → choose amount → sign tx client-side → backend/WebSocket emits TIP_PENDING then TIP_CONFIRMED → UI updates tip feed + totals.
Non-functional
Fast UI updates (<300ms), graceful error handling, no private keys on backend, mobile-first, very low cognitive load, and all hackathon compliance (README, demo video, reproducible in <10 minutes).
Architecture & tech (from PRD + userFlow)
Frontend (React PWA):
Modules for Session, Wallet, Tipping, Real-Time, plus PWA shell.
Uses Kaspa Web SDK for wallet & signing, WebSockets for real-time events, service workers for PWA.
Backend (Node.js + Express):
Session service (session metadata + status), WebSocket gateway (tip pending/confirmed), transaction monitor (subscribes to Kaspa RPC, tracks tx & UTXOs), validation layer (sanity checks).
Blockchain layer (Kaspa):
Pure UTXO transfers, no smart contracts. Backend uses Kaspa RPC / public node to broadcast tx, subscribe to blocks, and query UTXOs.
Design system (rules I’ll strictly follow)
From designSystem.md, these are non‑negotiable constraints I’ll bake into every component:
Brand & typography
Fonts: Inter for headings (H1–H6, 40px → 24px, 1.2 line-height), Roboto for body (16px, 1.5 line-height), Fira Code for hashes/addresses.
Weights: 400, 500, 700 only.
Tone: energetic, futuristic, trustworthy; keywords: Fast, Transparent, Engaging, Fun, Secure.
Colors
Primary: Kaspa Blue #4F7CFF (main CTAs).
Secondary: Neon Purple #9B59FF, highlights: Neon Cyan #00FFF7, backgrounds: #1A1A1A (dark default) / #FFFFFF (light), feedback: Green #00C853, Red #FF3B30, neutral: #E5E5E5.
Use dark mode by default, with a header toggle for light mode; ensure WCAG 4.5:1 contrast.
Layout & spacing
12‑column responsive grid, max width 1440px, gutters 16/24/32px (mobile/tablet/desktop).
Spacing scale: 4/8/16/24/32/48/64 px.
Core components (I’ll implement them as a reusable library in React, likely with Tailwind utility classes that encode this system):
Buttons: primary/secondary/disabled, 12px radius, hover scale + shadow, consistent focus.
Cards: 16px radius, light/dark variants, used for tip feed, session summaries, etc.
Modals, inputs, tooltips, toasts, tables, header (logo + nav + dark-mode toggle), footer, and graphs (sparkline trends).
Interactions
Micro‑interactions on every important action: tipping, pending/confirmed state, live feed slide-in with slight bounce, toasts slide from top-right and auto-dismiss in 3s.
Strong wallet & transaction UX: clear pending, confirmed, and error states, with friendly microcopy.
How I’ll help you win KASPATHON
Assuming we stick with the stack implied by the docs (React + Tailwind + Framer Motion PWA frontend, Node + Express + WebSocket backend, Kaspa RPC/SDK), my next concrete steps would be:
Set up the project structure: initialize a Git repo here, scaffold frontend (React + Vite + Tailwind + Framer Motion, design system tokens and components) and backend (Node + Express + Socket.IO, simple in-memory session store).
Implement the MVP user flows:
Creator: /create form → session dashboard (stream + totals + live tip feed).
Viewer: /session/:id page with wallet connect, preset/custom tips, pending/confirmed states, live feed.
WebSocket events & a mock Kaspa integration first, then wire to real Kaspa RPC/SDK.
Polish UX for judges:
Strictly apply the design system, add micro-interactions, dark mode, accessibility, and a clean responsive layout.
Add architecture diagram, README, and a small script/plan for the 3‑minute demo.
If you’re happy with this understanding, I can start by scaffolding the codebase (frontend + backend) and encoding the design system as reusable components so everything we build from here stays consistent.