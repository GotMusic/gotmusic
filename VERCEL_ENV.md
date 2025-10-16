# Vercel Environment Variables Setup

This document outlines the required environment variables for deploying GotMusic to Vercel.

## Required Environment Variables

### Database (Required)

```bash
DATABASE_URL=postgresql://user:pass@host:5432/gotmusic_prod
```

**Where to set:** Vercel Project Settings → Environment Variables  
**Scope:** Production, Preview, Development  
**Note:** Use a production PostgreSQL instance (Neon, Supabase, Railway, etc.)

### Admin Authentication (Required)

```bash
ADMIN_USER=your_admin_username
ADMIN_PASS=your_secure_password
```

**Where to set:** Vercel Project Settings → Environment Variables  
**Scope:** Production, Preview (optional for Development)  
**Security:** Use strong passwords, rotate regularly

### Storage Configuration (Optional)

#### If using AWS S3:
```bash
STORAGE_DRIVER=s3
STORAGE_BUCKET=your-s3-bucket
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
STORAGE_PUBLIC_BASE=https://cdn.gotmusic.app
```

#### If using Cloudflare R2:
```bash
STORAGE_DRIVER=r2
STORAGE_BUCKET=your-r2-bucket
R2_ACCOUNT_ID=your-account-id
R2_ACCESS_KEY_ID=your-access-key
R2_SECRET_ACCESS_KEY=your-secret-key
STORAGE_PUBLIC_BASE=https://cdn.gotmusic.app
```

**Where to set:** Vercel Project Settings → Environment Variables  
**Scope:** Production, Preview  
**Note:** If not set, storage defaults to stub mode (development only)

### Blockchain / Web3 (Optional - for production features)

```bash
# Base Network
NEXT_PUBLIC_BASE_RPC=https://sepolia.base.org
NEXT_PUBLIC_BASE_CHAIN_ID=84532
NEXT_PUBLIC_BLOCKSCOUT_URL=https://base-sepolia.blockscout.com

# EAS (Ethereum Attestation Service)
EAS_CHAIN_ID=84532
EAS_SCHEMA_VENDOR=0x...
EAS_SCHEMA_LICENSE=0x...

# Lit Protocol
LIT_NETWORK=datil-test
NEXT_PUBLIC_LIT_NETWORK=datil-test

# Lighthouse
LIGHTHOUSE_API_KEY=your-api-key
```

**Where to set:** Vercel Project Settings → Environment Variables  
**Scope:** Production, Preview (use testnet values for Preview)  
**Note:** These are for planned integrations; app works without them in MVP mode

### Feature Flags (Optional)

```bash
# Show mock receipt data in preview deployments
NEXT_PUBLIC_SHOW_MOCK_RECEIPT=true

# Enable admin panel
NEXT_PUBLIC_ENABLE_ADMIN=true
```

**Where to set:** Vercel Project Settings → Environment Variables  
**Scope:** Preview (for testing), Production (set to false)

## Vercel Project Setup

### 1. Create Vercel Project

```bash
# Using Vercel CLI
vercel link

# Or via Vercel Dashboard
# 1. Go to https://vercel.com/new
# 2. Import Git repository
# 3. Select gotmusic repo
```

### 2. Configure Build Settings

**Framework Preset:** Other  
**Build Command:** `yarn workspace @gotmusic/web build`  
**Output Directory:** `apps/web/.next`  
**Install Command:** `corepack enable && corepack prepare yarn@4.3.1 --activate && yarn install --immutable`  
**Development Command:** `yarn workspace @gotmusic/web dev`

**Node.js Version:** 20.x

### 3. Set Environment Variables

```bash
# Using Vercel CLI
vercel env add DATABASE_URL production
vercel env add ADMIN_USER production
vercel env add ADMIN_PASS production

# Or via Vercel Dashboard
# Project Settings → Environment Variables → Add
```

**For each variable:**
- Name: Variable name (e.g., `DATABASE_URL`)
- Value: Your secret/config value
- Scope: Select Production, Preview, and/or Development

### 4. Enable Preview Deployments

**Settings → Git → Deploy Hooks**

- ✅ Enable Vercel for GitHub
- ✅ Auto-deploy on push to main
- ✅ Deploy preview for pull requests
- ✅ Comment on PRs with preview URL

### 5. Configure Domains (Optional)

**Production:**
- Custom domain: `gotmusic.app` (if purchased)
- Auto-generated: `gotmusic.vercel.app`

**Preview:**
- Auto-generated: `gotmusic-git-[branch]-[team].vercel.app`

## Environment Variable Checklist

### Minimum Required (for deployment to work):
- [x] `DATABASE_URL` - PostgreSQL connection
- [x] `ADMIN_USER` - Admin panel username
- [x] `ADMIN_PASS` - Admin panel password

### Recommended (for full functionality):
- [ ] `STORAGE_*` - Cloud storage configuration
- [ ] `NEXT_PUBLIC_BLOCKSCOUT_URL` - Blockchain explorer links
- [ ] `NEXT_PUBLIC_BASE_RPC` - Base network access

### Optional (for advanced features):
- [ ] EAS variables - Attestation schemas
- [ ] Lit Protocol - Encrypted access
- [ ] Lighthouse - Encrypted storage

## Troubleshooting

### Build Fails: "Cannot find module '@gotmusic/api'"

**Cause:** Workspace dependencies not built  
**Fix:** Vercel's build command includes `yarn workspace @gotmusic/web build` which should build dependencies. Verify `vercel.json` is correct.

### Database Connection Error

**Cause:** `DATABASE_URL` not set or incorrect  
**Fix:** 
1. Verify variable is set in Vercel
2. Check connection string format
3. Ensure database accepts connections from Vercel IPs (0.0.0.0/0 or Vercel's IP range)

### Admin Panel Returns 401

**Cause:** `ADMIN_USER` or `ADMIN_PASS` not set  
**Fix:** Set both variables in Vercel environment settings

### Storage Uploads Fail

**Cause:** Storage credentials not set  
**Fix:** Set `STORAGE_DRIVER` and related AWS/R2 variables, or accept stub mode for demo

## Security Best Practices

1. **Never commit secrets** - Use Vercel environment variables
2. **Use different values for Preview and Production** - Separate databases, different admin passwords
3. **Rotate credentials regularly** - Update Vercel env vars when rotating
4. **Limit database access** - Use read-only credentials where possible
5. **Enable Vercel password protection** - For preview deployments (Settings → Deployment Protection)

## Preview Deployment URLs

Once configured, every PR will get:
- Unique preview URL: `gotmusic-git-[branch]-[team].vercel.app`
- Comment on PR with deployment status and URL
- Automatic updates on push to PR branch
- Deployment logs available in Vercel dashboard

## Production Deployment

Main branch deployments go to:
- Production URL: `gotmusic.vercel.app` (or custom domain)
- Auto-deploy on merge to main
- Deployment logs and analytics in Vercel dashboard

## Related Documentation

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Environment Variables](https://vercel.com/docs/projects/environment-variables)
- [Vercel CLI](https://vercel.com/docs/cli)
- Project `.env.example` - Example values for all variables
- Project `README.md` - Development setup

