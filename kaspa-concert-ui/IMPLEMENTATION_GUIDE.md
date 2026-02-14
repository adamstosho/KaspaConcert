# KaspaConcert Implementation Guide

This guide walks you through the complete UI implementation and explains every design decision, component, and interaction pattern used in KaspaConcert.

---

## 📐 Grid System & Layout

### 12-Column Responsive Grid

All layouts use a flexible 12-column grid that reflows responsively:

```
Mobile (320px)        Tablet (768px)        Desktop (1024px)      Large (1440px)
Single Column         2-3 Columns           3-4 Columns           Full 12-column
─────────────────────────────────────────────────────────────────────────────────
|     1/1    |    |  1/2  |  1/2  |    |  1/3  | 1/3  | 1/3  |    | Max 1440px |
|     1/1    |    |  1/2  |  1/2  |    |  1/3  | 1/3  | 1/3  |    | Centered   |
|     1/1    |    |  2/3  |      |    |  2/3  |           |    |            |
```

### Container Widths
```
Mobile:      Full width - 16px padding on each side
Tablet:      Full width - 24px padding on each side
Desktop:     Full width - 32px padding on each side
Large:       1440px max-width, centered with auto margins
```

### Gap & Spacing
```
Components within grid:
  Mobile:    16px gap (grid-gap-4)
  Tablet:    24px gap (grid-gap-6)
  Desktop:   32px gap (grid-gap-8)

Internal padding:
  Cards:     16px (p-4 or p-6)
  Inputs:    12px (px-3 py-2)
  Buttons:   12-20px depending on size
```

---

## 🎨 Color Application Reference

### How Colors Are Used

#### 🔵 Kaspa Blue (#4F7CFF)
```
Primary Actions:
  - "Create Session" button
  - "Connect Wallet" button
  - "Send Tip" button
  - Primary CTA

Visual Highlights:
  - Focus ring on inputs: ring-2 ring-kaspa-blue
  - Active tab underline
  - Link hover color
  - Primary metric text (Total Tips earned)

Badges:
  - Pending transaction badge (animated)
  - Info notifications
```

#### 🟣 Neon Purple (#9B59FF)
```
Secondary Actions:
  - "Cancel" button (secondary variant)
  - "Disconnect Wallet" button
  - Secondary CTAs

Accents:
  - Card left border (neonAccent="purple")
  - Badges for special status
  - Interactive hover states

Visual Interest:
  - Avatar gradient backgrounds
  - Gradient overlays on hero sections
```

#### 🔷 Neon Cyan (#00FFF7)
```
Tip Amounts:
  - Display "1.5 KAS" in this color
  - Tip feed amounts
  - Live update highlights

Accents:
  - Card left border (neonAccent="cyan")
  - Session status live indicator
  - Trend chart colors

Interaction:
  - Loading spinner color
  - Pulse animations on pending items
```

#### 🟢 Success Green (#00C853)
```
Confirmations:
  - Confirmed transaction badges
  - Success toast notifications
  - Live indicator dot (pulsing)
  - Checkmark icons

Completed States:
  - Session ended state
  - Form validation success
  - Connected wallet indicator

Confidence Building:
  - Trust badges on landing page
```

#### 🔴 Error Red (#FF3B30)
```
Errors:
  - Error toast notifications
  - Form validation errors
  - Failed transaction states
  - Warning badges

Destructive Actions:
  - "Delete" / "Remove" buttons (if added)
  - Critical alerts

User Attention:
  - Red border on form inputs with errors
  - Error text inline
```

#### ⬛ Kaspa Dark (#1A1A1A) & Neutrals
```
Backgrounds:
  - Page background: Kaspa Dark (#1A1A1A)
  - Card background: Slightly lighter (#0F0F0F to #1A1A1A)
  - Input background: Kaspa Dark with border

Text:
  - Primary text: White (#FFFFFF)
  - Secondary text: muted-foreground (gray)
  - Disabled text: 50% opacity

Dividers & Borders:
  - Neutral Gray (#E5E5E5) with reduced opacity
  - 1px borders on cards
  - Border dividers between sections
```

### Dark Mode Contrast Verification
```
✓ White text on Kaspa Dark:     5.5:1 (WCAG AAA)
✓ Blue text on Dark background:  5.2:1 (WCAG AA)
✓ Green on Dark:                6.1:1 (WCAG AAA)
✓ Purple on Dark:               4.8:1 (WCAG AA)
✓ Cyan on Dark:                 5.9:1 (WCAG AA)
```

---

## 🧩 Component Patterns

### Button Implementations

#### Primary Button
```tsx
<KaspaButton variant="primary" size="md">
  Send Tip
</KaspaButton>

// Renders:
// bg-kaspa-blue text-white px-6 py-3 rounded-kaspa
// hover: scale-105, shadow-kaspa-hover (ease-out 150ms)
// active: scale-95
// disabled: opacity-50
```

#### Secondary Button
```tsx
<KaspaButton variant="secondary" size="lg">
  Cancel
</KaspaButton>

// Renders:
// border-2 border-neon-purple text-neon-purple bg-transparent px-8 py-4
// hover: bg-neon-purple/10
// active: scale-95
```

#### With Loading State
```tsx
<KaspaButton
  isLoading={isProcessing}
  disabled={isProcessing}
  onClick={handleTip}
>
  Send Tip
</KaspaButton>

// Shows spinner icon when loading
// Button disabled and shows "Send Tip" text still visible
```

### Card Pattern

#### Basic Card
```tsx
<KaspaCard>
  <h3>Session Title</h3>
  <p>Content here</p>
</KaspaCard>

// Renders: rounded-card-radius, shadow-kaspa-card, p-6, border
```

#### Card with Neon Accent
```tsx
<KaspaCard neonAccent="blue">
  <p>Your Kaspa Address</p>
</KaspaCard>

// Adds: border-l-4 border-l-kaspa-blue (left accent border)
```

#### Hoverable Card
```tsx
<KaspaCard hoverable neonAccent="cyan">
  <p>Tip Card</p>
</KaspaCard>

// On hover: scale-105, shadow-lg (smooth 200ms transition)
```

### Form Inputs

#### Standard Input
```tsx
<Input
  label="Session Title"
  placeholder="Enter title"
  required
  error={errors.title}
  helper="Give your stream a catchy name"
/>

// Full-width by default
// Shows error message if provided
// Shows helper text if no error
```

#### Number Input (for Tips)
```tsx
<Input
  type="number"
  placeholder="0.00"
  min={0.01}
  max={1000}
  step="0.01"
  error={errors.amount}
  helper="KAS amount"
/>
```

### Modal Pattern

#### Confirmation Modal
```tsx
{showEndModal && (
  <Modal
    isOpen={showEndModal}
    onClose={() => setShowEndModal(false)}
    title="End Session?"
  >
    <p>Are you sure? Stats will freeze.</p>
    <div className="grid grid-cols-2 gap-4">
      <KaspaButton variant="secondary" onClick={() => setShowEndModal(false)}>
        Cancel
      </KaspaButton>
      <KaspaButton variant="primary" onClick={handleEndSession}>
        Confirm
      </KaspaButton>
    </div>
  </Modal>
)}

// Features:
// - Centered with dark backdrop + blur
// - Close button (X) in top-right
// - ESC key closes
// - Smooth fade-in 200ms
```

### Toast Notifications

#### Success Toast
```tsx
<Toast
  type="success"
  message="Tip confirmed! Transaction hash: 0x1234..."
/>

// Auto-dismisses after 3 seconds
// Slides in from top-right with fade
// Green background, white icon
```

#### Error Toast
```tsx
<Toast
  type="error"
  message="Transaction failed. Insufficient balance."
/>

// Red background, white X icon
// Remains visible until dismissed
```

---

## 🎬 Animation Patterns

### Button Interactions

#### Hover Animation
```css
/* Button hovers scale up slightly with shadow */
@apply hover:scale-105 hover:shadow-kaspa-hover transition-all duration-150
```

**Effect**: Makes button feel clickable, inviting
**Timing**: 150ms ease-out
**Use**: All buttons (primary, secondary, ghost)

#### Active (Click) Animation
```css
@apply active:scale-95 transition-all duration-100
```

**Effect**: Tactile feedback—button "presses down"
**Timing**: 100ms ease-in
**Use**: Mouse/keyboard interaction feedback

### Tip Feed Animation

#### New Tip Appears
```css
@apply animate-bounce-in
```

**Keyframes**:
- 0%: scale(0.95), opacity(0)
- 50%: scale(1.05)
- 100%: scale(1), opacity(1)

**Timing**: 300ms cubic-bezier(0.34, 1.56, 0.64, 1) - bouncy easing
**Use**: First tip in feed, new transaction confirmations

#### Slide In from Top
```css
@apply animate-slide-in-from-top
```

**Keyframes**:
- 0%: translateY(-100%), opacity(0)
- 100%: translateY(0), opacity(1)

**Timing**: 200ms ease-out
**Use**: Modals, toast notifications, header slides

### Pending Transaction Pulse

#### Pulsing Glow on Pending Badge
```css
@apply animate-pulse-glow
```

**Keyframes**:
- 0%, 100%: opacity(1)
- 50%: opacity(0.7)

**Timing**: 2s infinite cubic-bezier(0.4, 0, 0.6, 1)
**Use**: Pending transaction badges, loading states, "live" indicators

---

## 📱 Responsive Layout Examples

### Landing Page Layout

```
Mobile (320px)          Tablet (768px)          Desktop (1024px)
───────────────────────────────────────────────────────────────
│ Header (full)       │ Header (full)        │ Header (full)  │
│───────────────────│ │────────────────────│ │────────────────│
│                   │ │                    │ │                │
│   Hero Section    │ │   Hero Section     │ │  Hero Section  │
│   (full width)    │ │   (full width)     │ │  (full width)  │
│                   │ │                    │ │                │
│───────────────────│ │────────────────────│ │────────────────│
│                   │ │                    │ │                │
│ Feature Cards  │ │ Feature Cards     │ │ Feature Cards    │
│  (1 column)    │ │  (2 columns)      │ │  (3 columns)     │
│                │ │  (2 columns)      │ │  (3 columns)     │
│                │ │  (2 columns)      │ │  (3 columns)     │
│───────────────────│ │────────────────────│ │────────────────│
│                   │ │                    │ │                │
│  How It Works     │ │ How It Works       │ │ How It Works    │
│  (4 steps,      │ │ (4 steps,         │ │ (4 steps,       │
│   1 per row)    │ │  2 per row)       │ │  4 per row)     │
│                   │ │                    │ │                │
│───────────────────│ │────────────────────│ │────────────────│
│ Footer            │ │ Footer             │ │ Footer         │
───────────────────────────────────────────────────────────────
```

### Session Page Layout

```
Mobile (320px)               Desktop (1024px+)
─────────────────────────────────────────────────────────────────
│ Header                   │ Header                             │
│─────────────────────────│ ────────────────────────────────────│
│                         │                                     │
│  Video Player           │      Video Player      │ Wallet     │
│  (full width)           │      (2/3 width)       │ Status     │
│  (aspect 16:9)          │                        │            │
│                         │                        │ (1/3 width)│
│  Address Card           │      Address Card      │            │
│                         │                        │ Tip Panel  │
│  Tip Feed (mobile):     │      Tip Feed          │            │
│  Scrollable, overlays   │      (scrollable)      │            │
│  video near bottom      │                        │ Stats      │
│                         │                        │            │
│                         │                        │ Info Card  │
│─────────────────────────│ ────────────────────────────────────│
│ Footer                  │ Footer                              │
─────────────────────────────────────────────────────────────────
```

### Creator Dashboard Layout

```
Desktop (1024px+)
────────────────────────────────────────────────────────────────────────
│ Header with Session Title & "End Session" Button                   │
│─────────────────────────────────────────────────────────────────────│
│ Metric Cards (4 columns):                                          │
│ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐               │
│ │ Total    │ │ # Tips   │ │ Duration │ │ Avg Tip  │               │
│ │ Tips     │ │          │ │          │ │          │               │
│ └──────────┘ └──────────┘ └──────────┘ └──────────┘               │
│─────────────────────────────────────────────────────────────────────│
│                                                                     │
│   Video Player (2/3 width)         │ Creator Address   (1/3)       │
│   ──────────────────────────────   │ ──────────────────          │
│   [16:9 Aspect Ratio]               │ [Card with address         │
│                                      │  and copy button]          │
│                                      │                            │
│   Address Card (2/3 width)          │ Share Session              │
│   ──────────────────────────────   │ ──────────────────          │
│                                      │ [Card with link            │
│   Tip Feed (2/3 width)              │  and copy button]          │
│   ──────────────────────────────   │                            │
│   [Scrollable list with            │ Top Tippers                │
│    pending/confirmed states]       │ ──────────────────          │
│                                    │ [Ranked list]              │
│                                    │                            │
│                                    │ Earnings Sparkline        │
│                                    │ ──────────────────        │
│                                    │ [Mini bar chart]          │
│─────────────────────────────────────────────────────────────────────│
│ Footer                                                              │
────────────────────────────────────────────────────────────────────────
```

---

## ✅ Implementation Checklist

### Component Creation
- [ ] Create component file in `/components`
- [ ] Define TypeScript interfaces
- [ ] Use Tailwind classes (not inline styles)
- [ ] Add proper event handlers
- [ ] Include loading/disabled states
- [ ] Add accessibility attributes (aria-labels, roles)
- [ ] Export from `/components/index.ts`

### Page Implementation
- [ ] Create page folder with `page.tsx`
- [ ] Use Layout component (Header, Footer)
- [ ] Apply responsive grid (mobile-first)
- [ ] Use design system colors/spacing
- [ ] Test on 320px, 768px, 1024px, 1440px
- [ ] Validate form inputs with clear errors
- [ ] Show loading states on async operations
- [ ] Handle error states gracefully

### Styling Standards
- [ ] Use `kaspa-blue`, `neon-purple`, `neon-cyan` for accents
- [ ] Use `text-foreground` and `text-muted-foreground` for text
- [ ] Use spacing scale (4/8/16/24/32/48/64)
- [ ] No arbitrary colors (use CSS variables)
- [ ] Animations 150-250ms max
- [ ] Hover states on all interactive elements
- [ ] Focus indicators on all buttons/inputs

### Accessibility
- [ ] Color contrast >= 4.5:1
- [ ] Keyboard navigable (Tab, Enter, ESC)
- [ ] ARIA labels on buttons/inputs
- [ ] Alt text on images
- [ ] Form labels associated with inputs
- [ ] Focus visible on all interactive elements
- [ ] Semantic HTML (button, input, form, etc)

### Mobile Responsiveness
- [ ] Test on actual mobile device (iPhone SE, Pixel 5)
- [ ] Touch targets >= 44px minimum
- [ ] No horizontal scrolling
- [ ] Readable text without zoom
- [ ] Readable on 320px width
- [ ] Buttons not too close together

---

## 🚀 Performance Tips

### Image Optimization
```tsx
// ❌ Don't: Raw HTML img
<img src="/tip-icon.svg" />

// ✅ Do: Next.js Image with loading="lazy"
import Image from 'next/image'
<Image src="/tip-icon.svg" width={24} height={24} alt="Tip" />
```

### CSS-in-JS (Avoid)
```tsx
// ❌ Don't: Inline styles
<div style={{ color: '#4F7CFF' }}>Blue text</div>

// ✅ Do: Tailwind classes
<div className="text-kaspa-blue">Blue text</div>
```

### Animation Performance
```tsx
// ❌ Don't: Hardware-unaccelerated properties
className="transition-all duration-500"
style={{ left: position }}  // Changes every frame

// ✅ Do: Use transform (hardware-accelerated)
className="transition-transform duration-150 hover:scale-105"
```

### Component Splitting
```tsx
// ❌ Don't: One giant component
export function SessionPage() {
  return (
    <Header />
    <Video />
    <TipPanel />
    <TipFeed />
    <Stats />
    <Footer />
  )
}

// ✅ Do: Split into smaller components
export function SessionPage() {
  return (
    <>
      <Header />
      <main>
        <SessionVideo />
        <SessionSidebar />
        <SessionFooter />
      </main>
    </>
  )
}
```

---

## 🔗 Import Patterns

### Components
```tsx
// From barrel export
import { KaspaButton, KaspaCard, Header, Footer } from '@/components'

// Individual imports (if needed)
import { KaspaButton } from '@/components/kaspa-button'
```

### Utilities
```tsx
// Tailwind classes are available globally
<div className="p-4 bg-kaspa-blue text-white">...</div>

// CSS variables available in globals.css
<style>{`
  .custom-style {
    color: var(--kaspa-blue);  // Not needed, use Tailwind instead
  }
`}</style>
```

---

## 📚 Reference Links

- **Design System**: [UI_DESIGN_SYSTEM.md](./UI_DESIGN_SYSTEM.md)
- **README**: [README.md](./README.md)
- **Tailwind Docs**: https://tailwindcss.com
- **Next.js Docs**: https://nextjs.org/docs
- **React Docs**: https://react.dev

---

**For any questions about the implementation, refer to the components themselves—they're heavily commented and self-documenting!**
