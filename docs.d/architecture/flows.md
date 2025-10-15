# Core Flows

## Seller: upload & publish
1) Connect wallet; write/update `vendor-profile` and `vendor-status` if needed.
2) Upload asset to Lighthouse; encrypt; store returned CIDs.
3) Create listing (standard/exclusive), optionally with layaway config.

## Buyer: standard purchase
1) Build Nexus intent (PYUSD on Ethereum → execute purchase on Base).
2) Submit; show progress; wait for Base execution event.
3) Write `license-receipt` attestation.
4) Request Lit decryption for master asset; download and play.

## Buyer: layaway
1) Reserve (deposit) via intent; listing hidden.
2) Pay installments via intents; track progress.
3) On completion, write `license-receipt`; Lit ACC allows full decrypt.

## Playback
- Preview: stream 30s low-bitrate asset.
- Full: fetch encrypted blob; Lit returns key if authorized; decrypt client-side.
