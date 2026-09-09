const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, 'out');
const oldNextDir = path.join(outDir, '_next');
const newNextDir = path.join(outDir, 'assets');

// 1. Rename _next to assets
if (fs.existsSync(oldNextDir)) {
    fs.renameSync(oldNextDir, newNextDir);
    console.log('Renamed _next to assets');
}

// 2. Recursively find and replace '/_next/' with '/assets/' in all HTML, JS, CSS files
function replaceInFiles(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
            replaceInFiles(filePath);
        } else {
            const ext = path.extname(filePath);
            if (['.html', '.js', '.css', '.json'].includes(ext)) {
                let content = fs.readFileSync(filePath, 'utf8');
                if (content.includes('/_next/')) {
                    content = content.replace(/\/_next\//g, '/assets/');
                    // Also replace escaped versions if any
                    content = content.replace(/\\\/_next\\\//g, '\\/assets\\/');
                    fs.writeFileSync(filePath, content, 'utf8');
                    console.log(`Updated paths in ${filePath}`);
                }
            }
        }
    }
}

replaceInFiles(outDir);
console.log('Done!');
