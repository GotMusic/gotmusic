#!/usr/bin/env node

/**
 * Storybook Performance Monitoring Dashboard
 * 
 * Monitors Storybook build performance, bundle sizes, and component metrics
 * following e18e performance standards.
 */

import { execSync } from 'child_process';
import { readFileSync, writeFileSync, existsSync, statSync } from 'fs';
import { join } from 'path';

const PERFORMANCE_BUDGETS = {
  bundleSize: 100, // KB
  buildTime: 30, // seconds
  memoryUsage: 500, // MB
  componentCount: 50,
  storyCount: 200
};

class StorybookPerformanceMonitor {
  constructor() {
    this.metrics = {
      build: {},
      bundle: {},
      components: {},
      performance: {},
      summary: {}
    };
  }

  async monitor() {
    console.log('📊 Storybook Performance Monitoring Starting...\n');
    
    await this.analyzeBuildPerformance();
    await this.analyzeBundleSize();
    await this.analyzeComponents();
    await this.analyzePerformance();
    this.generateSummary();
    this.generateDashboard();
    
    console.log('\n✅ Performance Monitoring Complete!');
    console.log('📊 Dashboard saved to: .storybook-performance-dashboard.html');
    console.log('📋 Report saved to: .storybook-performance-report.json');
  }

  async analyzeBuildPerformance() {
    console.log('🔨 Analyzing build performance...');
    
    const startTime = Date.now();
    
    try {
      // Build UI package
      execSync('yarn workspace @gotmusic/ui build', { stdio: 'pipe' });
      
      // Build Storybook
      execSync('yarn workspace @gotmusic/ui build-storybook', { stdio: 'pipe' });
      
      const endTime = Date.now();
      const buildTime = (endTime - startTime) / 1000;
      
      this.metrics.build = {
        buildTime,
        status: buildTime <= PERFORMANCE_BUDGETS.buildTime ? 'pass' : 'fail',
        budget: PERFORMANCE_BUDGETS.buildTime,
        timestamp: new Date().toISOString()
      };
      
      console.log(`  ✅ Build time: ${buildTime.toFixed(2)}s (budget: ${PERFORMANCE_BUDGETS.buildTime}s)`);
      
    } catch (error) {
      console.log(`  ❌ Build failed: ${error.message}`);
      this.metrics.build = {
        buildTime: 0,
        status: 'fail',
        error: error.message,
        timestamp: new Date().toISOString()
      };
    }
  }

  async analyzeBundleSize() {
    console.log('📦 Analyzing bundle size...');
    
    try {
      // Check if dist directory exists
      const distPath = join(process.cwd(), 'packages/ui/dist');
      if (!existsSync(distPath)) {
        throw new Error('Dist directory not found');
      }
      
      // Analyze bundle files
      const bundleFiles = [
        'index.js',
        'index.cjs',
        'theme/index.js',
        'theme/index.cjs',
        'utils/index.js',
        'utils/index.cjs'
      ];
      
      const bundleSizes = {};
      let totalSize = 0;
      
      for (const file of bundleFiles) {
        const filePath = join(distPath, file);
        if (existsSync(filePath)) {
          const stats = statSync(filePath);
          const sizeKB = stats.size / 1024;
          bundleSizes[file] = sizeKB;
          totalSize += sizeKB;
        }
      }
      
      this.metrics.bundle = {
        totalSize,
        files: bundleSizes,
        status: totalSize <= PERFORMANCE_BUDGETS.bundleSize ? 'pass' : 'fail',
        budget: PERFORMANCE_BUDGETS.bundleSize,
        timestamp: new Date().toISOString()
      };
      
      console.log(`  ✅ Total bundle size: ${totalSize.toFixed(2)}KB (budget: ${PERFORMANCE_BUDGETS.bundleSize}KB)`);
      
    } catch (error) {
      console.log(`  ❌ Bundle analysis failed: ${error.message}`);
      this.metrics.bundle = {
        totalSize: 0,
        status: 'fail',
        error: error.message,
        timestamp: new Date().toISOString()
      };
    }
  }

  async analyzeComponents() {
    console.log('🧩 Analyzing components...');
    
    try {
      // Count story files
      const storyFiles = execSync('find packages/ui/src -name "*.stories.tsx" | wc -l', { encoding: 'utf8' }).trim();
      const storyCount = parseInt(storyFiles);
      
      // Count component files
      const componentFiles = execSync('find packages/ui/src -name "*.tsx" -not -name "*.stories.tsx" | wc -l', { encoding: 'utf8' }).trim();
      const componentCount = parseInt(componentFiles);
      
      this.metrics.components = {
        storyCount,
        componentCount,
        status: storyCount <= PERFORMANCE_BUDGETS.storyCount ? 'pass' : 'fail',
        budget: PERFORMANCE_BUDGETS.storyCount,
        timestamp: new Date().toISOString()
      };
      
      console.log(`  ✅ Components: ${componentCount}, Stories: ${storyCount}`);
      
    } catch (error) {
      console.log(`  ❌ Component analysis failed: ${error.message}`);
      this.metrics.components = {
        storyCount: 0,
        componentCount: 0,
        status: 'fail',
        error: error.message,
        timestamp: new Date().toISOString()
      };
    }
  }

  async analyzePerformance() {
    console.log('⚡ Analyzing performance metrics...');
    
    try {
      // Run e18e analysis
      execSync('yarn perf:analyze', { stdio: 'pipe' });
      
      // Check if e18e report exists
      if (existsSync('.e18e-report.json')) {
        const report = JSON.parse(readFileSync('.e18e-report.json', 'utf8'));
        this.metrics.performance = {
          e18eScore: report.summary.performanceScore,
          packagesAnalyzed: report.summary.totalPackages,
          withinBudget: report.summary.packagesWithinBudget,
          optimizations: report.summary.totalOptimizations,
          status: report.summary.performanceScore >= 90 ? 'pass' : 'fail',
          timestamp: new Date().toISOString()
        };
        
        console.log(`  ✅ e18e Score: ${report.summary.performanceScore}%`);
      } else {
        this.metrics.performance = {
          e18eScore: 0,
          status: 'fail',
          error: 'e18e report not found',
          timestamp: new Date().toISOString()
        };
      }
      
    } catch (error) {
      console.log(`  ❌ Performance analysis failed: ${error.message}`);
      this.metrics.performance = {
        e18eScore: 0,
        status: 'fail',
        error: error.message,
        timestamp: new Date().toISOString()
      };
    }
  }

  generateSummary() {
    const buildStatus = this.metrics.build.status === 'pass' ? '✅' : '❌';
    const bundleStatus = this.metrics.bundle.status === 'pass' ? '✅' : '❌';
    const componentStatus = this.metrics.components.status === 'pass' ? '✅' : '❌';
    const performanceStatus = this.metrics.performance.status === 'pass' ? '✅' : '❌';
    
    this.metrics.summary = {
      overallStatus: [buildStatus, bundleStatus, componentStatus, performanceStatus].every(s => s === '✅') ? 'pass' : 'fail',
      buildTime: this.metrics.build.buildTime,
      bundleSize: this.metrics.bundle.totalSize,
      componentCount: this.metrics.components.componentCount,
      storyCount: this.metrics.components.storyCount,
      e18eScore: this.metrics.performance.e18eScore,
      timestamp: new Date().toISOString()
    };
  }

  generateDashboard() {
    const dashboard = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Storybook Performance Dashboard</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            margin: 0;
            padding: 20px;
            background: #0A0C11;
            color: #E6EAF2;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
        }
        .header {
            text-align: center;
            margin-bottom: 40px;
        }
        .status-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
            margin-bottom: 40px;
        }
        .status-card {
            background: #121520;
            border: 1px solid rgba(255,255,255,0.1);
            border-radius: 12px;
            padding: 20px;
        }
        .status-card h3 {
            margin: 0 0 10px 0;
            color: #5BD0FF;
        }
        .status-indicator {
            display: inline-block;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            margin-right: 8px;
        }
        .status-pass { background: #6AE6A6; }
        .status-fail { background: #F97066; }
        .metrics {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
            margin-top: 20px;
        }
        .metric {
            background: #1A1D29;
            padding: 15px;
            border-radius: 8px;
            text-align: center;
        }
        .metric-value {
            font-size: 24px;
            font-weight: bold;
            color: #5BD0FF;
        }
        .metric-label {
            font-size: 12px;
            color: #A9B1C1;
            margin-top: 5px;
        }
        .budget {
            font-size: 12px;
            color: #A9B1C1;
            margin-top: 5px;
        }
        .footer {
            text-align: center;
            margin-top: 40px;
            color: #A9B1C1;
            font-size: 12px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>📊 Storybook Performance Dashboard</h1>
            <p>Real-time performance monitoring for GotMusic UI components</p>
        </div>
        
        <div class="status-grid">
            <div class="status-card">
                <h3>Build Performance</h3>
                <div>
                    <span class="status-indicator ${this.metrics.build.status === 'pass' ? 'status-pass' : 'status-fail'}"></span>
                    ${this.metrics.build.status === 'pass' ? 'Pass' : 'Fail'}
                </div>
                <div class="metrics">
                    <div class="metric">
                        <div class="metric-value">${this.metrics.build.buildTime?.toFixed(2) || 'N/A'}s</div>
                        <div class="metric-label">Build Time</div>
                        <div class="budget">Budget: ${PERFORMANCE_BUDGETS.buildTime}s</div>
                    </div>
                </div>
            </div>
            
            <div class="status-card">
                <h3>Bundle Size</h3>
                <div>
                    <span class="status-indicator ${this.metrics.bundle.status === 'pass' ? 'status-pass' : 'status-fail'}"></span>
                    ${this.metrics.bundle.status === 'pass' ? 'Pass' : 'Fail'}
                </div>
                <div class="metrics">
                    <div class="metric">
                        <div class="metric-value">${this.metrics.bundle.totalSize?.toFixed(2) || 'N/A'}KB</div>
                        <div class="metric-label">Total Size</div>
                        <div class="budget">Budget: ${PERFORMANCE_BUDGETS.bundleSize}KB</div>
                    </div>
                </div>
            </div>
            
            <div class="status-card">
                <h3>Components</h3>
                <div>
                    <span class="status-indicator ${this.metrics.components.status === 'pass' ? 'status-pass' : 'status-fail'}"></span>
                    ${this.metrics.components.status === 'pass' ? 'Pass' : 'Fail'}
                </div>
                <div class="metrics">
                    <div class="metric">
                        <div class="metric-value">${this.metrics.components.componentCount || 'N/A'}</div>
                        <div class="metric-label">Components</div>
                    </div>
                    <div class="metric">
                        <div class="metric-value">${this.metrics.components.storyCount || 'N/A'}</div>
                        <div class="metric-label">Stories</div>
                    </div>
                </div>
            </div>
            
            <div class="status-card">
                <h3>Performance</h3>
                <div>
                    <span class="status-indicator ${this.metrics.performance.status === 'pass' ? 'status-pass' : 'status-fail'}"></span>
                    ${this.metrics.performance.status === 'pass' ? 'Pass' : 'Fail'}
                </div>
                <div class="metrics">
                    <div class="metric">
                        <div class="metric-value">${this.metrics.performance.e18eScore || 'N/A'}%</div>
                        <div class="metric-label">e18e Score</div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="footer">
            <p>Generated: ${new Date().toISOString()}</p>
            <p>Following e18e performance standards - Cleanup, Speedup, Levelup</p>
        </div>
    </div>
</body>
</html>`;
    
    writeFileSync('.storybook-performance-dashboard.html', dashboard);
  }

  generateReport() {
    const report = {
      timestamp: new Date().toISOString(),
      metrics: this.metrics,
      budgets: PERFORMANCE_BUDGETS,
      recommendations: this.generateRecommendations()
    };
    
    writeFileSync('.storybook-performance-report.json', JSON.stringify(report, null, 2));
  }

  generateRecommendations() {
    const recommendations = [];
    
    if (this.metrics.build.buildTime > PERFORMANCE_BUDGETS.buildTime) {
      recommendations.push('Optimize build process to reduce build time');
    }
    
    if (this.metrics.bundle.totalSize > PERFORMANCE_BUDGETS.bundleSize) {
      recommendations.push('Reduce bundle size by optimizing imports and code splitting');
    }
    
    if (this.metrics.performance.e18eScore < 90) {
      recommendations.push('Improve e18e performance score by optimizing dependencies');
    }
    
    return recommendations;
  }
}

// Run monitoring
const monitor = new StorybookPerformanceMonitor();
monitor.monitor().catch(console.error);
