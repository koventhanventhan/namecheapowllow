const fs = require('fs');

if (fs.existsSync('./lighthouse_report_final.json')) {
  const data = JSON.parse(fs.readFileSync('./lighthouse_report_final.json', 'utf8'));
  
  const imageAudit = data.audits['uses-optimized-images'];
  if (imageAudit) {
    console.log(`Image Savings (uses-optimized-images): ${imageAudit.displayValue}`);
    if (imageAudit.details && imageAudit.details.items) {
      imageAudit.details.items.forEach(item => {
        console.log(`- ${item.url}: ${(item.wastedBytes / 1024).toFixed(2)} KiB wasted`);
      });
    }
  } else {
    console.log('No uses-optimized-images audit found.');
  }

  const responsiveAudit = data.audits['uses-responsive-images'];
  if (responsiveAudit) {
    console.log(`\nResponsive Image Savings (uses-responsive-images): ${responsiveAudit.displayValue}`);
    if (responsiveAudit.details && responsiveAudit.details.items) {
      responsiveAudit.details.items.forEach(item => {
        console.log(`- ${item.url}: ${(item.wastedBytes / 1024).toFixed(2)} KiB wasted`);
      });
    }
  }

} else {
  console.log("No report found yet.");
}
