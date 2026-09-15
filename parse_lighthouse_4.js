const fs = require('fs');
const data = JSON.parse(fs.readFileSync('lighthouse-report.json', 'utf8'));

const relevantAudits = ['uses-responsive-images', 'uses-optimized-images', 'uses-webp-images'];
const report = [];

for (const auditId of relevantAudits) {
  const audit = data.audits[auditId];
  if (audit && audit.details && audit.details.items) {
    audit.details.items.forEach(item => {
      const url = item.url ? new URL(item.url).pathname.split('/').pop() : 'unknown';
      const currentSize = item.totalBytes ? Math.round(item.totalBytes / 1024) + ' KiB' : 'N/A';
      const wastedSize = item.wastedBytes ? Math.round(item.wastedBytes / 1024) + ' KiB' : 'N/A';
      
      let displayedSize = 'N/A';
      if (item.subItems && item.subItems.items) {
        item.subItems.items.forEach(sub => {
          if (sub.reason && sub.reason.includes('displayed dimensions')) {
             const match = sub.reason.match(/displayed dimensions \(([^)]+)\)/);
             if (match) displayedSize = match[1];
          }
        });
      }
      
      report.push({
        audit: audit.title,
        filename: url,
        currentSize,
        displayedSize,
        wastedSize
      });
    });
  }
}

console.log(JSON.stringify(report, null, 2));
