#!/usr/bin/env node

/**
 * CI Performance Monitoring Script
 * Runs comprehensive performance analysis and enforces budgets
 */

import { execSync } from "child_process";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";

const PERFORMANCE_BUDGETS = {
  // Build time budgets (seconds)
  buildTime: {
    web: 60, // 1 minute
    mobile: 90, // 1.5 minutes
    ui: 30, // 30 seconds
    api: 20, // 20 seconds
    worker: 15, // 15 seconds
  },
  // Bundle size budgets (KB)
  bundleSize: {
    web: 500, // 500KB
    mobile: 200, // 200KB
    ui: 100, // 100KB per component
    api: 50, // 50KB
    worker: 100, // 100KB
  },
  // Dependency budgets
  dependencies: {
    ui: 20,
    api: 15,
    fixtures: 10,
    tokens: 10,
    web: 30,
    mobile: 25,
    worker: 15,
  },
  // Performance score threshold
  performanceScore: 95, // 95% minimum
};

const PERFORMANCE_REPORT = {
  timestamp: new Date().toISOString(),
  budgets: PERFORMANCE_BUDGETS,
  metrics: {},
  violations: [],
  recommendations: [],
  ciStatus: "pending",
};

function runPerformanceAnalysis() {
  console.log("🔍 Running comprehensive performance analysis...");
  
  try {
    execSync("yarn perf:analyze", { stdio: "inherit" });
    console.log("✅ Performance analysis completed");
  } catch (error) {
    console.error("❌ Performance analysis failed:", error.message);
    process.exit(1);
  }
}

function loadPerformanceReport() {
  console.log("📊 Loading performance report...");
  
  const reportPath = ".e18e-report.json";
  if (!existsSync(reportPath)) {
    console.error("❌ Performance report not found");
    process.exit(1);
  }
  
  const report = JSON.parse(readFileSync(reportPath, "utf8"));
  PERFORMANCE_REPORT.metrics = {
    performanceScore: report.summary.performanceScore,
    totalPackages: report.summary.totalPackages,
    packagesWithinBudget: report.summary.packagesWithinBudget,
    packagesOverBudget: report.summary.packagesOverBudget,
  };
  
  console.log(`📈 Performance Score: ${report.summary.performanceScore}%`);
  console.log(`📦 Packages: ${report.summary.packagesWithinBudget}/${report.summary.totalPackages} within budget`);
}

function checkPerformanceBudgets() {
  console.log("🎯 Checking performance budgets...");
  
  const { performanceScore } = PERFORMANCE_REPORT.metrics;
  
  // Check performance score
  if (performanceScore < PERFORMANCE_BUDGETS.performanceScore) {
    PERFORMANCE_REPORT.violations.push({
      type: "performanceScore",
      actual: performanceScore,
      budget: PERFORMANCE_BUDGETS.performanceScore,
      severity: "error",
    });
  }
  
  // Check package budgets
  const reportPath = ".e18e-report.json";
  if (existsSync(reportPath)) {
    const report = JSON.parse(readFileSync(reportPath, "utf8"));
    
    Object.entries(report.packages).forEach(([packageName, packageData]) => {
      const budget = PERFORMANCE_BUDGETS.dependencies[packageName.split('/').pop()];
      if (budget && packageData.totalDependencies > budget) {
        PERFORMANCE_REPORT.violations.push({
          type: "dependencies",
          package: packageName,
          actual: packageData.totalDependencies,
          budget: budget,
          severity: "warning",
        });
      }
    });
  }
}

function measureBuildTimes() {
  console.log("⏱️  Measuring build times...");
  
  const packages = ["@gotmusic/ui", "@gotmusic/api", "@gotmusic/web", "@gotmusic/mobile"];
  
  packages.forEach(packageName => {
    try {
      console.log(`🔨 Building ${packageName}...`);
      const startTime = Date.now();
      
      execSync(`yarn workspace ${packageName} build`, { 
        stdio: "pipe",
        timeout: 120000, // 2 minute timeout
      });
      
      const buildTime = Date.now() - startTime;
      const buildTimeSeconds = Math.round(buildTime / 1000);
      
      PERFORMANCE_REPORT.metrics[`${packageName}_buildTime`] = buildTimeSeconds;
      
      const budget = PERFORMANCE_BUDGETS.buildTime[packageName.split('/').pop()];
      if (budget && buildTimeSeconds > budget) {
        PERFORMANCE_REPORT.violations.push({
          type: "buildTime",
          package: packageName,
          actual: buildTimeSeconds,
          budget: budget,
          severity: "error",
        });
      }
      
      console.log(`✅ ${packageName} built in ${buildTimeSeconds}s`);
    } catch (error) {
      console.error(`❌ ${packageName} build failed:`, error.message);
      PERFORMANCE_REPORT.violations.push({
        type: "buildFailure",
        package: packageName,
        severity: "error",
      });
    }
  });
}

function generateRecommendations() {
  console.log("💡 Generating performance recommendations...");
  
  const { violations } = PERFORMANCE_REPORT;
  
  if (violations.length > 0) {
    PERFORMANCE_REPORT.recommendations.push("Review and optimize slow builds");
    PERFORMANCE_REPORT.recommendations.push("Consider implementing build caching");
    PERFORMANCE_REPORT.recommendations.push("Review dependency usage and remove unused packages");
  }
  
  // Add general recommendations
  PERFORMANCE_REPORT.recommendations.push("Set up performance monitoring in CI/CD");
  PERFORMANCE_REPORT.recommendations.push("Implement performance budgets in pull requests");
  PERFORMANCE_REPORT.recommendations.push("Add performance regression detection");
}

function generateCIReport() {
  console.log("📊 Generating CI performance report...");
  
  const reportPath = ".ci-performance-report.json";
  writeFileSync(reportPath, JSON.stringify(PERFORMANCE_REPORT, null, 2));
  
  console.log("📈 CI Performance Report Summary:");
  console.log(`  Performance Score: ${PERFORMANCE_REPORT.metrics.performanceScore}%`);
  console.log(`  Packages Within Budget: ${PERFORMANCE_REPORT.metrics.packagesWithinBudget}/${PERFORMANCE_REPORT.metrics.totalPackages}`);
  console.log(`  Violations: ${PERFORMANCE_REPORT.violations.length}`);
  console.log(`  Recommendations: ${PERFORMANCE_REPORT.recommendations.length}`);
  
  if (PERFORMANCE_REPORT.violations.length > 0) {
    console.log("\n⚠️  Performance Violations:");
    PERFORMANCE_REPORT.violations.forEach(violation => {
      console.log(`  - ${violation.type}: ${violation.actual || 'N/A'} (budget: ${violation.budget || 'N/A'})`);
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

function setCIStatus() {
  const hasErrors = PERFORMANCE_REPORT.violations.some(v => v.severity === "error");
  
  if (hasErrors) {
    PERFORMANCE_REPORT.ciStatus = "failed";
    console.log("\n❌ Performance budget violations detected!");
    process.exit(1);
  } else {
    PERFORMANCE_REPORT.ciStatus = "passed";
    console.log("\n✅ All performance budgets met!");
    process.exit(0);
  }
}

// Main execution
async function main() {
  console.log("🚀 Starting CI Performance Monitoring...\n");
  
  runPerformanceAnalysis();
  loadPerformanceReport();
  checkPerformanceBudgets();
  measureBuildTimes();
  generateRecommendations();
  generateCIReport();
  setCIStatus();
}

main().catch(error => {
  console.error("❌ CI Performance monitoring failed:", error);
  process.exit(1);
});
