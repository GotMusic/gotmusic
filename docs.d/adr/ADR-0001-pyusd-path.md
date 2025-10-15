# ADR-0001: PYUSD Path via Avail Nexus

## Status
Accepted

## Context
PYUSD is native on Ethereum. Our app executes marketplace logic on Base. We need great UX and verifiable receipts.

## Decision
Use Avail Nexus "Bridge & Execute": users pay PYUSD on Ethereum; Nexus executes purchase/layaway calls on Base.

## Consequences
- Excellent UX; single user action.
- Clear on-chain provenance on Base; payments on Ethereum.
- Adds cross-chain dependency; mitigated by robust status UI.
