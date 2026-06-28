const fs = require('fs');
const path = require('path');

const pngPath = path.join(__dirname, 'public', 'assets', 'logo.png');
const svgPath = path.join(__dirname, 'public', 'favicon-v5.svg');

try {
  const pngBuffer = fs.readFileSync(pngPath);
  const base64Png = pngBuffer.toString('base64');
  
  const svgContent = `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <clipPath id="squircle">
      <rect x="0" y="0" width="100" height="100" rx="20" ry="20" />
    </clipPath>
  </defs>
  <!-- 
    Favicon v5: Perfect high-zoom and vertically shifted to center the text and avoid cropping.
    We are generating this directly from the source logo.png to ensure no base64 corruption.
  -->
  <image xlink:href="data:image/png;base64,${base64Png}" x="-22" y="-38" width="144" height="144" preserveAspectRatio="xMidYMid meet" clip-path="url(#squircle)" />
</svg>`;

  fs.writeFileSync(svgPath, svgContent);
  console.log('Successfully generated favicon-v5.svg!');
} catch (err) {
  console.error('Error generating favicon:', err);
}
