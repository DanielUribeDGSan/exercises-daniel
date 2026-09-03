const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const sizes = [72, 96, 128, 144, 152, 384];

const svgBuffer = fs.readFileSync(path.join(__dirname, 'public', 'icon.svg'));

async function generateIcons() {
  for (const size of sizes) {
    const fileName = `icon-${size}x${size}.png`;
    const outputPath = path.join(__dirname, 'public', fileName);
    
    try {
      await sharp(svgBuffer)
        .resize(size, size)
        .png()
        .toFile(outputPath);
      console.log(`✓ Created ${fileName}`);
    } catch (error) {
      console.error(`✗ Error creating ${fileName}:`, error);
    }
  }
  console.log('\nIcon generation complete!');
}

generateIcons();
