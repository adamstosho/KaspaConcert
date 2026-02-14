KASPACONCERT DESIGN SYSTEM

Purpose: Provide a standardised, reusable, and highly professional design language for building a responsive Web3 live-stream tipping platform. This ensures consistency, scalability, accessibility, and high visual impact.

1. Brand Identity

Logo Concept:

Minimalist, modern, and blockchain-inspired

Incorporate abstract “K” or BlockDAG motifs

Adaptable to both light and dark modes

Tone:

Energetic, futuristic, trustworthy

Communicates speed, reliability, and transparency

Brand Personality Keywords:

Fast, Transparent, Engaging, Cutting-edge, Fun, Secure

2. Typography

We want readability, modernity, and subtle Web3 tech vibe.

Primary Fonts
Purpose	Font	Use Case
Headings / Display	Inter (Google Fonts)	Bold, medium, and semi-bold for page titles, sections
Body / Paragraphs	Roboto (Google Fonts)	Clean, legible text for content, tip feeds, and dashboards
Monospace / Code	Fira Code	Displaying transaction hashes, wallet addresses, or technical logs

Guidelines:

Heading Hierarchy: H1-H6 using Inter: Bold 40px → 24px

Body Text: Roboto Regular 16px

Line height: 1.5 for body, 1.2 for headings

Font weights: Use 400 (regular), 500 (medium), 700 (bold)

3. Color System

For Web3 apps, contrast, trust, and vibrancy are critical. KaspaConcert’s palette balances futuristic tech + user engagement.

Core Palette
Name	Hex	Purpose
Kaspa Blue	#4F7CFF	Primary action buttons, highlights
Kaspa Dark	#1A1A1A	Dark backgrounds, text on light UI
White	#FFFFFF	Background, text on dark UI
Neon Purple	#9B59FF	Secondary actions, badges, notifications
Neon Cyan	#00FFF7	Tip amounts, live updates, subtle accents
Success Green	#00C853	Transaction confirmed feedback
Error Red	#FF3B30	Transaction failure, warnings
Neutral Gray	#E5E5E5	Cards, borders, dividers

Usage Guidelines

Primary action buttons → Kaspa Blue (#4F7CFF)

Secondary actions → Neon Purple (#9B59FF)

Feedback states: Success = Green, Error = Red

Background: Dark mode primary (#1A1A1A), Light mode (#FFFFFF)

Tips feed highlights → Neon Cyan

Reference Trend: Apps like Uniswap, OpenSea, MetaMask inspire neon accents + dark tech themes.

4. Spacing and Layout
Grid

12-column responsive grid (mobile → desktop)

Gutters: 16px (mobile), 24px (tablet), 32px (desktop)

Max container width: 1440px

Spacing Scale
Type	Pixels
XS	4
S	8
M	16
L	24
XL	32
XXL	48
XXXL	64
Responsive Breakpoints

Mobile: 320–767px

Tablet: 768–1023px

Desktop: 1024–1439px

Large screens: 1440px+

5. UI Components

We want modular, reusable, modern Web3 components.

5.1 Buttons

Primary: Kaspa Blue background, White text, rounded corners 12px

Secondary: Neon Purple border, transparent background, bold text

Size Variants: Small, Medium, Large

Hover: Slight scale up + subtle shadow

Disabled: Gray with 50% opacity

5.2 Cards

Rounded corners: 16px

Background: White or dark (#1A1A1A)

Shadow: 0 4px 12px rgba(0,0,0,0.1)

Usage: Live tip feed, transaction preview, session overview

5.3 Modals / Popups

Centered, overlay with blur

Smooth fade-in (200ms)

Close button top-right, keyboard ESC support

5.4 Input Fields

Rounded corners: 12px

Padding: 12px

Focus state: Kaspa Blue border

Error state: Red border + error message

5.5 Tooltips

Dark background, white text, subtle arrow

Fade-in 150ms

5.6 Toasts / Notifications

Top-right placement

Success: Green

Error: Red

Info: Kaspa Blue

Auto-dismiss after 3 seconds

6. Icons and Illustrations

Use vector icons (SVG) for all buttons & actions

Icon library: Heroicons or Remix Icon

Optional subtle futuristic illustrations for empty states, e.g., microtransactions, blockchain nodes, live stream motifs

7. Animations & Interactions

Micro-interactions for every user action: button clicks, transaction pending/confirmed

Smooth fade/slide transitions (150–250ms)

Live tip feed: tip cards slide in from top with slight bounce

Hover and focus states consistent across buttons and cards

Toast notifications slide in from top-right, fade out after success

8. Data Visualization

Live tip feed: real-time cards with neon highlights

Total earnings: animated counters

Optional sparkline graph for session tipping trend

Colors: success green for incoming tips, neon cyan for live highlight

9. Dark Mode / Light Mode

Default dark mode (trend in Web3 apps)

Toggle available in header

Dark mode emphasizes neon accents (Kaspa Blue, Neon Cyan, Neon Purple)

Light mode uses neutral grays, Kaspa Blue accents

10. Accessibility (A11Y)

Contrast ratio >= 4.5:1

Keyboard navigation support

Screen reader labels for all interactive elements

Focus indicators for buttons, inputs, modals

Live tip feed updates ARIA live region for screen readers

11. Web3 UX Considerations

Wallet connection clearly explained

Transaction pending/confirmed states with real-time feedback

Transaction errors clearly communicated

Tooltips or microcopy for blockchain-specific terms

Gas fees hidden if negligible, optional advanced toggle

12. Component Library Summary
Component	Variants	Notes
Button	Primary, Secondary, Disabled	Hover + click micro-interactions
Input	Text, Number, Password	Validation + error states
Card	Tip feed, session summary	Neon accent borders optional
Modal	Confirmation, Info, Warning	Fade + scale transitions
Tooltip	Small, medium	Hover/focus triggered
Toast	Success, Error, Info	Slide-in top-right
Table	Transactions, top tippers	Optional sortable columns
Header	Logo, navigation, dark mode toggle	Sticky top bar
Footer	Links, social icons	Minimal
Graph	Sparkline, Bar	Real-time tipping trend
13. References / Inspiration

Uniswap / OpenSea: Neon accents, dark backgrounds, blockchain feel

MetaMask: Clean, user-friendly wallet interactions

Twitch / YouTube Live: Live feed UX, tipping overlays

Discord: Real-time feed, PWA-style responsive UI

14. Tools & Technologies for Implementation

Frontend: React.js, TailwindCSS, Framer Motion (animations), PWA support

Icons: Heroicons / Remix

Graphs: Recharts or Chart.js for sparkline tip charts

State Management: Redux or Zustand

Backend: Node.js + Express + WebSocket (Socket.IO)