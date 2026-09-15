const fs = require('fs');
const data = JSON.parse(fs.readFileSync('lighthouse-report.json', 'utf8'));

console.log("=== All Audits with Savings ===\n");
for (const key of Object.keys(data.audits)) {
  const audit = data.audits[key];
  if (audit.details && audit.details.overallSavingsBytes > 0) {
    console.log(`\nAudit: ${audit.title} (${key})`);
    console.log(`Savings: ${Math.round(audit.details.overallSavingsBytes / 1024)} KiB`);
    if (audit.details.items) {
      audit.details.items.forEach(item => {
        const url = item.url ? new URL(item.url).pathname.split('/').pop() : 'unknown';
        const currentSize = item.totalBytes ? Math.round(item.totalBytes / 1024) + ' KiB' : 'N/A';
        const wastedSize = item.wastedBytes ? Math.round(item.wastedBytes / 1024) + ' KiB' : 'N/A';
        console.log(`- ${url} | Current: ${currentSize} | Wasted: ${wastedSize}`);
      });
    }
  }
}
