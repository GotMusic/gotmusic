# ADR-0002: Lit Networks Strategy

## Status
Accepted

## Context
We need fast iteration without sacrificing production stability.

## Decision
- Build on `datil-dev`, test on `datil-test`, launch on `main`.

## Consequences
- Faster prototyping with realistic pre-prod validation.
- Reduced risk of surprises at launch.
