const fs = require('fs');
const data = JSON.parse(fs.readFileSync('lighthouse-report.json', 'utf8'));

console.log("=== Audits with 'image' in ID ===");
for (const key of Object.keys(data.audits)) {
  if (key.includes('image')) {
    const audit = data.audits[key];
    console.log(`\nAudit: ${key}`);
    console.log(`Details: ${JSON.stringify(audit.details)}`);
  }
}
