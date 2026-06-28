const fs = require('fs');
const path = require('path');

const pngPath = path.join(__dirname, 'public', 'assets', 'logo.png');
const svgPath = path.join(__dirname, 'public', 'favicon-v5.svg');

try {
  const pngBuffer = fs.readFileSync(pngPath);
  const base64Png = pngBuffer.toString('base64');
  
  // Shifting y to -44 to shift the image up, preventing the bottom of the letters from being cut off.
  const svgContent = `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <clipPath id="squircle">
      <rect x="0" y="0" width="100" height="100" rx="20" ry="20" />
    </clipPath>
  </defs>
  <image xlink:href="data:image/png;base64,${base64Png}" x="-20" y="-44" width="140" height="140" preserveAspectRatio="xMidYMid meet" clip-path="url(#squircle)" />
</svg>`;

  fs.writeFileSync(svgPath, svgContent);
  console.log('Successfully updated favicon-v5.svg with new alignment!');
} catch (err) {
  console.error('Error generating favicon:', err);
}
