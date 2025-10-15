---
id: INDEX
status: Active
owner: @grantedwards
updated: 2025-10-15
---

# GotMusic — Private Docs Index

**This is the only router. Everything starts here.**

> **Source of truth:** `.cursorrules` (policies) + this index (navigation)

---

## 🚀 New Chat? Start Here

1. **Copy entire `AGENT-START.md`** into new chat
2. Fill `ISSUE: #` and `GOAL: <one sentence>`
3. Send

Agent auto-reads: INDEX, EXEC-CHECKLIST, ISSUE-PR-WORKFLOW

---

## 📚 Live Docs (Active Use)

### **Core Workflow:**
- **`AGENT-START.md`** ⭐ Kickoff template (2 fields: ISSUE + GOAL)
- **`EXECUTION-CHECKLIST.md`** Current status, priorities, CI rules
- **`ISSUE-PR-WORKFLOW.md`** Branch naming, commits, PRs, closes
- **`KNOWLEDGE-UPDATE-SUMMARY.md`** Doc changelog

### **Technical Reference:**
- **`architecture/overview.md`** System design, components
- **`architecture/data-model.md`** DB schema, relationships
- **`architecture/flows.md`** Purchase, upload, access flows
- **`adr/ADR-000X.md`** Architecture decisions (3 active)
- **`testing/e2e.md`** Playwright patterns, debugging

---

## 💡 Quick Lookups

| Task | Read |
|------|------|
| **Start new feature** | AGENT-START → EXEC-CHECKLIST → ISSUE-PR-WORKFLOW |
| **Fix bug** | architecture/data-model → testing/e2e |
| **CI failure** | EXEC-CHECKLIST (Section 8) → testing/e2e |
| **API change** | architecture/data-model → flows |
| **Decision needed** | adr/ (read existing, add new if needed) |

---

**That's it. No more subdirectories to memorize.**

Git history has everything else if you need it later.

---

**Last updated:** 2025-10-15 (Documentation refactor - two-tier system)

