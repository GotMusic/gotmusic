# GotMusic Web App

The web application for GotMusic - a music NFT marketplace.

## Database

### Location
The database is located at: `apps/web/.data/dev.db`

### Commands

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

### Development
The database uses SQLite with WAL mode for development. All database files are stored in the `.data/` directory and are gitignored.

### Environment Variables

**Database:**
- `DB_DRIVER`: Database driver (sqlite/pg)
- `DATABASE_URL`: Connection string for Postgres
- `DATABASE_PATH`: Path for SQLite database

**Admin Authentication (Development Only):**
- `ADMIN_USER`: Username for admin routes (default: admin)
- `ADMIN_PASS`: Password for admin routes (default: password)

**Storage:**
- `STORAGE_DRIVER`: Storage driver (stub/r2/s3)
- `STORAGE_BUCKET`: Storage bucket name
- `AWS_REGION`, `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`: AWS S3 credentials
- `R2_ACCOUNT_ID`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`: Cloudflare R2 credentials

### Production
For production deployments, the database configuration can be changed via environment variables. Admin authentication is disabled in production by default.
