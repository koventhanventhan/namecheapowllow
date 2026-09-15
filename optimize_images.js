const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');

async function optimizeImages() {
  console.log("Starting image optimization...");

  try {
    // 1. Logo
    const logoFile = path.join(publicDir, 'owllow_logo_finals.png');
    const logoOut = path.join(publicDir, 'owllow_logo_finals.webp');
    if (fs.existsSync(logoFile)) {
      await sharp(logoFile)
        .resize({ width: 300, withoutEnlargement: true }) // Max 300px wide
        .webp({ quality: 80 })
        .toFile(logoOut);
      console.log(`Optimized logo: ${logoOut}`);
    } else {
      console.warn(`Logo not found: ${logoFile}`);
    }

    // 2. Project Screenshots
    const projects = [
      'owllow_DABA Engineering Limited.png',
      'owllow_visitxl_web.png',
      'owllow_Consoltix Engineering.png',
      'owllow_tit-jaffna.png',
      'owllow_visitxl.png'
    ];

    for (const filename of projects) {
      const inFile = path.join(publicDir, filename);
      const outFilename = filename.replace('.png', '.webp');
      const outFile = path.join(publicDir, outFilename);
      
      if (fs.existsSync(inFile)) {
        await sharp(inFile)
          .resize(400, 300, { fit: 'cover' })
          .webp({ quality: 80 })
          .toFile(outFile);
        console.log(`Optimized project: ${outFile}`);
      } else {
        console.warn(`Project image not found: ${inFile}`);
      }
    }

    console.log("Image optimization complete.");
  } catch (error) {
    console.error("Error optimizing images:", error);
  }
}

optimizeImages();
