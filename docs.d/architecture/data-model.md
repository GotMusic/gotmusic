# Data Model

## Entities
- Vendor: id, address, profileAttestationId, statusAttestationId
- Asset: id, previewUrl (R2/S3), encryptedCid (IPFS), duration, bpm, key, tags
- Listing: id, assetId, type (standard|exclusive), price, layawayConfig?, status
- Order: id, listingId, buyer, txHash, status
- Layaway: id, listingId, buyer, schedule[], state, startedAt, deadlines[], paid[]
- LicenseReceipt: id, attestationId, buyer, assetId, licenseType, timestamp

## Storage Architecture
- **Previews**: R2/S3 URLs for 30s clips, artwork, waveforms
- **Master Files**: IPFS CIDs via Lighthouse for encrypted full tracks
- **Cache**: R2/S3 temporary storage for decrypted playback files

## Notes
- Do not store symmetric keys; only content pointers and metadata.
- Keep off-chain DB minimal; on-chain is the source of truth for rights.
- Hybrid storage: R2/S3 for performance, IPFS for cost efficiency.
