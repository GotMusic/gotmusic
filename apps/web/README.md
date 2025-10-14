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

### Production
For production deployments, the database configuration can be changed via environment variables:
- `DB_DRIVER`: Database driver (sqlite/pg)
- `DATABASE_URL`: Connection string for Postgres
- `DATABASE_PATH`: Path for SQLite database
