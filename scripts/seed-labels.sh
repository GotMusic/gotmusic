#!/bin/bash
# Seed/normalize labels to match issue templates

echo "Creating type labels..."
gh label create "type:feature" -c "#0e8a16" -d "Feature work" 2>/dev/null || echo "  type:feature exists"
gh label create "type:task"    -c "#1d76db" -d "Task / chore" 2>/dev/null || echo "  type:task exists"
gh label create "type:bug"     -c "#d73a4a" -d "Bug" 2>/dev/null || echo "  type:bug exists"
gh label create "type:test"    -c "#5319e7" -d "Tests" 2>/dev/null || echo "  type:test exists"
gh label create "type:docs"    -c "#c5def5" -d "Documentation" 2>/dev/null || echo "  type:docs exists"

echo "Creating area labels..."
for a in admin ui-kit tokens mobile web testing api storage payments lit lighthouse eas ci docs tooling; do
  gh label create "area:${a}" -c "#ededed" -d "Area: ${a}" 2>/dev/null || echo "  area:${a} exists"
done

echo "Creating priority labels..."
gh label create "priority:P0" -c "#b60205" -d "Critical - blocks demo" 2>/dev/null || echo "  priority:P0 exists"
gh label create "priority:P1" -c "#ff8c00" -d "High priority" 2>/dev/null || echo "  priority:P1 exists"
gh label create "priority:P2" -c "#fbca04" -d "Normal priority" 2>/dev/null || echo "  priority:P2 exists"
gh label create "priority:P3" -c "#c2e0c6" -d "Low priority" 2>/dev/null || echo "  priority:P3 exists"

echo "Creating size labels..."
for s in XS S M L XL; do 
  gh label create "size:${s}" -c "#0052cc" -d "Size: ${s}" 2>/dev/null || echo "  size:${s} exists"
done

echo "Creating special labels..."
gh label create "override:hygiene" -c "#f9d0c4" -d "Maintainers only - bypass workflow hygiene checks" 2>/dev/null || echo "  override:hygiene exists"
gh label create "needs-triage" -c "#d876e3" -d "New issue needing review" 2>/dev/null || echo "  needs-triage exists"

echo "✅ Label seeding complete!"

