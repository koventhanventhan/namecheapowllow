const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else {
            results.push(file);
        }
    });
    return results;
}

const files = walk('c:/xampp/htdocs/project/components');

files.forEach(file => {
    if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.css')) {
        let content = fs.readFileSync(file, 'utf8');
        let newContent = content
            .replace(/bg-gradient-to-br from-\[#6C5CE7\] to-\[#A855F7\]/g, 'bg-[#E8432E]')
            .replace(/bg-gradient-to-r from-\[#6C5CE7\] to-\[#A855F7\]/g, 'bg-[#E8432E] hover:bg-[#D6392B]')
            .replace(/hover:bg-\[#6C5CE7\]/g, 'hover:bg-[#E8432E]')
            .replace(/from-\[#6C5CE7\] to-\[#A855F7\]/g, 'from-[#E8432E] to-[#D6392B]');
        
        // Also fix the rounded-full for buttons as requested: "BUTTONS: Primary: solid red-orange fill, white text, rounded-full"
        // Most buttons use rounded-md or rounded-lg currently. Let's not blindly replace rounded unless we know it's a button.
        // Actually, if we just replace the color it's fine for now. We can handle rounded-full manually if needed.
        
        if (content !== newContent) {
            fs.writeFileSync(file, newContent, 'utf8');
            console.log(`Updated ${file}`);
        }
    }
});
