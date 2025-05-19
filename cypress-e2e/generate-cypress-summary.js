import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Resolve __dirname for ES module context
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths
const reportPath = path.join(__dirname, 'cypress/reports');
const videoFolder = 'cypress/videos';
const outputPath = path.join(__dirname, 'cypress-summary.md');

// Load all JSON report files
const files = fs.readdirSync(reportPath).filter(file => file.endsWith('.json'));

// Markdown table header
let table = `| Test Spec File | Status   | Video Link |\n`;
table += `|----------------|----------|-------------|\n`;

// Parse each JSON report
files.sort().forEach(file => {
  const fullReport = JSON.parse(fs.readFileSync(path.join(reportPath, file)));

  fullReport.results.forEach(result => {
    const specFile = path.basename(result.file); // e.g., login.cy.js
    const displayName = specFile; // You could simplify this if needed

    let status = '✅ Pass';
    for (const suite of result.suites) {
      for (const test of suite.tests) {
        if (test.state === 'failed') {
          status = '❌ Fail';
          break;
        }
      }
    }

    const videoFileName = specFile.replace(/\.js$/, '.mp4');
    const videoLink = `[📹 ${videoFileName}](./${videoFolder}/${videoFileName})`;

    table += `| ${displayName} | ${status} | ${videoLink} |\n`;
  });
});

// Final markdown summary
const summary = `### 🧪 Cypress Test Summary

${table}

`;

fs.writeFileSync(outputPath, summary);