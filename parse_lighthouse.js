const fs = require('fs');

try {
  const data = JSON.parse(fs.readFileSync('lighthouse-report.json', 'utf8'));
  const audits = data.audits;
  
  const relevantAudits = [
    'uses-responsive-images',
    'uses-optimized-images',
    'uses-webp-images'
  ];

  console.log("=== Image Optimization Report ===\n");
  
  let totalSavings = 0;

  for (const auditId of relevantAudits) {
    const audit = audits[auditId];
    if (audit && audit.details && audit.details.items && audit.details.items.length > 0) {
      console.log(`\nAudit: ${audit.title}`);
      console.log(`Description: ${audit.description}`);
      console.log(`Overall Savings: ${Math.round((audit.details.overallSavingsBytes || 0) / 1024)} KiB\n`);
      
      audit.details.items.forEach(item => {
        const url = new URL(item.url);
        const filename = url.pathname.split('/').pop();
        
        const currentSize = item.totalBytes ? Math.round(item.totalBytes / 1024) + ' KiB' : 'N/A';
        const wastedSize = item.wastedBytes ? Math.round(item.wastedBytes / 1024) + ' KiB' : 'N/A';
        
        let displayStr = '';
        if (item.wastedPercent) {
           displayStr += `  Wasted %: ${item.wastedPercent.toFixed(1)}%`;
        }
        
        console.log(`- Filename: ${filename}`);
        console.log(`  Current Size: ${currentSize}`);
        console.log(`  Wasted Savings: ${wastedSize}${displayStr}`);
      });
    }
  }
} catch (e) {
  console.error("Error reading or parsing lighthouse-report.json:", e);
}
