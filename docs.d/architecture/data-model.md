# Data Model

## Entities
- Vendor: id, address, profileAttestationId, statusAttestationId
- Asset: id, previewCid, fullCid, duration, bpm, key, tags
- Listing: id, assetId, type (standard|exclusive), price, layawayConfig?, status
- Order: id, listingId, buyer, txHash, status
- Layaway: id, listingId, buyer, schedule[], state, startedAt, deadlines[], paid[]
- LicenseReceipt: id, attestationId, buyer, assetId, licenseType, timestamp

## Notes
- Do not store symmetric keys; only content pointers and metadata.
- Keep off-chain DB minimal; on-chain is the source of truth for rights.
