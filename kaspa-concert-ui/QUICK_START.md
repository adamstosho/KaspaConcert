# KaspaConcert - Quick Start Guide

Welcome! This guide gets you up and running with KaspaConcert in minutes.

---

## 🎯 What You're Building

A **production-ready, mobile-first PWA** for real-time live-stream tipping on Kaspa blockchain.

**Key Features**:
- ⚡ Instant tip confirmations (milliseconds)
- 🔐 Non-custodial wallet integration
- 📱 Works on any device (no app installation)
- 💰 Zero platform fees
- 🎨 Polished, responsive design system

---

## ⚡ 5-Minute Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

### 3. Open Browser
Go to [http://localhost:3000](http://localhost:3000)

**That's it!** You now have KaspaConcert running locally.

---

## 🗺️ Tour the App

### Landing Page (`/`)
- Hero section with call-to-actions
- 6 feature highlights
- "How It Works" step-by-step guide
- Social proof elements

**Try it**: Click "Create Session" button

### Create Session (`/create`)
- Form with 3 fields: title, stream URL, Kaspa address
- Real-time validation with error messages
- Success screen with shareable link

**Try it**: 
1. Fill in the form
2. Submit
3. Copy the shareable link
4. Click "Go to Dashboard"

### Creator Dashboard (`/creator/session/{sessionId}`)
- Embedded live video
- Real-time tip feed
- Key metrics (total tips, # of tips, duration, avg tip)
- Live top tippers leaderboard
- Earnings sparkline chart
- "End Session" button

**Try it**: Observe the auto-updating tips (simulated)

### Viewer Session (`/session/{sessionId}`)
- Responsive layout (stack on mobile, side-by-side on desktop)
- Embedded stream player
- Wallet connection panel
- Tip amount selection (presets + custom)
- Live tip feed
- Session stats sidebar

**Try it**:
1. Click "Connect Wallet" (simulated)
2. Select a tip amount
3. Click "Send Tip"
4. Watch it appear in the feed as "Pending" → "Confirmed"

### Session Summary (`/session/{sessionId}/summary`)
- Large earnings display
- Top 5 tippers ranked
- Earnings breakdown chart
- Tips for next stream
- Share to social buttons

**Try it**: After ending a session, view the summary

---

## 🎨 Design System Overview

### Colors (Tailwind Classes)
```
🔵 text-kaspa-blue        Primary CTAs, highlights
🟣 text-neon-purple       Secondary actions, badges
🔷 text-neon-cyan         Tip amounts, live accents
🟢 text-success-green     Confirmations, success
🔴 text-error-red         Errors, failures
⬛ text-foreground         Primary text (white)
```

### Spacing
```
p-4  (16px padding)
p-6  (24px padding)
gap-4 (16px gap)
gap-6 (24px gap)
```

### Components to Reuse
```
<KaspaButton />      Primary button
<KaspaCard />        Card with optional neon accent
<Header />           Sticky navigation
<Footer />           Page footer
<TipFeed />          Real-time tip list
<WalletConnect />    Wallet panel
<TipPanel />         Tip selection
<Modal />            Dialog/confirmation
<Toast />            Notification
```

---

## 📁 Where to Find Things

### Pages
```
/app/page.tsx                      Landing page
/app/create/page.tsx               Create session form
/app/session/[sessionId]/page.tsx   Viewer session
/app/creator/session/[sessionId]/page.tsx  Creator dashboard
```

### Components
```
/components/kaspa-button.tsx        Blue button with variants
/components/kaspa-card.tsx          Card with neon accents
/components/wallet-connect.tsx      Wallet connection UI
/components/tip-panel.tsx           Tip amount selection
/components/tip-feed.tsx            Real-time tip list
/components/header.tsx              Top navigation
/components/footer.tsx              Bottom links
```

### Styles
```
/app/globals.css                    Global styles, fonts, design tokens
/tailwind.config.ts                 Tailwind with KaspaConcert colors
```

### Documentation
```
UI_DESIGN_SYSTEM.md                Complete design documentation
IMPLEMENTATION_GUIDE.md             Component patterns & best practices
README.md                           Project overview & roadmap
QUICK_START.md                      This file!
```

---

## 🔨 Common Tasks

### Add a New Button
```tsx
import { KaspaButton } from '@/components'

<KaspaButton variant="primary" size="md" onClick={handleClick}>
  Click Me
</KaspaButton>
```

### Create a Card
```tsx
import { KaspaCard } from '@/components'

<KaspaCard neonAccent="blue">
  <h3>Title</h3>
  <p>Content here</p>
</KaspaCard>
```

### Show a Toast Notification
```tsx
<Toast type="success" message="Tip confirmed!" />
```

### Open a Modal
```tsx
{showModal && (
  <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
    <p>Modal content</p>
  </Modal>
)}
```

### Make Responsive Layout
```tsx
{/* Mobile: stacked, Tablet: 2 col, Desktop: 3 col */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <Card />
  <Card />
  <Card />
</div>
```

---

## 🎮 Interactive Features

### Wallet Connection (Simulated)
Click "Connect Wallet" on any viewer session page. It will:
1. Show wallet method options
2. Connect (simulated)
3. Display your address + balance

### Tip Sending (Simulated)
1. Select a tip amount
2. Click "Send Tip"
3. See "Pending" state with animation
4. Auto-confirm after 2 seconds
5. Tip appears in feed as "Confirmed"

### Real-Time Updates (Simulated)
Creator dashboard tips auto-confirm every 3 seconds. This simulates:
- WebSocket connection
- Kaspa block confirmation listener
- Real-time UI updates

---

## 📱 Responsive Testing

### Test Breakpoints
```
Mobile:  DevTools → 375px width (iPhone SE)
Tablet:  DevTools → 768px width (iPad)
Desktop: DevTools → 1024px+ (Laptop)
```

### Mobile Testing Checklist
- [ ] No horizontal scrolling
- [ ] Buttons 44px+ (easy to tap)
- [ ] Text readable without zoom
- [ ] Forms work with mobile keyboard
- [ ] Modals fit screen height
- [ ] Tap feedback on buttons

---

## 🌈 Design System Rules

### DO ✅
- Use design tokens (kaspa-blue, neon-cyan, etc.)
- Keep animations 150-250ms
- Show loading states
- Validate inputs with clear errors
- Test on mobile first
- Use Tailwind classes (not inline styles)
- Create small, reusable components

### DON'T ❌
- Invent new colors (use palette)
- Create animations > 300ms
- Disable buttons without reason
- Use jargon without tooltips
- Add more than 2 font families
- Use <div> when <button> exists
- Make unresponsive layouts

---

## 🚀 Next Steps

### To Extend KaspaConcert

1. **Add Backend Integration**
   - Connect to Kaspa RPC node
   - Implement WebSocket server
   - Add real transaction signing

2. **Complete Wallet Integration**
   - Kaspa Web SDK integration
   - Browser extension support
   - Real balance querying

3. **Add Database**
   - Store session metadata
   - Track user profiles
   - Persist tip history

4. **Deploy to Production**
   - Push to GitHub
   - Connect to Vercel
   - Set environment variables
   - Go live!

### Reference Docs
- **Full Design Guide**: [UI_DESIGN_SYSTEM.md](./UI_DESIGN_SYSTEM.md)
- **Implementation Details**: [IMPLEMENTATION_GUIDE.md](./IMPLEMENTATION_GUIDE.md)
- **Project README**: [README.md](./README.md)

---

## 🎓 Learn More

### Kaspa
- [Kaspa Docs](https://kaspanet.com/docs)
- [BlockDAG Explainer](https://kaspanet.com/blog/blockdag)

### Frontend
- [Next.js Docs](https://nextjs.org/docs)
- [React 19](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)

### Design
- [WCAG Accessibility](https://www.w3.org/WAI/WCAG21/quickref/)
- [Mobile UX Best Practices](https://www.smashingmagazine.com/articles/designing-mobile-interfaces/)

---

## ❓ FAQ

**Q: How do I change the primary color?**
A: Update `/tailwind.config.ts` and `/app/globals.css`. Change `--primary: 79 100% 63%` to your color.

**Q: Can I add a new page?**
A: Yes! Create `/app/new-page/page.tsx` with `'use client'` and import Header/Footer.

**Q: How do I test wallet integration?**
A: Look for mock data in `[sessionId]/page.tsx` and `creator/session/[sessionId]/page.tsx`. Connect real Kaspa SDK there.

**Q: What about dark mode?**
A: It's configured in tailwind.config.ts with `darkMode: ['class']`. Add a toggle button in Header.

**Q: Is it mobile-responsive?**
A: Yes! Built mobile-first. Test at 320px, 768px, 1024px widths.

---

## 📞 Support

- **GitHub Issues**: Open an issue in the repo
- **Documentation**: See UI_DESIGN_SYSTEM.md
- **Discord**: Join Kaspa community server

---

**Happy building! 🚀**

Remember: Every component follows the design system. Every page is responsive. Every interaction is delightful.

Now go create something amazing with KaspaConcert!
