# KaspaConcert UI Design System

## Overview

KaspaConcert is a **production-ready, mobile-first PWA** for real-time live-stream tipping on the Kaspa blockchain. This design system ensures consistency, scalability, and a user experience that feels as immediate as the blockchain transactions it facilitates.

---

## 1. Brand Identity

### Core Values
- **Fast**: Transactions confirmed in milliseconds
- **Transparent**: Every tip is on-chain and verifiable
- **Engaging**: Real-time feedback and visual confirmation
- **Cutting-edge**: Modern Web3 UX that doesn't feel technical
- **Fun**: Gamified tipping experience with instant gratification
- **Secure**: Non-custodial, client-side signing

### Visual Language
KaspaConcert uses a **dark-first aesthetic** with **neon accents**, inspired by:
- Modern Web3 apps (Uniswap, OpenSea, MetaMask)
- Live streaming platforms (Twitch, YouTube Live)
- Real-time collaborative tools (Discord)

---

## 2. Typography System

### Font Stack
- **Headings (H1-H6)**: Inter, Bold (400, 500, 700 weights)
- **Body Copy**: Roboto, Regular (16px, 1.5 line-height)
- **Monospace/Codes**: Fira Code (for addresses, hashes, technical details)

### Hierarchy
```
H1: 40px, Bold, Inter - Page titles, hero statements
H2: 32px, Bold, Inter - Section headers
H3: 24px, Bold, Inter - Subsection headers
H4: 20px, Bold, Inter - Card titles
H5: 16px, Bold, Inter - Form labels, emphasis
H6: 14px, Bold, Inter - Small headers

Body: 16px, Regular, Roboto - Main content
Small: 14px, Regular, Roboto - Secondary text
Xsmall: 12px, Regular, Roboto - Metadata, timestamps
```

---

## 3. Color System

### Primary Palette
| Color | Hex | Usage |
|-------|-----|-------|
| Kaspa Blue | #4F7CFF | Primary CTAs, highlights, focus states |
| Kaspa Dark | #1A1A1A | Primary dark background |
| White | #FFFFFF | Text on dark, clean backgrounds |
| Neon Purple | #9B59FF | Secondary actions, badges, notifications |
| Neon Cyan | #00FFF7 | Tip amounts, live updates, accents |
| Success Green | #00C853 | Confirmations, success states |
| Error Red | #FF3B30 | Errors, failures, destructive actions |
| Neutral Gray | #E5E5E5 | Borders, dividers, muted UI |

### Color Rules
- **Dark Mode (Default)**: Use Kaspa Dark (#1A1A1A) as base, emphasize neon accents
- **Button Hover**: Kaspa Blue background scales up slightly with subtle shadow
- **Text Contrast**: All text/bg combos meet WCAG AA (4.5:1 minimum)
- **Feedback States**:
  - Success = Green (#00C853)
  - Error = Red (#FF3B30)
  - Pending = Kaspa Blue (#4F7CFF) with pulse animation
  - Confirmed = Green with checkmark icon

---

## 4. Spacing & Layout

### Spacing Scale
```
XS:   4px
S:    8px
M:    16px
L:    24px
XL:   32px
XXL:  48px
XXXL: 64px
```

### Grid System
- **12-column responsive grid**
- **Max width**: 1440px
- **Gutters**: 16px (mobile) / 24px (tablet) / 32px (desktop)
- **Breakpoints**:
  - Mobile: 320–767px (full-width stacked)
  - Tablet: 768–1023px (2-column layouts)
  - Desktop: 1024–1439px (3-column layouts)
  - Large: 1440px+ (max-width container)

### Responsive Behavior
```
Mobile-first approach:
- Stack all elements vertically
- Full-width buttons, cards
- Minimal horizontal padding (16px)

Tablet (768px+):
- 2-column grids
- Side-by-side layouts
- Medium padding (24px)

Desktop (1024px+):
- 3-column grids
- Large horizontal layouts
- Generous padding (32px)
```

---

## 5. Core Components Library

### Buttons

#### Variants
```
Primary: Kaspa Blue background, white text
  - Desktop: 12px radius, 6px 24px padding
  - States: default, hover (scale 1.03 + shadow), active (scale 0.95), disabled (50% opacity)

Secondary: Neon Purple border, transparent background, bold text
  - Same radius/padding as primary
  - States: default, hover (10% neon-purple bg), active, disabled

Ghost: No background, text only
  - Used for minimal CTAs
  - States: default, hover (10% bg), active, disabled
```

#### Sizes
```
Small: 12px padding, text-sm
Medium: 16px padding, text-base (default)
Large: 20px padding, text-lg
```

#### Example Usage
```tsx
<KaspaButton variant="primary" size="md">Send Tip</KaspaButton>
<KaspaButton variant="secondary" size="lg" fullWidth>Cancel</KaspaButton>
<KaspaButton isLoading disabled>Processing...</KaspaButton>
```

### Cards

#### Default
- 16px border-radius
- Light background (white) or dark (#1A1A1A)
- Soft shadow: `0 4px 12px rgba(0,0,0,0.1)`
- 16px padding
- 1px border with neutral gray

#### Neon Accent Variants
```
neonAccent="blue"    // Left border: Kaspa Blue
neonAccent="purple"  // Left border: Neon Purple
neonAccent="cyan"    // Left border: Neon Cyan
```

#### Example
```tsx
<KaspaCard neonAccent="blue" hoverable>
  <h3>Tip This Creator</h3>
  <p>Send KAS directly to support</p>
</KaspaCard>
```

### Modals & Dialogs

- Centered on screen with dark backdrop + blur
- Smooth fade-in transition (200ms)
- Close button: top-right corner + ESC key support
- Click outside does NOT close (optional via prop)
- Used for: confirmations, forms, success messages

### Input Fields

- 12px border-radius, 12px padding
- Focus: Kaspa Blue border + subtle glow
- Error: Red border + red helper text inline
- Placeholder: muted-foreground color
- Disabled: 50% opacity, not-allowed cursor

### Tooltips

- Dark background, white text, subtle arrow
- Appear on hover or focus
- Fade-in 150ms
- Used for: blockchain jargon explanations, info hints

### Toast Notifications

- Fixed top-right (16px from edges)
- Auto-dismiss after 3 seconds
- Slide-in from top-right with fade
- Types:
  - **Success** (green): Transaction confirmed
  - **Error** (red): Transaction failed
  - **Info** (blue): General announcements

---

## 6. Micro-Interactions & Animations

### Timing
All animations: **150–250ms** using ease-out timing

### Key Animations
```
Button hover:       scale 1.0 → 1.03 + shadow (150ms)
Button active:      scale 1.03 → 0.95 (100ms)
Tip card appear:    slide in from top + bounce (300ms)
Toast appear:       slide from top-right (200ms)
Toast dismiss:      fade out (300ms)
Pending pulse:      opacity 1 → 0.7 → 1 (infinite)
Confirmation mark:  scale 0 → 1.2 → 1 (500ms)
Field focus:        border color change (150ms)
```

### Implementation (Tailwind)
```tsx
// Bounce in for new tips
className="animate-bounce-in"

// Slide in from top (modals, toasts)
className="animate-slide-in-from-top"

// Pulse glow for pending state
className="animate-pulse-glow"

// Hover scale on buttons
className="hover:scale-105 transition-all"
```

---

## 7. Screens & Pages

### Landing Page (`/`)
- Hero section with CTA buttons
- Feature cards grid (6 cards, 2x3 layout)
- "How It Works" step card section
- Stats showcase (3 key metrics)
- Final CTA section
- Footer with links

### Create Session (`/create`)
- Form with validation (title, stream URL, Kaspa address)
- Real-time error messages
- Success state with shareable link + copy button
- Info cards with best practices

### Viewer Session (`/session/[sessionId]`)
- Responsive layout:
  - **Mobile**: Video → Tip panel → Live feed (stacked)
  - **Tablet**: Video (full) | Tip panel (side)
  - **Desktop**: Video + Feed (2/3) | Tip panel (1/3)
- Embedded stream player (YouTube/Twitch/iframe)
- Wallet connection panel
- Tip selection (presets + custom amount)
- Live tip feed with real-time updates
- Session stats sidebar

### Creator Dashboard (`/creator/session/[sessionId]`)
- Large live video preview
- Key metrics: Total tips, # of tips, duration, avg tip
- Live tip feed (creator view, shows all tips)
- Top tippers leaderboard
- Share session link + copy button
- Earnings sparkline chart
- "End Session" button with confirmation modal
- Session status indicator (LIVE / ENDED)

### Session Summary (`/session/[sessionId]/summary`)
- Large success animation
- Total earnings display (prominent)
- Top 5 tippers with rankings
- Earnings breakdown chart
- Tips for next stream (best practices)
- Share to social media buttons
- CTA to create new session

---

## 8. Key User Flows with UI States

### Creator Flow: Session Creation → Dashboard → Summary

**Step 1: Create Form**
- Input fields: Session title, Stream URL, Kaspa address
- Real-time validation with error messages
- Submit button (disabled if invalid)

**Step 2: Success Confirmation**
- Card with session ID + copy button
- Shareable link + copy button
- Action buttons: "Go to Dashboard" / "Back to Home"

**Step 3: Live Dashboard**
- Live stream embedded at top
- Total tips counter (updates in real-time via WebSocket)
- Live tip feed showing pending → confirmed state transitions
- Top tippers list
- Earnings sparkline chart
- "End Session" button

**Step 4: Session Ended**
- Modal confirmation dialog
- Final earnings summary
- Close button dismisses modal
- Option to create new session

**Step 5: Summary Page**
- Large earnings display
- Top tippers ranked
- Earnings breakdown chart
- Share buttons
- Best practices recommendations

### Viewer Flow: Open Session → Connect Wallet → Send Tip → See Confirmation

**Step 1: Session Load**
- Live stream embedded (responsive)
- Wallet connection CTA (prominent card)
- Live tip feed (showing existing tips)

**Step 2: Wallet Connection**
- Modal with 3 options: Extension / Web SDK / Manual
- On connect: Show wallet address (shortened) + balance
- Persistent wallet state in header

**Step 3: Tip Selection**
- 4 preset buttons (0.1, 0.5, 1, 5 KAS)
- Custom amount input field
- Real-time amount validation
- "Send Tip" button (disabled if invalid)

**Step 4: Pending Transaction**
- "Tip pending" badge with pulse animation
- Optimistic UI: tip card appears in feed with "Pending" status
- No navigation away (WebSocket listening for confirmation)

**Step 5: Confirmed Transaction**
- Badge changes from "Pending" to "Confirmed" (green)
- Sparkline updates
- Toast notification: "Tip confirmed!"

---

## 9. Dark Mode & Light Mode

### Default: Dark Mode
- Background: #1A1A1A (Kaspa Dark)
- Text: White (#FFFFFF)
- Cards: #0F0F0F or #1A1A1A with border
- Accents: Kaspa Blue, Neon Purple, Neon Cyan (vibrant against dark)

### Toggle in Header
- Moon icon → activate light mode
- Sun icon → activate dark mode
- Smooth cross-fade transition (200ms)

### Light Mode (Optional)
- Background: White (#FFFFFF)
- Text: Kaspa Dark (#1A1A1A)
- Cards: White with light gray borders
- Accents: Kaspa Blue (more muted), Neon Purple (more muted)
- Ensure 4.5:1 contrast ratio on all text

---

## 10. Accessibility (A11Y)

### WCAG Compliance
- **Color Contrast**: All text/bg >= 4.5:1 ratio
- **Focus Indicators**: Blue outline on all interactive elements
- **Keyboard Navigation**: Tab order logical, ESC closes modals
- **Screen Readers**: ARIA labels, live regions for tip feed

### Specific Implementations
```tsx
// Form labels
<label htmlFor="sessionTitle">Session Title</label>

// ARIA live region for tip feed updates
<div role="region" aria-live="polite" aria-label="Live tips">
  {/* Tips appear here, announced to screen readers */}
</div>

// Button states
<button disabled aria-disabled={isLoading}>Send</button>

// Focus visible
<button className="focus:outline-none focus:ring-2 focus:ring-kaspa-blue">
```

### Mobile Accessibility
- Large touch targets: 44px minimum (buttons, inputs)
- Clear labels and placeholder text
- Minimal cognitive load: one action per card
- Readable font sizes: 16px minimum on mobile

---

## 11. File Structure

```
/app
  /page.tsx                      # Landing page
  /create/page.tsx               # Session creation form
  /session/[sessionId]/page.tsx   # Viewer session page
  /session/[sessionId]/summary/page.tsx  # Summary page
  /creator/session/[sessionId]/page.tsx  # Creator dashboard
  /layout.tsx                    # Root layout with fonts

/components
  /kaspa-button.tsx              # Primary button component
  /kaspa-card.tsx                # Card component
  /header.tsx                    # Sticky header with nav
  /footer.tsx                    # Footer with links
  /toast.tsx                     # Toast notifications
  /modal.tsx                     # Modal/dialog component
  /badge.tsx                     # Badge component
  /input.tsx                     # Form input component
  /loading-spinner.tsx           # Loading indicator
  /wallet-connect.tsx            # Wallet connection panel
  /tip-panel.tsx                 # Tip amount selection
  /tip-feed.tsx                  # Real-time tip list

/app/globals.css                 # Global styles + design tokens
/tailwind.config.ts              # Tailwind configuration with KaspaConcert colors
```

---

## 12. CSS Utility Classes (Tailwind)

### KaspaConcert Custom Classes
```css
.kaspa-btn-primary    /* Blue button */
.kaspa-btn-secondary  /* Purple border button */
.kaspa-card          /* Card with shadow */
.kaspa-input         /* Form input */
```

### Common Combinations
```
Text Colors:
  text-kaspa-blue, text-neon-purple, text-neon-cyan
  text-success-green, text-error-red
  text-foreground (smart), text-muted-foreground

Backgrounds:
  bg-kaspa-dark, bg-card, bg-background
  bg-kaspa-blue/10, bg-neon-purple/20 (with opacity)

Borders:
  border-kaspa-blue, border-neon-cyan, border-error-red
  border-b, border-l, border-2 (thickness)

Spacing:
  gap-4, px-6, py-3, mb-8
  max-w-7xl, mx-auto, w-full
```

---

## 13. Icons

### SVG Icons (Embedded)
All icons are inline SVGs or from Heroicons/Lucide React.

### Common Icons
```
Wallet:        <WalletIcon />
Tip/Money:     <CurrencyDollarIcon />
Live indicator: Pulsing green dot
Success:       Checkmark with green background
Error:         X mark with red background
Pending:       Hourglass or spinner
Settings:      Gear icon
Share:         Share/link icon
Copy:          Copy/clipboard icon
```

---

## 14. Best Practices

### Do's ✓
- Use the design tokens (colors, spacing, typography)
- Keep micro-interactions subtle (150–250ms)
- Validate forms in real-time with clear error messages
- Show loading states on all async actions
- Use optimistic UI for better perceived speed
- Always show transaction status (pending → confirmed)
- Keep button copy action-oriented ("Send Tip", not "Submit")

### Don'ts ✗
- Don't invent new colors outside the palette
- Don't use more than 2 font families
- Don't disable buttons without showing why
- Don't show technical jargon without tooltips
- Don't have animations longer than 300ms
- Don't break the 12-column grid without good reason
- Don't use shadows other than kaspa-card or kaspa-hover

---

## 15. Future Extensions

### Phase 2
- Dark/light mode toggle fully functional
- Tip-triggered visual effects (confetti, animations)
- Sound effects for tips (muted by default)
- User profiles with follower/following
- Tip history for viewers

### Phase 3
- NFT-based fan badges
- Leaderboard system (global, weekly, etc.)
- Streaming analytics dashboard
- Integration with Discord/Twitter for sharing
- Multi-creator group sessions

---

## 16. Testing Checklist

- [ ] All components render correctly on mobile, tablet, desktop
- [ ] All buttons have proper hover/active/focus states
- [ ] Form validation shows errors clearly
- [ ] Transaction states (pending → confirmed) transition smoothly
- [ ] Wallet connection flow completes end-to-end
- [ ] Toast notifications appear and dismiss automatically
- [ ] Keyboard navigation works throughout
- [ ] Screen readers announce important content
- [ ] Colors have sufficient contrast (4.5:1)
- [ ] Images/icons have alt text
- [ ] No layout shifts on dynamic content (CLS < 0.1)
- [ ] Load time < 3s on 4G network

---

## Summary

KaspaConcert's design system creates a **fast, intuitive, trustworthy UI** that matches the speed and transparency of Kaspa blockchain transactions. Every component, color, and animation reinforces the core message: **instant, on-chain, borderless payments for creators.**

The system is **flexible enough to extend** (new pages, features, designs) while **strict enough to maintain consistency** across the entire product.

Build with it. Make it better. Prove that real-time blockchain UX is not just possible—it's amazing.
