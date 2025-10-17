# (superadmin) Route Group

**Purpose:** Administrative interface for feature flags, audit logs, and system management

**Routes:**
- `/superadmin` → Dashboard with feature flags and health checks
- `/superadmin/audit` → Append-only audit log viewer

**Shared Layout:** `layout.tsx`
- Top navigation with admin badge
- Elevated permissions indicator
- Authentication + authorization required

**Authentication:**
- Admin credentials required (ADMIN_USER/ADMIN_PASS)
- Separate from producer/buyer roles
- Rate limited and logged

**Related Docs:**
- `docs.d/architecture/ia.md` - Role permissions

