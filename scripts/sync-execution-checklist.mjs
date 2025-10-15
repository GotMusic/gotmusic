#!/usr/bin/env node

/**
 * Sync EXECUTION-CHECKLIST.md with actual GitHub Issues state
 *
 * This script:
 * 1. Fetches open issues from GitHub API
 * 2. Updates the "Next Recommended" section in EXECUTION-CHECKLIST.md
 * 3. Removes closed issues from the list
 * 4. Sorts by priority (P0 → P1 → P2) and size (S → M → L)
 *
 * Usage:
 *   node scripts/sync-execution-checklist.mjs
 *
 * Environment:
 *   GITHUB_TOKEN - GitHub PAT (optional, increases rate limit)
 */

import { execSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const CHECKLIST_PATH = join(process.cwd(), "docs.d/EXECUTION-CHECKLIST.md");

/**
 * Fetch open issues from GitHub using gh CLI
 */
function fetchOpenIssues() {
  try {
    const output = execSync("gh issue list --state open --json number,title,labels --limit 100", {
      encoding: "utf8",
      stdio: ["pipe", "pipe", "inherit"],
    });
    return JSON.parse(output);
  } catch (error) {
    console.error("Failed to fetch issues from GitHub:", error.message);
    process.exit(1);
  }
}

/**
 * Extract priority from labels (e.g., "priority:P1" → "P1")
 */
function getPriority(labels) {
  const priorityLabel = labels.find((l) => l.name.startsWith("priority:"));
  return priorityLabel ? priorityLabel.name.replace("priority:", "") : "P3";
}

/**
 * Extract size from labels (e.g., "size:M" → "M")
 */
function getSize(labels) {
  const sizeLabel = labels.find((l) => l.name.startsWith("size:"));
  return sizeLabel ? sizeLabel.name.replace("size:", "") : "M";
}

/**
 * Extract area from labels (e.g., "area:web" → "web")
 */
function getArea(labels) {
  const areaLabel = labels.find((l) => l.name.startsWith("area:"));
  return areaLabel ? areaLabel.name.replace("area:", "") : "unknown";
}

/**
 * Extract type from labels (e.g., "type:feature" → "feature")
 */
function getType(labels) {
  const typeLabel = labels.find((l) => l.name.startsWith("type:"));
  return typeLabel ? typeLabel.name.replace("type:", "") : "unknown";
}

/**
 * Sort issues by priority (P0 → P1 → P2 → P3) then by size (XS → S → M → L → XL)
 */
function sortIssues(issues) {
  const priorityOrder = { P0: 0, P1: 1, P2: 2, P3: 3 };
  const sizeOrder = { XS: 0, S: 1, M: 2, L: 3, XL: 4 };

  return issues.sort((a, b) => {
    const aPriority = priorityOrder[getPriority(a.labels)] ?? 99;
    const bPriority = priorityOrder[getPriority(b.labels)] ?? 99;

    if (aPriority !== bPriority) {
      return aPriority - bPriority;
    }

    const aSize = sizeOrder[getSize(a.labels)] ?? 99;
    const bSize = sizeOrder[getSize(b.labels)] ?? 99;
    return aSize - bSize;
  });
}

/**
 * Format issue as markdown list item
 */
function formatIssue(issue) {
  const priority = getPriority(issue.labels);
  const size = getSize(issue.labels);
  const area = getArea(issue.labels);

  // Bold the first P0/P1 issue as recommended next
  const title = issue.title;

  return `- [ ] **#${issue.number}** - ${title} [${size}]`;
}

/**
 * Generate the "Next Recommended" section content
 */
function generateNextRecommendedSection(issues) {
  const p0p1Issues = issues.filter((i) => {
    const priority = getPriority(i.labels);
    return priority === "P0" || priority === "P1";
  });

  const p2Issues = issues.filter((i) => getPriority(i.labels) === "P2");
  const p3Issues = issues.filter((i) => getPriority(i.labels) === "P3");

  let content = "## 10.5) Next Sprint — P2 Issues (Priority Order)\n";

  if (p0p1Issues.length > 0) {
    content += "\n### 🔥 HIGH PRIORITY (P0/P1)\n";
    for (const issue of p0p1Issues) {
      content += `${formatIssue(issue)} ← **RECOMMENDED NEXT**\n`;
    }
  }

  if (p2Issues.length > 0) {
    if (p0p1Issues.length === 0 && p2Issues.length > 0) {
      // Mark first P2 as recommended if no P0/P1
      content += `${formatIssue(p2Issues[0])} ← **RECOMMENDED NEXT**\n`;
      for (const issue of p2Issues.slice(1)) {
        content += `${formatIssue(issue)}\n`;
      }
    } else {
      for (const issue of p2Issues) {
        content += `${formatIssue(issue)}\n`;
      }
    }
  }

  if (p3Issues.length > 0) {
    content += "\n### P3 (Low Priority)\n";
    for (const issue of p3Issues) {
      content += `${formatIssue(issue)}\n`;
    }
  }

  if (p0p1Issues.length === 0 && p2Issues.length === 0 && p3Issues.length === 0) {
    content += "- ✅ All issues complete! Ready for next milestone.\n";
  }

  return content;
}

/**
 * Update EXECUTION-CHECKLIST.md with new "Next Recommended" section
 */
function updateChecklist(issues) {
  const content = readFileSync(CHECKLIST_PATH, "utf8");

  // Find the section to replace (## 10.5) Next Sprint ... up to next ##)
  const sectionRegex = /## 10\.5\) Next Sprint[^\n]*\n[\s\S]*?(?=\n## |\n---|\n$)/;

  if (!sectionRegex.test(content)) {
    console.error("Could not find '## 10.5) Next Sprint' section in EXECUTION-CHECKLIST.md");
    process.exit(1);
  }

  const newSection = generateNextRecommendedSection(sortIssues(issues));
  const updatedContent = content.replace(sectionRegex, newSection);

  writeFileSync(CHECKLIST_PATH, updatedContent, "utf8");
  console.log("✅ Updated EXECUTION-CHECKLIST.md with current open issues");
  console.log(`   Total issues: ${issues.length}`);

  const p0p1Count = issues.filter((i) => ["P0", "P1"].includes(getPriority(i.labels))).length;
  const p2Count = issues.filter((i) => getPriority(i.labels) === "P2").length;
  const p3Count = issues.filter((i) => getPriority(i.labels) === "P3").length;

  console.log(`   P0/P1: ${p0p1Count}, P2: ${p2Count}, P3: ${p3Count}`);
}

/**
 * Main execution
 */
function main() {
  console.log("📋 Syncing EXECUTION-CHECKLIST.md with GitHub Issues...");

  const issues = fetchOpenIssues();
  updateChecklist(issues);

  console.log("\n✨ Sync complete!");
}

main();
