---
id: arch-storage
status: Active
owner: @grantedwards
updated: 2025-10-22
docType: architecture
---

# Hybrid Storage Architecture

> **Purpose:** Define the three-tier storage system for optimal cost, performance, and user experience.

---

## Overview

GotMusic uses a **hybrid storage architecture** that combines the best of centralized CDN performance with decentralized IPFS storage for cost optimization and censorship resistance.

## Storage Tiers

### **Tier 1: R2/S3 (Fast Browsing)**
- **Purpose**: 30s previews, artwork, waveforms
- **Access**: Public CDN URLs
- **Performance**: Global edge caching, <100ms latency
- **Cost**: ~$0.015/GB/month + bandwidth
- **Use Case**: Browse catalog, preview tracks

### **Tier 2: IPFS via Lighthouse (Cheap Storage)**
- **Purpose**: Encrypted master files (full tracks)
- **Access**: Private, requires license verification
- **Performance**: Variable, depends on node proximity
- **Cost**: ~$0.15/GB/month (pinned) + free bandwidth
- **Use Case**: Long-term storage of purchased content

### **Tier 3: R2/S3 Cache (Fast Streaming)**
- **Purpose**: Cached decrypted files for playback
- **Access**: Private, temporary cache
- **Performance**: Fast streaming, <200ms latency
- **Cost**: Temporary storage, auto-expires
- **Use Case**: Smooth playback of purchased tracks

---

## File Flow Architecture

```
Upload → R2/S3 (temp) → Processing → {
  Preview (30s) → R2/S3 (public CDN)
  Waveform → R2/S3 (public CDN)
  Master File → Lighthouse + IPFS (encrypted)
}
```

**Purchase Flow:**
```
License Verification → Lit ACC → Decrypt from IPFS → 
Cache on R2/S3 → Stream to Client
```

---

## Cost Optimization

### **Storage Costs (Monthly)**
- **Previews**: 50GB × $0.015 = $0.75
- **Master Files**: 500GB × $0.15 = $75 (IPFS)
- **Cache**: 100GB × $0.015 = $1.50 (temporary)
- **Total**: ~$77/month for 1,000 tracks

### **Bandwidth Costs**
- **Previews**: High traffic, CDN optimized
- **Master Files**: Low traffic, IPFS distributed
- **Cache**: Medium traffic, temporary

---

## Performance Characteristics

| Storage Type | Latency | Reliability | Cost | Use Case |
|--------------|---------|-------------|------|----------|
| R2/S3 CDN | <100ms | 99.9% | High | Previews, artwork |
| IPFS | 200-2000ms | Variable | Low | Master files |
| R2/S3 Cache | <200ms | 99.9% | Medium | Playback |

---

## Implementation Details

### **Environment Configuration**

```bash
# R2/S3 for previews and cache
STORAGE_DRIVER=r2
R2_ACCOUNT_ID=your-account-id
R2_ACCESS_KEY_ID=your-access-key
R2_SECRET_ACCESS_KEY=your-secret-key
STORAGE_PUBLIC_BASE=https://cdn.gotmusic.app

# Lighthouse for encrypted storage
LIGHTHOUSE_API_KEY=your-api-key
LIT_NETWORK=datil-test
```

### **File Types by Storage**

```typescript
// R2/S3 (Public CDN)
const publicFiles = [
  { kind: "preview", storage: "R2/S3", access: "public" },
  { kind: "artwork", storage: "R2/S3", access: "public" },
  { kind: "waveform", storage: "R2/S3", access: "public" }
];

// IPFS via Lighthouse (Encrypted)
const encryptedFiles = [
  { kind: "master", storage: "Lighthouse+IPFS", access: "private" }
];

// R2/S3 Cache (Temporary)
const cachedFiles = [
  { kind: "playback", storage: "R2/S3", access: "private", ttl: "24h" }
];
```

---

## Benefits

### **Cost Efficiency**
- **90% cost reduction** for large files using IPFS
- **CDN performance** for high-traffic previews
- **Temporary caching** for smooth playback

### **Performance**
- **Instant previews** via global CDN
- **Smooth playback** via cached decryption
- **Scalable storage** via IPFS network

### **Reliability**
- **Redundant storage** across multiple providers
- **Fallback mechanisms** for IPFS failures
- **Audit trails** for all file operations

---

## Migration Strategy

### **Phase 1: Current (R2/S3 Only)**
- All files on R2/S3
- Basic upload/download
- Development and testing

### **Phase 2: Hybrid Implementation**
- Previews stay on R2/S3
- Master files move to IPFS
- Caching layer added

### **Phase 3: Full Optimization**
- Advanced IPFS pinning
- Smart caching algorithms
- Cost monitoring and optimization

---

## Related Documentation

- **Architecture Overview**: `docs.d/architecture/overview.md`
- **Information Architecture**: `docs.d/architecture/ia.md`
- **Audio Operations**: `docs.d/operations/audio.md`
- **Lighthouse Integration**: `docs.d/integrations/lit/`

---

**Last Updated:** 2025-10-22  
**Owner:** @grantedwards
