#!/usr/bin/env node

/**
 * e18e Performance Analysis Script for GotMusic Monorepo
 * 
 * Analyzes all packages and apps for performance optimization opportunities
 * following e18e.dev ecosystem performance standards.
 */

import { execSync } from 'child_process';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const PACKAGES = [
  'packages/ui',
  'packages/api', 
  'packages/fixtures',
  'packages/tokens',
  'apps/web',
  'apps/mobile',
  'apps/worker'
];

const PERFORMANCE_BUDGETS = {
  'packages/ui': { bundleSize: '100KB', dependencies: 20 },
  'packages/api': { bundleSize: '50KB', dependencies: 15 },
  'packages/fixtures': { bundleSize: '25KB', dependencies: 10 },
  'packages/tokens': { bundleSize: '50KB', dependencies: 10 },
  'apps/web': { bundleSize: '500KB', dependencies: 30 },
  'apps/mobile': { bundleSize: '200KB', dependencies: 25 },
  'apps/worker': { bundleSize: '100KB', dependencies: 15 }
};

class E18eAnalyzer {
  constructor() {
    this.results = {
      packages: {},
      recommendations: [],
      performance: {},
      summary: {}
    };
  }

  async analyze() {
    console.log('🔍 e18e Performance Analysis Starting...\n');
    
    for (const pkg of PACKAGES) {
      console.log(`📦 Analyzing ${pkg}...`);
      await this.analyzePackage(pkg);
    }
    
    this.generateReport();
    this.generateRecommendations();
    
    console.log('\n✅ e18e Analysis Complete!');
    console.log('📊 Report saved to: .e18e-report.json');
    console.log('📋 Recommendations saved to: .e18e-recommendations.md');
  }

  async analyzePackage(pkg) {
    const packagePath = join(process.cwd(), pkg);
    const packageJsonPath = join(packagePath, 'package.json');
    
    try {
      const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'));
      const dependencies = Object.keys(packageJson.dependencies || {});
      const devDependencies = Object.keys(packageJson.devDependencies || {});
      
      const budget = PERFORMANCE_BUDGETS[pkg];
      
      this.results.packages[pkg] = {
        dependencies: dependencies.length,
        devDependencies: devDependencies.length,
        totalDependencies: dependencies.length + devDependencies.length,
        budget: budget,
        withinBudget: {
          dependencies: dependencies.length <= budget.dependencies,
          devDependencies: devDependencies.length <= budget.dependencies
        },
        dependencies: dependencies,
        devDependencies: devDependencies,
        potentialOptimizations: this.findOptimizations(dependencies, devDependencies)
      };
      
      console.log(`  ✅ ${dependencies.length} dependencies, ${devDependencies.length} devDependencies`);
      
    } catch (error) {
      console.log(`  ❌ Error analyzing ${pkg}: ${error.message}`);
    }
  }

  findOptimizations(dependencies, devDependencies) {
    const optimizations = [];
    
    // Common performance optimizations
    const replacements = {
      'lodash': 'ramda',
      'moment': 'date-fns', 
      'chalk': 'picocolors',
      'uuid': 'nanoid',
      'axios': 'fetch',
      'joi': 'zod',
      'fs-extra': 'node:fs/promises'
    };
    
    for (const [old, replacement] of Object.entries(replacements)) {
      if (dependencies.includes(old) || devDependencies.includes(old)) {
        optimizations.push({
          from: old,
          to: replacement,
          reason: `Replace ${old} with ${replacement} for better performance`,
          impact: 'high'
        });
      }
    }
    
    return optimizations;
  }

  generateReport() {
    const report = {
      timestamp: new Date().toISOString(),
      summary: this.calculateSummary(),
      packages: this.results.packages,
      performance: this.calculatePerformanceMetrics()
    };
    
    writeFileSync('.e18e-report.json', JSON.stringify(report, null, 2));
  }

  calculateSummary() {
    const totalPackages = Object.keys(this.results.packages).length;
    const packagesWithinBudget = Object.values(this.results.packages)
      .filter(pkg => pkg.withinBudget.dependencies && pkg.withinBudget.devDependencies)
      .length;
    
    const totalOptimizations = Object.values(this.results.packages)
      .reduce((sum, pkg) => sum + pkg.potentialOptimizations.length, 0);
    
    return {
      totalPackages,
      packagesWithinBudget,
      packagesOverBudget: totalPackages - packagesWithinBudget,
      totalOptimizations,
      performanceScore: Math.round((packagesWithinBudget / totalPackages) * 100)
    };
  }

  calculatePerformanceMetrics() {
    const metrics = {};
    
    for (const [pkg, data] of Object.entries(this.results.packages)) {
      metrics[pkg] = {
        dependencyScore: Math.max(0, 100 - (data.totalDependencies / data.budget.dependencies) * 100),
        optimizationOpportunities: data.potentialOptimizations.length,
        recommendations: data.potentialOptimizations.map(opt => opt.reason)
      };
    }
    
    return metrics;
  }

  generateRecommendations() {
    let recommendations = '# e18e Performance Recommendations\n\n';
    recommendations += `Generated: ${new Date().toISOString()}\n\n`;
    
    recommendations += '## Summary\n\n';
    const summary = this.calculateSummary();
    recommendations += `- **Total Packages**: ${summary.totalPackages}\n`;
    recommendations += `- **Within Budget**: ${summary.packagesWithinBudget}\n`;
    recommendations += `- **Over Budget**: ${summary.packagesOverBudget}\n`;
    recommendations += `- **Performance Score**: ${summary.performanceScore}%\n`;
    recommendations += `- **Total Optimizations**: ${summary.totalOptimizations}\n\n`;
    
    recommendations += '## Package Analysis\n\n';
    
    for (const [pkg, data] of Object.entries(this.results.packages)) {
      recommendations += `### ${pkg}\n\n`;
      recommendations += `- **Dependencies**: ${data.dependencies.length}/${data.budget.dependencies}\n`;
      recommendations += `- **Dev Dependencies**: ${data.devDependencies.length}\n`;
      recommendations += `- **Within Budget**: ${data.withinBudget.dependencies ? '✅' : '❌'}\n\n`;
      
      if (data.potentialOptimizations.length > 0) {
        recommendations += '**Optimization Opportunities:**\n\n';
        for (const opt of data.potentialOptimizations) {
          recommendations += `- Replace \`${opt.from}\` with \`${opt.to}\` - ${opt.reason}\n`;
        }
        recommendations += '\n';
      }
    }
    
    recommendations += '## Next Steps\n\n';
    recommendations += '1. Run `npx @e18e/cli migrate --interactive` to apply optimizations\n';
    recommendations += '2. Update dependencies to modern alternatives\n';
    recommendations += '3. Implement performance monitoring\n';
    recommendations += '4. Set up CI performance budgets\n';
    
    writeFileSync('.e18e-recommendations.md', recommendations);
  }
}

// Run analysis
const analyzer = new E18eAnalyzer();
analyzer.analyze().catch(console.error);
