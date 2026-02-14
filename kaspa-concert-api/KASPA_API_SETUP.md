# Kaspa API setup (real transaction confirmation)

The backend uses **HTTP REST** to confirm tips on-chain (no gRPC). It supports two providers.

---

## Recommended: api.kaspa.org (no API key)

**https://api.kaspa.org** is a public Kaspa REST server. It does **not** require signup or an API key.

| Use | Value |
|-----|--------|
| **Base URL (KASPA_RPC_URL)** | `https://api.kaspa.org` |
| **Transaction endpoint** | `GET https://api.kaspa.org/transactions/{transactionId}` |
| **API key** | Not needed |

### .env (recommended)

```env
KASPA_RPC_URL=https://api.kaspa.org
```

Leave `KASPA_API_KEY` unset. The backend will poll `GET https://api.kaspa.org/transactions/{txId}`; a **200** response means the transaction is found (accepted). **404** = not yet indexed, so the backend keeps polling.

### Docs

- **API docs:** https://api.kaspa.org/docs  
- **OpenAPI:** https://api.kaspa.org/openapi.json  
- **Source:** https://github.com/kaspa-ng/kaspa-rest-server  

---

## Alternative: Kaspa Developer Platform (api.kas.fyi)

**https://api.kas.fyi** requires an API key. The **signup site (developer.kas.fyi) is currently down** (“The train has not arrived at the station” / Railway error). When it is back:

| Use | Value |
|-----|--------|
| **Base URL (KASPA_RPC_URL)** | `https://api.kas.fyi` |
| **Transaction endpoint** | `GET https://api.kas.fyi/v1/transactions/{transactionId}` |
| **Auth** | Header `x-api-key: YOUR_API_KEY` |

### Where to get the API key (when the site works)

1. **Sign up:** https://developer.kas.fyi  
2. **Get API key:** https://developer.kas.fyi/account → **API Key** → **Generate New Key**  
3. **Docs:** https://docs.kas.fyi  

### .env (when using api.kas.fyi)

```env
KASPA_RPC_URL=https://api.kas.fyi
KASPA_API_KEY=your-api-key
```

---

## Summary

- **Use now:** `KASPA_RPC_URL=https://api.kaspa.org` — no API key, no signup, works today.  
- **Use later (optional):** `KASPA_RPC_URL=https://api.kas.fyi` and `KASPA_API_KEY=...` when developer.kas.fyi signup is working again.
