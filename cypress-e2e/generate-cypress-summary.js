import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const reportPath = path.join(__dirname, 'cypress/reports');
const videoFolder = 'cypress/videos';
const outputPath = path.join(__dirname, 'cypress-summary.md');

const files = fs.readdirSync(reportPath).filter(file => file.endsWith('.json'));

let table = `| Test Spec File | Status   | Video Link |\n`;
table += `|----------------|----------|-------------|\n`;

files.sort().forEach(file => {
  const fullReport = JSON.parse(fs.readFileSync(path.join(reportPath, file)));

  fullReport.results.forEach(result => {
    const specFile = path.basename(result.file);
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

    table += `| ${specFile} | ${status} | ${videoLink} |\n`;
  });
});

const summary = `### 🧪 Cypress Test Summary

${table}
`;

fs.writeFileSync(outputPath, summary);