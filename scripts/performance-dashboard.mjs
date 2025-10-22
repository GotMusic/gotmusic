#!/usr/bin/env node

/**
 * Performance Dashboard Generator
 * Creates an HTML dashboard for performance monitoring
 */

import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";

const DASHBOARD_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GotMusic Performance Dashboard</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            border-radius: 12px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            overflow: hidden;
        }
        
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            text-align: center;
        }
        
        .header h1 {
            font-size: 2.5rem;
            margin-bottom: 10px;
        }
        
        .header p {
            opacity: 0.9;
            font-size: 1.1rem;
        }
        
        .metrics {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            padding: 30px;
        }
        
        .metric-card {
            background: #f8f9fa;
            border-radius: 8px;
            padding: 20px;
            text-align: center;
            border-left: 4px solid #28a745;
        }
        
        .metric-card.warning {
            border-left-color: #ffc107;
        }
        
        .metric-card.error {
            border-left-color: #dc3545;
        }
        
        .metric-value {
            font-size: 2.5rem;
            font-weight: bold;
            color: #28a745;
            margin-bottom: 5px;
        }
        
        .metric-card.warning .metric-value {
            color: #ffc107;
        }
        
        .metric-card.error .metric-value {
            color: #dc3545;
        }
        
        .metric-label {
            color: #6c757d;
            font-size: 0.9rem;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        .packages {
            padding: 30px;
            background: #f8f9fa;
        }
        
        .packages h2 {
            margin-bottom: 20px;
            color: #333;
        }
        
        .package-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 15px;
        }
        
        .package-card {
            background: white;
            border-radius: 8px;
            padding: 20px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        
        .package-name {
            font-weight: bold;
            color: #333;
            margin-bottom: 10px;
        }
        
        .package-status {
            display: inline-block;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: bold;
            text-transform: uppercase;
        }
        
        .status-success {
            background: #d4edda;
            color: #155724;
        }
        
        .status-warning {
            background: #fff3cd;
            color: #856404;
        }
        
        .status-error {
            background: #f8d7da;
            color: #721c24;
        }
        
        .footer {
            background: #333;
            color: white;
            padding: 20px;
            text-align: center;
            font-size: 0.9rem;
        }
        
        .timestamp {
            color: #6c757d;
            font-size: 0.8rem;
            margin-top: 10px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🚀 GotMusic Performance Dashboard</h1>
            <p>Real-time performance monitoring and optimization</p>
        </div>
        
        <div class="metrics">
            <div class="metric-card" id="performance-score">
                <div class="metric-value">100%</div>
                <div class="metric-label">Performance Score</div>
            </div>
            
            <div class="metric-card" id="packages-within-budget">
                <div class="metric-value">7/7</div>
                <div class="metric-label">Packages Within Budget</div>
            </div>
            
            <div class="metric-card" id="total-packages">
                <div class="metric-value">7</div>
                <div class="metric-label">Total Packages</div>
            </div>
            
            <div class="metric-card" id="violations">
                <div class="metric-value">0</div>
                <div class="metric-label">Performance Violations</div>
            </div>
        </div>
        
        <div class="packages">
            <h2>📦 Package Performance</h2>
            <div class="package-grid" id="package-grid">
                <!-- Packages will be populated by JavaScript -->
            </div>
        </div>
        
        <div class="footer">
            <p>Generated by GotMusic Performance Monitoring System</p>
            <div class="timestamp" id="timestamp"></div>
        </div>
    </div>
    
    <script>
        // Load performance data
        const performanceData = {{PERFORMANCE_DATA}};
        
        // Update metrics
        document.getElementById('performance-score').querySelector('.metric-value').textContent = performanceData.metrics.performanceScore + '%';
        document.getElementById('packages-within-budget').querySelector('.metric-value').textContent = performanceData.metrics.packagesWithinBudget + '/' + performanceData.metrics.totalPackages;
        document.getElementById('total-packages').querySelector('.metric-value').textContent = performanceData.metrics.totalPackages;
        document.getElementById('violations').querySelector('.metric-value').textContent = performanceData.violations.length;
        
        // Update package grid
        const packageGrid = document.getElementById('package-grid');
        Object.entries(performanceData.packages).forEach(([packageName, packageData]) => {
            const packageCard = document.createElement('div');
            packageCard.className = 'package-card';
            
            const status = packageData.withinBudget ? 'success' : 'error';
            const statusText = packageData.withinBudget ? 'Within Budget' : 'Over Budget';
            
            packageCard.innerHTML = \`
                <div class="package-name">\${packageName}</div>
                <div class="package-status status-\${status}">\${statusText}</div>
                <div style="margin-top: 10px; font-size: 0.9rem; color: #6c757d;">
                    Dependencies: \${packageData.totalDependencies}
                </div>
            \`;
            
            packageGrid.appendChild(packageCard);
        });
        
        // Update timestamp
        document.getElementById('timestamp').textContent = 'Last updated: ' + new Date(performanceData.timestamp).toLocaleString();
        
        // Update metric card colors based on violations
        const violationsCard = document.getElementById('violations');
        if (performanceData.violations.length > 0) {
            violationsCard.classList.add('error');
        }
    </script>
</body>
</html>
`;

function loadPerformanceData() {
  console.log("📊 Loading performance data...");
  
  const reportPath = ".e18e-report.json";
  if (!existsSync(reportPath)) {
    console.error("❌ Performance report not found");
    process.exit(1);
  }
  
  return JSON.parse(readFileSync(reportPath, "utf8"));
}

function generateDashboard() {
  console.log("🎨 Generating performance dashboard...");
  
  const performanceData = loadPerformanceData();
  
  // Replace template placeholder with actual data
  const dashboard = DASHBOARD_TEMPLATE.replace(
    "{{PERFORMANCE_DATA}}",
    JSON.stringify(performanceData)
  );
  
  // Write dashboard to file
  const dashboardPath = ".performance-dashboard.html";
  writeFileSync(dashboardPath, dashboard);
  
  console.log(`✅ Performance dashboard generated: ${dashboardPath}`);
  console.log("🌐 Open the dashboard in your browser to view performance metrics");
}

// Main execution
async function main() {
  console.log("🚀 Starting Performance Dashboard Generation...\n");
  
  generateDashboard();
  
  console.log("\n📈 Dashboard Features:");
  console.log("  - Real-time performance metrics");
  console.log("  - Package-by-package analysis");
  console.log("  - Performance score visualization");
  console.log("  - Budget compliance tracking");
  console.log("  - Interactive performance monitoring");
}

main().catch(error => {
  console.error("❌ Dashboard generation failed:", error);
  process.exit(1);
});
