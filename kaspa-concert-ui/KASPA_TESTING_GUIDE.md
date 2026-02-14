# 🧪 Kaspa Integration - Testing Guide

**Last Updated:** February 9, 2026  
**Status:** Ready to Test  
**Estimated Time:** 30-60 minutes

---

## 📋 Overview

This guide will walk you through testing the complete Kaspa integration, from wallet connection to real blockchain transactions.

---

## 🎯 What We're Testing

1. ✅ KasWare wallet detection
2. ✅ Wallet connection
3. ✅ Balance display
4. ✅ Transaction signing
5. ✅ Blockchain broadcasting
6. ✅ Confirmation monitoring
7. ✅ Real-time updates

---

## 📦 Prerequisites

### 1. Install KasWare Wallet

**Chrome/Brave/Edge:**
1. Visit Chrome Web Store
2. Search "KasWare Wallet"
3. Click "Add to Chrome"
4. Create new wallet or import existing
5. **IMPORTANT:** Switch to **Testnet** for testing

**Switch to Testnet:**
1. Open KasWare extension
2. Click network dropdown (top right)
3. Select "Testnet 10"
4. Confirm switch

### 2. Get Testnet KAS

**Kaspa Testnet Faucet:**
1. Visit: https://faucet-tn10.kas.pa
2. Enter your testnet address (from KasWare)
3. Complete captcha
4. Click "Request Testnet KAS"
5. Wait ~10 seconds for confirmation
6. Check KasWare - you should have ~10 testnet KAS

**Alternative Faucet:**
- https://testnet-faucet.kaspanet.io

### 3. Verify Setup

Open browser console (F12) and type:
```javascript
window.kasware
```

You should see an object. If undefined, refresh page or reinstall extension.

---

## 🧪 Test Plan

### Phase 1: Wallet Detection (5 minutes)

#### Test 1.1: Extension Detection
1. Open http://localhost:3000
2. Open browser console (F12)
3. Type: `window.kasware`
4. **Expected:** Object with methods
5. **If undefined:** Install KasWare and refresh

#### Test 1.2: UI Detection
1. Go to "Create Session" page
2. Look for "Connect KasWare Wallet" button
3. **Expected:** Button visible if not connected
4. **If missing:** Check component implementation

---

### Phase 2: Wallet Connection (10 minutes)

#### Test 2.1: Connect via Extension
1. Click "Connect KasWare Wallet" button
2. **Expected:** KasWare popup opens
3. Click "Connect" in popup
4. **Expected:** 
   - Popup closes
   - Address displays in UI
   - Balance shows (if you have testnet KAS)
   - "Connected" status visible

#### Test 2.2: Connection Persistence
1. Refresh page
2. **Expected:** Still connected (no popup)
3. Address and balance still visible

#### Test 2.3: Disconnect
1. Click "Disconnect" button
2. **Expected:**
   - Address cleared
   - Balance cleared
   - "Connect Wallet" button returns

---

### Phase 3: Session Creation (10 minutes)

#### Test 3.1: Create Session with Connected Wallet
1. Connect wallet (if not connected)
2. Go to "Create Session"
3. Fill form:
   - Title: "Test Live Stream"
   - URL: "https://youtube.com/watch?v=dQw4w9WgXcQ"
   - **Address:** Should auto-fill from wallet
4. Click "Create Session"
5. **Expected:**
   - API call to backend
   - Session created
   - Shareable link generated
   - Address matches wallet address

#### Test 3.2: Verify Session
1. Copy shareable link
2. Open in new tab
3. **Expected:**
   - Session loads
   - Stream URL embedded
   - Creator address matches your wallet

---

### Phase 4: Send Tip (15 minutes)

#### Test 4.1: Connect as Viewer
1. Open session link (from Test 3.2)
2. Click "Connect Wallet"
3. Approve in KasWare popup
4. **Expected:**
   - Wallet connected
   - Balance visible
   - Tip panel enabled

#### Test 4.2: Select Tip Amount
1. Click preset amount (e.g., "0.1 KAS")
2. **Expected:**
   - Amount selected
   - "Send Tip" button enabled
3. Or enter custom amount: "0.05"
4. **Expected:**
   - Custom amount accepted
   - Button enabled

#### Test 4.3: Send Tip (Real Transaction!)
1. Click "Send Tip"
2. **Expected:** KasWare popup opens
3. Review transaction:
   - To: Creator address
   - Amount: Your selected amount
   - Fee: ~0.0001 KAS
4. Click "Confirm" in KasWare
5. **Expected:**
   - Popup closes
   - Tip appears in feed as "Pending"
   - Pending badge with animation
   - WebSocket event sent to backend

#### Test 4.4: Wait for Confirmation
1. Wait 2-5 seconds
2. **Expected:**
   - Badge changes to "Confirmed" (green)
   - Animation completes
   - Creator's total tips updates
   - Your balance decreases

---

### Phase 5: Verify on Blockchain (10 minutes)

#### Test 5.1: Get Transaction Hash
1. After sending tip, check browser console
2. Look for transaction hash (64-character hex)
3. Copy the hash

#### Test 5.2: Check Kaspa Explorer
1. Visit: https://explorer-tn10.kaspa.org
2. Paste transaction hash in search
3. Click search
4. **Expected:**
   - Transaction found
   - Status: Accepted
   - From: Your address
   - To: Creator address
   - Amount: Your tip amount
   - Confirmations: 1+

#### Test 5.3: Verify Creator Balance
1. Switch to creator wallet (or check in KasWare)
2. **Expected:**
   - Balance increased by tip amount
   - Transaction visible in history

---

### Phase 6: Error Handling (10 minutes)

#### Test 6.1: Insufficient Balance
1. Try to send tip larger than your balance
2. **Expected:**
   - KasWare shows error
   - UI shows friendly error message
   - No transaction sent

#### Test 6.2: User Rejection
1. Click "Send Tip"
2. Click "Reject" in KasWare popup
3. **Expected:**
   - Popup closes
   - UI shows "Transaction rejected" message
   - No tip appears in feed

#### Test 6.3: Network Error
1. Disconnect internet
2. Try to send tip
3. **Expected:**
   - Error message
   - Retry option available

#### Test 6.4: Invalid Address
1. Create session with invalid address
2. **Expected:**
   - Validation error
   - Cannot create session
   - Clear error message

---

### Phase 7: Real-Time Updates (10 minutes)

#### Test 7.1: Multiple Viewers
1. Open session in 2 browser windows
2. Connect different wallets (or same wallet)
3. Send tip from Window 1
4. **Expected:**
   - Tip appears in Window 2 immediately
   - Both windows show same total
   - Real-time sync via WebSocket

#### Test 7.2: Creator Dashboard
1. Open creator dashboard
2. Send tip from viewer window
3. **Expected:**
   - Dashboard updates in real-time
   - Total tips increases
   - New tip appears in feed
   - Top supporters updates

---

## 📊 Test Results Template

### Test Summary

| Test | Status | Notes |
|------|--------|-------|
| Extension Detection | ⬜ | |
| Wallet Connection | ⬜ | |
| Balance Display | ⬜ | |
| Session Creation | ⬜ | |
| Tip Sending | ⬜ | |
| Blockchain Confirmation | ⬜ | |
| Explorer Verification | ⬜ | |
| Error Handling | ⬜ | |
| Real-Time Updates | ⬜ | |

**Legend:** ✅ Pass | ❌ Fail | ⚠️ Partial | ⬜ Not Tested

---

## 🐛 Common Issues & Solutions

### Issue: "window.kasware is undefined"

**Cause:** KasWare not installed or not loaded

**Solution:**
1. Install KasWare extension
2. Refresh page
3. Check extension is enabled
4. Try different browser

---

### Issue: "No accounts found"

**Cause:** No wallet created in KasWare

**Solution:**
1. Open KasWare extension
2. Create new wallet or import existing
3. Complete setup
4. Try connecting again

---

### Issue: "Insufficient balance"

**Cause:** Not enough testnet KAS

**Solution:**
1. Visit testnet faucet
2. Request more testnet KAS
3. Wait for confirmation
4. Try again

---

### Issue: "Transaction not found on explorer"

**Cause:** Explorer indexing delay or wrong network

**Solution:**
1. Wait 10-30 seconds
2. Verify you're on testnet explorer
3. Check transaction hash is correct
4. Try refreshing explorer page

---

### Issue: "Tip not confirming"

**Cause:** Backend not monitoring transactions

**Solution:**
1. Check backend is running
2. Verify `KASPA_RPC_URL` is set
3. Check backend logs
4. Restart backend if needed

---

## 🎯 Success Criteria

### ✅ All Tests Pass When:

1. **Wallet Detection**
   - Extension detected
   - UI shows connect button
   - No console errors

2. **Connection**
   - Wallet connects successfully
   - Address displays correctly
   - Balance shows (if available)
   - Persists on refresh

3. **Transactions**
   - Tips send successfully
   - KasWare popup works
   - Transactions broadcast to blockchain
   - Confirmations detected

4. **Real-Time**
   - WebSocket connects
   - Events broadcast
   - UI updates instantly
   - Multiple viewers sync

5. **Blockchain**
   - Transactions visible on explorer
   - Confirmations increase
   - Balances update correctly

---

## 📈 Performance Benchmarks

### Expected Timings:

- **Wallet Connection:** <2 seconds
- **Transaction Signing:** <5 seconds (user dependent)
- **Blockchain Broadcast:** <1 second
- **First Confirmation:** 1-2 seconds (Kaspa is FAST!)
- **UI Update:** <100ms (WebSocket)
- **Explorer Indexing:** 10-30 seconds

---

## 🚀 Next Steps After Testing

### If All Tests Pass:

1. ✅ **Switch to Mainnet**
   - Change network in KasWare
   - Update backend RPC URL
   - Test with small amounts first

2. ✅ **Deploy to Production**
   - Frontend to Vercel
   - Backend to Flux/Railway
   - Update environment variables

3. ✅ **Monitor First Transactions**
   - Watch logs
   - Verify confirmations
   - Check explorer

4. ✅ **Launch!**
   - Announce to community
   - Submit to Kaspathon
   - Celebrate! 🎉

### If Tests Fail:

1. ⚠️ **Review Error Messages**
   - Check browser console
   - Check backend logs
   - Check network tab

2. ⚠️ **Verify Configuration**
   - KasWare installed?
   - Testnet selected?
   - Backend running?
   - RPC URL set?

3. ⚠️ **Check Documentation**
   - KASPA_INTEGRATION_GUIDE.md
   - ERROR_RESOLUTION_GUIDE.md
   - Backend README

4. ⚠️ **Ask for Help**
   - Kaspathon Discord
   - Kaspa Discord
   - GitHub issues

---

## 📞 Support Resources

### Documentation:
- Integration Guide: `KASPA_INTEGRATION_GUIDE.md`
- Error Resolution: `ERROR_RESOLUTION_GUIDE.md`
- API Reference: Backend `/README.md`

### Community:
- Kaspathon Discord: https://discord.com/invite/JRPmdEnGPz
- Kaspa Discord: https://discord.com/invite/kaspahq
- Kaspa Reddit: https://reddit.com/r/kaspa

### Tools:
- Testnet Explorer: https://explorer-tn10.kaspa.org
- Testnet Faucet: https://faucet-tn10.kas.pa
- KasWare Wallet: https://kasware.xyz

---

**Happy Testing!** 🧪

**Remember:** Always test on testnet first! Never test with real mainnet KAS until you're confident everything works.

---

_This testing guide will help you verify 100% Kaspa integration!_
