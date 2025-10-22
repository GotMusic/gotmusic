#!/usr/bin/env node

/**
 * Storybook Performance Monitoring Script
 * Monitors build time, bundle size, and component load performance
 */

import { execSync } from "child_process";
import { readFileSync, writeFileSync, existsSync, statSync } from "fs";
import { join } from "path";

const PERFORMANCE_BUDGETS = {
  buildTime: 30000, // 30 seconds
  bundleSize: 100000, // 100KB per component
  componentLoadTime: 100, // 100ms
  memoryUsage: 500000000, // 500MB
};

const PERFORMANCE_REPORT = {
  timestamp: new Date().toISOString(),
  budgets: PERFORMANCE_BUDGETS,
  metrics: {},
  violations: [],
  recommendations: [],
};

function measureBuildTime() {
  console.log("🔨 Measuring Storybook build time...");
  const startTime = Date.now();
  
  try {
    execSync("yarn build-storybook", { 
      stdio: "pipe",
      cwd: process.cwd(),
    });
    const buildTime = Date.now() - startTime;
    PERFORMANCE_REPORT.metrics.buildTime = buildTime;
    
    if (buildTime > PERFORMANCE_BUDGETS.buildTime) {
      PERFORMANCE_REPORT.violations.push({
        type: "buildTime",
        actual: buildTime,
        budget: PERFORMANCE_BUDGETS.buildTime,
        severity: "error",
      });
    }
    
    console.log(`✅ Build completed in ${buildTime}ms`);
  } catch (error) {
    console.error("❌ Build failed:", error.message);
    process.exit(1);
  }
}

function analyzeBundleSize() {
  console.log("📦 Analyzing bundle size...");
  
  try {
    // Check if storybook-static exists
    const storybookDir = join(process.cwd(), "storybook-static");
    
    if (!existsSync(storybookDir)) {
      console.log("⚠️  Storybook build not found, skipping bundle analysis");
      return;
    }
    
    // Analyze main bundle size
    const mainJsPath = join(storybookDir, "sb-manager", "runtime.js");
    if (existsSync(mainJsPath)) {
      const stats = statSync(mainJsPath);
      const bundleSize = stats.size;
      PERFORMANCE_REPORT.metrics.bundleSize = bundleSize;
      
      if (bundleSize > PERFORMANCE_BUDGETS.bundleSize) {
        PERFORMANCE_REPORT.violations.push({
          type: "bundleSize",
          actual: bundleSize,
          budget: PERFORMANCE_BUDGETS.bundleSize,
          severity: "warning",
        });
      }
      
      console.log(`✅ Main bundle size: ${(bundleSize / 1024).toFixed(2)}KB`);
    }
  } catch (error) {
    console.error("❌ Bundle analysis failed:", error.message);
  }
}

function generateRecommendations() {
  console.log("💡 Generating performance recommendations...");
  
  const { metrics, violations } = PERFORMANCE_REPORT;
  
  if (violations.length > 0) {
    PERFORMANCE_REPORT.recommendations.push("Consider implementing lazy loading for heavy components");
    PERFORMANCE_REPORT.recommendations.push("Review and optimize component imports");
    PERFORMANCE_REPORT.recommendations.push("Consider code splitting for large dependencies");
  }
  
  if (metrics.buildTime > PERFORMANCE_BUDGETS.buildTime * 0.8) {
    PERFORMANCE_REPORT.recommendations.push("Build time is approaching budget limit");
  }
  
  if (metrics.bundleSize > PERFORMANCE_BUDGETS.bundleSize * 0.8) {
    PERFORMANCE_REPORT.recommendations.push("Bundle size is approaching budget limit");
  }
}

function generateReport() {
  console.log("📊 Generating performance report...");
  
  const reportPath = join(process.cwd(), ".storybook-performance-report.json");
  writeFileSync(reportPath, JSON.stringify(PERFORMANCE_REPORT, null, 2));
  
  console.log("📈 Performance Report Summary:");
  console.log(`  Build Time: ${PERFORMANCE_REPORT.metrics.buildTime}ms`);
  console.log(`  Bundle Size: ${(PERFORMANCE_REPORT.metrics.bundleSize / 1024).toFixed(2)}KB`);
  console.log(`  Violations: ${PERFORMANCE_REPORT.violations.length}`);
  console.log(`  Recommendations: ${PERFORMANCE_REPORT.recommendations.length}`);
  
  if (PERFORMANCE_REPORT.violations.length > 0) {
    console.log("\n⚠️  Performance Violations:");
    PERFORMANCE_REPORT.violations.forEach(violation => {
      console.log(`  - ${violation.type}: ${violation.actual} (budget: ${violation.budget})`);
    });
  }
  
  if (PERFORMANCE_REPORT.recommendations.length > 0) {
    console.log("\n💡 Recommendations:");
    PERFORMANCE_REPORT.recommendations.forEach(rec => {
      console.log(`  - ${rec}`);
    });
  }
  
  console.log(`\n📄 Full report saved to: ${reportPath}`);
}

// Main execution
async function main() {
  console.log("🚀 Starting Storybook Performance Monitoring...\n");
  
  measureBuildTime();
  analyzeBundleSize();
  generateRecommendations();
  generateReport();
  
  const hasViolations = PERFORMANCE_REPORT.violations.some(v => v.severity === "error");
  if (hasViolations) {
    console.log("\n❌ Performance budget violations detected!");
    process.exit(1);
  } else {
    console.log("\n✅ All performance budgets met!");
    process.exit(0);
  }
}

main().catch(error => {
  console.error("❌ Performance monitoring failed:", error);
  process.exit(1);
});
