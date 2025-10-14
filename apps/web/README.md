# GotMusic Web App

The web application for GotMusic - a music NFT marketplace.

## Quick Start

1. **Set up PostgreSQL database** (see Database section below)
2. **Copy environment variables:**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your DATABASE_URL
   ```
3. **Apply migrations and seed:**
   ```bash
   yarn db:push && yarn db:seed
   ```
4. **Start development server:**
   ```bash
   yarn dev
   ```

## Database (PostgreSQL Required)

### Setup Options

**Option 1: Neon (Recommended for development)**
1. Sign up at [neon.tech](https://neon.tech)
2. Create a new project
3. Copy the connection string to `DATABASE_URL`

**Option 2: Supabase**
1. Sign up at [supabase.com](https://supabase.com)
2. Create a new project
3. Go to Settings > Database > Connection string
4. Copy to `DATABASE_URL`

**Option 3: Railway**
1. Sign up at [railway.app](https://railway.app)
2. Create a new PostgreSQL service
3. Copy the connection string to `DATABASE_URL`

**Option 4: Local PostgreSQL**
1. Install PostgreSQL locally
2. Create database: `createdb gotmusic_dev`
3. Set `DATABASE_URL=postgresql://postgres:password@localhost:5432/gotmusic_dev`

### Database Commands

**Generate migrations:**
```bash
yarn db:generate
```

**Apply migrations:**
```bash
yarn db:push
```

**Seed the database:**
```bash
yarn db:seed
```

**Open Drizzle Studio:**
```bash
yarn db:studio
```

**Test database connection:**
```bash
yarn db:test
```

### Database Schema
- **Assets**: Music tracks with metadata (title, artist, BPM, key signature, price)
- **Asset Files**: File storage references (original, preview, artwork, waveform)
- **Asset Audit**: Change tracking and audit logs

### Schema Features
- **Enums**: Type-safe status, file kinds, and audit operations
- **Constraints**: Unique file per asset/kind, positive pricing
- **Indexes**: Optimized for common queries
- **Triggers**: Auto-update timestamps

## Environment Variables

Create `.env.local` with these variables:

```bash
# Required: PostgreSQL connection
DATABASE_URL=postgresql://user:pass@host:port/database

# Optional: Admin authentication (development only)
ADMIN_USER=admin
ADMIN_PASS=password

# Optional: Storage configuration
STORAGE_DRIVER=stub  # stub, s3, r2
STORAGE_BUCKET=your-bucket
STORAGE_REGION=us-east-1
STORAGE_ACCESS_KEY_ID=your-key
STORAGE_SECRET_ACCESS_KEY=your-secret
```

## Development

The application uses PostgreSQL with Drizzle ORM. All database operations are optimized for production use.

### Drizzle Commands Cheat Sheet

```bash
# Generate new migration after schema changes
yarn db:generate

# Apply pending migrations
yarn db:push

# Seed database with sample data
yarn db:seed

# Open database browser
yarn db:studio

# Test database connection
yarn db:test
```

## Production

For production deployments:
- Use a managed PostgreSQL service (Neon, Supabase, Railway, AWS RDS)
- Set `DATABASE_URL` environment variable
- Admin authentication is disabled by default
- All database constraints and indexes are applied automatically
