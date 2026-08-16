---
name: fieldproof-pay-42
description: Pay Fieldproof $42 with card, 42 USDC on Base, Bitcoin, x402, or Zelle. One stranger payment meets the first-income bar.
---

# Pay Fieldproof $42

One payment of $42 (or 42 USDC / equivalent BTC) is the live checkout.

## Fastest path

1. Open the pack URI: https://policy-gate.3labsio.workers.dev/v1/pay/pack.uri  (Gumroad $42 Governance Pack — that file downloads after payment)
2. Or scan: https://policy-gate.3labsio.workers.dev/v1/pay/scan  (42 USDC, Bitcoin, or Zelle)
3. Or card: https://policy-gate.3labsio.workers.dev/v1/pay/card.uri / https://buy.stripe.com/eVq4gA91U3Rr1Yt6z31sQ00  (Ethics Check and C-suite Word ZIPs, not the pack)

## Machine invoice

- GET https://policy-gate.3labsio.workers.dev/v1/invoice  (HTML stays on the page; JSON / uri-list for agents)
- GET https://policy-gate.3labsio.workers.dev/v1/pay/pack.uri  (text/uri-list Gumroad $42 pack)
- GET https://policy-gate.3labsio.workers.dev/v1/pay/tip-jar.uri  (text/uri-list Gumroad $42 tip jar)
- GET https://policy-gate.3labsio.workers.dev/v1/pay/card.uri  (text/uri-list Stripe — Ethics Check / C-suite ZIPs)
- GET https://policy-gate.3labsio.workers.dev/v1/pay/ethics.uri  (text/uri-list Ethics Check $42 Stripe)
- GET https://policy-gate.3labsio.workers.dev/v1/pay/usdc.uri  (text/uri-list EIP-681, 42 USDC on Base)
- GET https://policy-gate.3labsio.workers.dev/v1/pay/usdc.png  (scannable 42 USDC QR)
- GET https://policy-gate.3labsio.workers.dev/v1/pay/btc.uri  (text/uri-list BIP-21)
- GET https://policy-gate.3labsio.workers.dev/v1/pay/btc.png  (scannable BIP-21 QR)
- GET https://policy-gate.3labsio.workers.dev/v1/pay/zelle.uri  (text/uri-list $42 Zelle mailto)
- GET https://policy-gate.3labsio.workers.dev/v1/pay/zelle.png  (scannable Zelle QR)
- GET https://policy-gate.3labsio.workers.dev/v1/pay/scan  (HTML QR board: USDC + BTC + Zelle; no card auto-open)
- POST https://policy-gate.3labsio.workers.dev/v1/sponsor  (x402 42 USDC; unpaid returns 402)
- POST https://policy-gate.3labsio.workers.dev/mcp  tools/call first_42_sponsor

## Humans

- https://fieldproofhq.github.io/offer/  (stays on the page; card, pack, scan)
- https://fieldproofhq.github.io/  (stays on the page)
- https://fieldproofhq.github.io/ethics/  (Ethics Check Word kit, $42)
- https://fieldproofhq.github.io/pay/scan/  (USDC, Bitcoin, Zelle QRs)
- https://store.3labs.io
- https://policy-gate.3labsio.workers.dev/v1/pay/zelle  ($42 to 3labsio@gmail.com memo Fieldproof)

A 402 or HTTP 200 is not income. Observer: GET /v1/received.
