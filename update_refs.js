const fs = require('fs');
const path = require('path');

const filesToUpdate = [
  path.join(__dirname, 'lib', 'data.ts'),
  path.join(__dirname, 'lib', 'about-data.ts')
];

const replacements = [
  'owllow_DABA Engineering Limited.png',
  'owllow_visitxl_web.png',
  'owllow_Consoltix Engineering.png',
  'owllow_tit-jaffna.png',
  'owllow_visitxl.png'
];

filesToUpdate.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;
    
    replacements.forEach(img => {
      const webpImg = img.replace('.png', '.webp');
      if (content.includes(img)) {
        // use regex to replace all instances
        const regex = new RegExp(img.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
        content = content.replace(regex, webpImg);
        changed = true;
      }
    });

    if (changed) {
      fs.writeFileSync(file, content, 'utf8');
      console.log(`Updated: ${file}`);
    }
  }
});
