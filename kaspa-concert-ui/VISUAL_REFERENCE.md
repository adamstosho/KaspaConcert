# KaspaConcert - Visual Reference Guide

## 🎨 Design System at a Glance

### Color Palette

```
┌─────────────────────────────────────────────────────┐
│ KASPA BLUE      │ #4F7CFF                          │
│ Primary actions, CTAs, highlights                  │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│ KASPA DARK      │ #1A1A1A                          │
│ Primary dark background                            │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│ NEON PURPLE     │ #9B59FF                          │
│ Secondary actions, badges, notifications           │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│ NEON CYAN       │ #00FFF7                          │
│ Tip highlights, accents, live indicators           │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│ SUCCESS GREEN   │ #00C853                          │
│ Confirmations, success states                      │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│ ERROR RED       │ #FF3B30                          │
│ Errors, warnings, destructive actions              │
└─────────────────────────────────────────────────────┘
```

### Typography System

```
Headings:
H1: 40px  | Inter Bold | used on hero sections
H2: 32px  | Inter Bold | page titles
H3: 24px  | Inter Bold | section titles
H4: 20px  | Inter Bold | card titles
H5: 16px  | Inter Bold | subsections
H6: 14px  | Inter Bold | minor headings

Body Text:
16px | Roboto Regular | main content
14px | Roboto Regular | secondary text
12px | Roboto Regular | captions

Monospace:
14px | Fira Code | code, addresses, hashes
12px | Fira Code | small code snippets
```

### Spacing Scale

```
xs:    4px
s:     8px
m:     16px  (default padding/margin)
l:     24px  (larger spacing)
xl:    32px  (section spacing)
xxl:   48px  (large section spacing)
xxxl:  64px  (hero spacing)
```

### Border Radius

```
Buttons & Inputs:    12px (rounded-kaspa)
Cards:               16px (rounded-card-radius)
Default:             8px  (rounded-lg)
Modals:              16px (rounded-card-radius)
Badges:              12px (rounded-kaspa)
```

---

## 🧩 Component Anatomy

### Button States

```
PRIMARY BUTTON
┌──────────────────────────┐
│  Kaspa Blue Background   │  Normal
│  White Text              │  Hover: scale 1.03 + shadow
│  Rounded 12px            │  Active: scale 0.95
│  Font: Inter 600         │  Disabled: 50% opacity
└──────────────────────────┘

SECONDARY BUTTON
┌──────────────────────────┐
│  Neon Purple Border      │  Normal
│  Purple Text             │  Hover: 10% purple bg
│  Transparent bg          │  Active: scale 0.95
│  Font: Inter 700         │  Disabled: 50% opacity
└──────────────────────────┘
```

### Card Component

```
┌─────────────────────────────────────────┐
│ ▌ Neon Accent (4px left border)        │
│                                         │
│  Card Title                             │
│  Card content with consistent spacing   │
│  16px border-radius                     │
│  Subtle shadow: 0 4px 12px rgba()       │
│                                         │
└─────────────────────────────────────────┘
```

### Input Field

```
┌──────────────────────────────────────┐
│ Label *                              │
│                                      │
│ ┌────────────────────────────────┐  │
│ │ Placeholder text               │  │ Normal: border-gray
│ │ 12px padding, 12px radius      │  │ Focus: ring-kaspa-blue
│ │ Font: Roboto 400               │  │ Error: border-error-red
│ │                                │  │
│ └────────────────────────────────┘  │
│                                      │
│ Helper text or error message         │
└──────────────────────────────────────┘
```

---

## 📐 Layout Patterns

### Landing Page Layout

```
HEADER (Sticky)
┌──────────────────────────────────────────────────────┐
│ Logo        │ Nav        │ Mode Toggle │ CTA Button  │
└──────────────────────────────────────────────────────┘

HERO SECTION
┌──────────────────────────────────────────────────────┐
│                                                       │
│              Main Headline (Centered)                 │
│           Subheading with Value Prop                 │
│                                                       │
│              [Create] [Browse]                       │
│                                                       │
│          Trust Badges (Non-Custodial, etc)           │
└──────────────────────────────────────────────────────┘

FEATURES GRID (3 columns, responsive)
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│ Icon         │  │ Icon         │  │ Icon         │
│ Title        │  │ Title        │  │ Title        │
│ Description  │  │ Description  │  │ Description  │
└──────────────┘  └──────────────┘  └──────────────┘

HOW IT WORKS (4 steps)
[1: Create] → [2: Share] → [3: Tip] → [4: Confirm]

STATS SECTION
┌──────────────────────────────────────────────────────┐
│  100ms Block Time  │  Zero Fees  │  ∞ Scalability   │
└──────────────────────────────────────────────────────┘

CTA SECTION
┌──────────────────────────────────────────────────────┐
│            [Start Streaming Today]                   │
└──────────────────────────────────────────────────────┘

FOOTER
┌──────────────────────────────────────────────────────┐
│ Brand  │ Product   │ Community  │ Legal             │
│        │           │            │                   │
│ © 2024 │ Powered by Kaspa                           │
└──────────────────────────────────────────────────────┘
```

### Viewer Session Layout

```
DESKTOP (12-column grid)
┌─────────────────────────────────────┬──────────────┐
│                                     │              │
│  Video Player (8 cols)              │ Tip Panel    │
│  (aspect-video)                     │ (4 cols)     │
│                                     │              │
│  Creator Address Card               │ Session      │
│                                     │ Stats Card   │
│                                     │              │
│  Tip Feed (8 cols)                  │ Info Card    │
│  Scrollable list                    │              │
│                                     │              │
└─────────────────────────────────────┴──────────────┘

MOBILE (Full width, stacked)
┌──────────────────┐
│                  │
│  Video Player    │
│  (full width)    │
│                  │
├──────────────────┤
│  Tip Panel       │
├──────────────────┤
│  Creator Address │
├──────────────────┤
│  Session Stats   │
├──────────────────┤
│  Tip Feed        │
│  (scrollable)    │
│                  │
└──────────────────┘
```

### Creator Dashboard Layout

```
HEADER
┌──────────────────────────────────────────────────────┐
│ Session Title                      [End Session]    │
│ LIVE badge  │  Session ID                           │
└──────────────────────────────────────────────────────┘

METRICS GRID (4 columns, responsive)
┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐
│ Tips │  │ Count│  │ Time │  │ Avg  │
└──────┘  └──────┘  └──────┘  └──────┘

MAIN CONTENT (3-column layout on desktop)
┌─────────────────────────────────┬──────────────────┐
│                                 │                  │
│  Video Player (2 cols)          │ Creator Address  │
│  (full width)                   │ (1 col)          │
│                                 │                  │
│  Tip Feed (2 cols)              │ Share Session    │
│  Scrollable                     │                  │
│                                 │ Top Supporters   │
│                                 │                  │
│                                 │ Earnings Trend   │
│                                 │                  │
└─────────────────────────────────┴──────────────────┘
```

---

## 🎬 Animation & Interaction

### Button Interactions

```
NORMAL       HOVER          ACTIVE        DISABLED
┌─────────┐  ┌─────────┐   ┌─────────┐   ┌─────────┐
│ Text    │  │ Text    │   │ Text    │   │ Text    │
│ Bg Blue │  │ Bg Blue │   │ Bg Blue │   │ Bg Blue │
│ Scale 1 │  │ Scale 1 │   │ Scale   │   │ Opacity │
│         │  │ +shadow │   │ 0.95    │   │ 50%     │
└─────────┘  └─────────┘   └─────────┘   └─────────┘
  Instant     150ms ease    100ms ease    N/A
```

### Tip Feed Animation

```
NEW TIP ARRIVES:
1. Opacity: 0 → 1
2. Transform: translateY(-20px) → translateY(0)
3. Scale: 0.95 → 1.0
4. Duration: 300ms
5. Easing: cubic-bezier(0.34, 1.56, 0.64, 1) [bounce]

Result: Slide-in from top with slight bounce
```

### Modal Entrance

```
1. Backdrop: opacity 0 → 1 (200ms)
2. Modal: scale 0.95 → 1.0 (200ms)
3. Modal: opacity 0 → 1 (200ms)
4. Easing: ease-out
5. Closing: reverse above

Result: Smooth, professional appearance
```

### Pending Transaction Indicator

```
┌────────────────────┐
│ ⏳ Pending        │ ← Pulsing glow animation
│ Amount: 1.0 KAS   │
│ Tx Hash: 0x...    │ ← Briefly visible
└────────────────────┘

Animation: Pulse (opacity 0.7 → 1 → 0.7) repeating
Duration: 2s per cycle
```

---

## 📱 Responsive Breakpoints

```
MOBILE           TABLET           DESKTOP          LARGE
320px-767px      768px-1023px     1024px-1439px    1440px+

Single column    2 columns        3-4 columns      Full width
Stacked layout   Partial grids    Full grid        Max 1440px

Touch-friendly   Medium touch     Compact          Spacious
48px buttons     44px buttons     44px buttons     48px buttons

Full padding     Reduced padding  Standard padding Standard padding
```

---

## 🌈 Theme Toggle (Dark/Light Mode)

### Dark Mode (Default)

```
Background:     #1A1A1A (Kaspa Dark)
Text:           #FFFFFF (White)
Secondary:      #E5E5E5 (Neutral Gray)
Cards:          #262626 (Slightly lighter)
Accents:        Kaspa Blue, Neon Cyan, Neon Purple
```

### Light Mode (If Implemented)

```
Background:     #FFFFFF (White)
Text:           #1A1A1A (Dark)
Secondary:      #666666 (Gray)
Cards:          #F5F5F5 (Light Gray)
Accents:        Kaspa Blue (darker), Neon Purple, Neon Cyan
```

---

## ✨ Micro-interactions Checklist

- ✅ Button scale on hover (1.0 → 1.03)
- ✅ Tip feed slide-in with bounce
- ✅ Input focus ring animation
- ✅ Loading spinner continuous rotation
- ✅ Toast notification slide from top-right
- ✅ Modal backdrop blur fade
- ✅ Pending transaction pulsing glow
- ✅ Badge color transitions
- ✅ Link hover underline/color change
- ✅ Ripple effect on active states

---

## 🎯 Component Usage Examples

### Using KaspaButton

```tsx
import { KaspaButton } from '@/components'

// Primary button
<KaspaButton variant="primary" size="lg">
  Create Session
</KaspaButton>

// Secondary button with loading
<KaspaButton 
  variant="secondary" 
  isLoading={isLoading}
  disabled={isLoading}
>
  Send Tip
</KaspaButton>
```

### Using KaspaCard

```tsx
import { KaspaCard } from '@/components'

// Card with cyan accent
<KaspaCard neonAccent="cyan">
  <h3>Session Stats</h3>
  <p>Content here</p>
</KaspaCard>
```

### Using TipPanel

```tsx
import { TipPanel } from '@/components'

<TipPanel
  creatorName="Musician"
  onSendTip={(amount) => handleTip(amount)}
  isLoading={sending}
  walletConnected={true}
/>
```

---

## 📊 Data Visualization

### Sparkline Chart (Tip Trend)

```
9│     ╱╲
8│    ╱  ╲    ╱╲
7│   ╱    ╲  ╱  ╲
6│  ╱      ╲╱    ╲
5│ ╱             ╱╲
4│╱_____________╱  ╲
 └─────────────────────
```

Used in:
- Creator dashboard earnings trend
- Session summary
- Landing page stats

### Top Tippers List

```
┌─────────────────────────────────┐
│ #1  Alice        10.0 KAS       │ ← Gradient avatar
│ #2  Bob           8.5 KAS       │
│ #3  Charlie       7.2 KAS       │
│ #4  Diana         6.0 KAS       │
│ #5  Eve           5.15 KAS      │
└─────────────────────────────────┘
```

---

## 🔄 Transaction Flow Visualization

```
USER ACTION
    ↓
[Choose Amount / Connect Wallet]
    ↓
DRAFT STATE
┌──────────────────┐
│ Amount: 1.0 KAS  │
│ [Send Tip] ←---- Button enabled
└──────────────────┘
    ↓ (User clicks Send)
PENDING STATE
┌──────────────────┐
│ ⏳ Pending       │ ← Pulsing
│ Amount: 1.0 KAS  │
│ Tx: 0x...        │
└──────────────────┘
    ↓ (WebSocket: tx confirmed)
CONFIRMED STATE
┌──────────────────┐
│ ✓ Confirmed      │ ← Green badge
│ Amount: 1.0 KAS  │
│ Tx: 0x...        │
└──────────────────┘
    ↓ (Move to tip feed)
TIP FEED
┌──────────────────┐
│ 1.0 KAS from You │ ← Animated in
│ Confirmed ✓      │
└──────────────────┘
```

---

## 🎨 Visual Hierarchy

### Information Priority

```
TIER 1 (Highest Priority)
├─ Large headings (H1, H2)
├─ Primary CTA buttons (Kaspa Blue)
├─ Key metrics (earnings, tip count)
└─ Status indicators (LIVE, Confirmed)

TIER 2 (Medium Priority)
├─ Subheadings (H3, H4)
├─ Secondary information
├─ Secondary buttons (Neon Purple)
└─ Card content

TIER 3 (Low Priority)
├─ Helper text
├─ Secondary text (muted)
├─ Form labels
└─ Timestamps, codes

TIER 4 (Lowest Priority)
├─ Disabled states
├─ Placeholder text
├─ Decorative elements
└─ Footer information
```

---

## 💡 Design Principles Applied

1. **Clarity** - Clear CTAs, obvious interaction points
2. **Feedback** - Immediate response to user actions
3. **Consistency** - Uniform colors, spacing, typography
4. **Accessibility** - High contrast, keyboard navigation, focus states
5. **Performance** - Smooth animations, fast interactions
6. **Trust** - Web3 security cues, transparency
7. **Delight** - Smooth transitions, satisfying interactions

---

_This reference guide is a living document. Update it as the design system evolves._

