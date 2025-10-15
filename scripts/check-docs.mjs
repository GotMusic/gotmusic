#!/usr/bin/env node

/**
 * Documentation Validator
 * 
 * Validates that all docs in _manifest.yaml:
 * 1. Exist at the specified paths
 * 2. Have required front-matter metadata
 * 3. Match the validation rules in the manifest
 */

import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import yaml from 'yaml';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PROJECT_ROOT = join(__dirname, '..');
const DOCS_DIR = join(PROJECT_ROOT, 'docs.d');
const MANIFEST_PATH = join(DOCS_DIR, '_manifest.yaml');

// ANSI color codes
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function parseYamlFrontMatter(content) {
  const frontMatterRegex = /^---\r?\n([\s\S]*?)\r?\n---/;
  const match = content.match(frontMatterRegex);
  
  if (!match) {
    return null;
  }
  
  try {
    return yaml.parse(match[1]);
  } catch (error) {
    return null;
  }
}

function validateDoc(doc, manifest) {
  const errors = [];
  const warnings = [];
  
  // Check if file exists
  const filePath = join(DOCS_DIR, doc.path);
  if (!existsSync(filePath)) {
    errors.push(`File not found: ${doc.path}`);
    return { errors, warnings };
  }
  
  // Read file and parse front-matter
  const content = readFileSync(filePath, 'utf-8');
  const frontMatter = parseYamlFrontMatter(content);
  
  if (!frontMatter) {
    errors.push(`Missing front-matter in ${doc.path}`);
    return { errors, warnings };
  }
  
  // Validate required fields
  const requiredFields = manifest.validation?.required_fields || [];
  for (const field of requiredFields) {
    if (!frontMatter[field]) {
      errors.push(`Missing required field '${field}' in ${doc.path}`);
    }
  }
  
  // Validate status
  const validStatuses = manifest.validation?.valid_statuses || [];
  if (frontMatter.status && !validStatuses.includes(frontMatter.status)) {
    errors.push(`Invalid status '${frontMatter.status}' in ${doc.path}. Valid: ${validStatuses.join(', ')}`);
  }
  
  // Validate owner format
  const ownerFormat = manifest.validation?.owner_format;
  if (ownerFormat && frontMatter.owner && !frontMatter.owner.startsWith('@')) {
    warnings.push(`Owner '${frontMatter.owner}' in ${doc.path} should start with '@' (e.g., @username)`);
  }
  
  // Validate date format
  const dateFormat = manifest.validation?.date_format;
  if (dateFormat === 'YYYY-MM-DD' && frontMatter.updated) {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(frontMatter.updated)) {
      errors.push(`Invalid date format '${frontMatter.updated}' in ${doc.path}. Expected YYYY-MM-DD`);
    }
  }
  
  // Check if front-matter ID matches manifest ID
  if (frontMatter.id && frontMatter.id !== doc.id) {
    warnings.push(`Front-matter ID '${frontMatter.id}' doesn't match manifest ID '${doc.id}' in ${doc.path}`);
  }
  
  return { errors, warnings };
}

function main() {
  log('\n📚 Validating GotMusic documentation...\n', 'cyan');
  
  // Check if manifest exists
  if (!existsSync(MANIFEST_PATH)) {
    log('❌ Manifest not found: docs.d/_manifest.yaml', 'red');
    process.exit(1);
  }
  
  // Parse manifest
  let manifest;
  try {
    const manifestContent = readFileSync(MANIFEST_PATH, 'utf-8');
    manifest = yaml.parse(manifestContent);
  } catch (error) {
    log(`❌ Failed to parse manifest: ${error.message}`, 'red');
    process.exit(1);
  }
  
  if (!manifest.docs || !Array.isArray(manifest.docs)) {
    log('❌ Invalid manifest: missing or invalid "docs" array', 'red');
    process.exit(1);
  }
  
  log(`Found ${manifest.docs.length} docs in manifest\n`, 'blue');
  
  // Validate each doc
  let totalErrors = 0;
  let totalWarnings = 0;
  const results = [];
  
  for (const doc of manifest.docs) {
    const { errors, warnings } = validateDoc(doc, manifest);
    
    if (errors.length > 0 || warnings.length > 0) {
      results.push({
        doc,
        errors,
        warnings,
      });
    }
    
    totalErrors += errors.length;
    totalWarnings += warnings.length;
  }
  
  // Print results
  if (results.length === 0) {
    log('✅ All docs validated successfully!\n', 'green');
    process.exit(0);
  }
  
  log('📋 Validation results:\n', 'yellow');
  
  for (const { doc, errors, warnings } of results) {
    log(`  ${doc.id} (${doc.path})`, 'cyan');
    
    for (const error of errors) {
      log(`    ❌ ${error}`, 'red');
    }
    
    for (const warning of warnings) {
      log(`    ⚠️  ${warning}`, 'yellow');
    }
    
    console.log();
  }
  
  // Summary
  log('─'.repeat(50), 'blue');
  log(`Total errors: ${totalErrors}`, totalErrors > 0 ? 'red' : 'green');
  log(`Total warnings: ${totalWarnings}`, totalWarnings > 0 ? 'yellow' : 'green');
  log('─'.repeat(50) + '\n', 'blue');
  
  if (totalErrors > 0) {
    log('❌ Documentation validation failed\n', 'red');
    process.exit(1);
  }
  
  if (totalWarnings > 0) {
    log('⚠️  Documentation validation passed with warnings\n', 'yellow');
  } else {
    log('✅ Documentation validation passed\n', 'green');
  }
  
  process.exit(0);
}

main();

