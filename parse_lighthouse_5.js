const fs = require('fs');
const data = JSON.parse(fs.readFileSync('lighthouse-report.json', 'utf8'));

let report = "=== Improve Image Delivery Audit ===\n\n";

// In Lighthouse 10+, the "Improve image delivery" audit is usually 'optimized-images' or 'modern-image-formats' or 'image-size-responsive'.
// Let's find the audit titled "Improve image delivery" or similar.
const targetAudit = Object.values(data.audits).find(a => a.title.includes('Improve image delivery') || a.id.includes('image'));

for (const key of Object.keys(data.audits)) {
  const audit = data.audits[key];
  if (audit.title === 'Improve image delivery' || key === 'optimized-images' || key === 'modern-image-formats' || key === 'image-size-responsive' || audit.title.includes('image') || audit.title.includes('Image')) {
    if (audit.details && audit.details.items && audit.details.items.length > 0) {
      report += `Audit: ${audit.title} (${key})\n`;
      audit.details.items.forEach(item => {
        if (!item.url) return;
        const filename = new URL(item.url).pathname.split('/').pop();
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
        
        report += `- Filename: ${filename}\n`;
        report += `  Current Size: ${currentSize}\n`;
        report += `  Displayed Size: ${displayedSize}\n`;
        report += `  Wasted Bytes: ${wastedSize}\n\n`;
      });
    }
  }
}

fs.writeFileSync('lighthouse_image_report.txt', report, 'utf8');
