const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const inputDir = path.join(__dirname, 'public');

const images = [
  { file: 'owllow_full-stack_developement.png', width: 600 },
  { file: 'owllow_web_developement.png', width: 600 },
  { file: 'owllow_ai_automation.png', width: 600 },
  { file: 'owllow_mobile_app_developement.png', width: 600 },
  { file: 'owllow_logo_transparent_hires.png', height: 200 }, // footer logo is small
];

async function processImages() {
  for (const img of images) {
    const inputPath = path.join(inputDir, img.file);
    const parsed = path.parse(inputPath);
    const outputPath = path.join(inputDir, parsed.name + '.webp');
    
    if (!fs.existsSync(inputPath)) {
      console.log(`Skipping ${img.file}, not found.`);
      continue;
    }

    try {
      let transformer = sharp(inputPath);
      if (img.width && img.height) {
        transformer = transformer.resize(img.width, img.height, { fit: 'inside' });
      } else if (img.width) {
        transformer = transformer.resize({ width: img.width });
      } else if (img.height) {
        transformer = transformer.resize({ height: img.height });
      }

      await transformer
        .webp({ quality: 80, effort: 6 })
        .toFile(outputPath);
      
      console.log(`Successfully processed ${img.file} -> ${parsed.name}.webp`);
    } catch (err) {
      console.error(`Error processing ${img.file}:`, err);
    }
  }
}

processImages();
