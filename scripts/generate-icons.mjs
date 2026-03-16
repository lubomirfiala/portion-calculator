import { Resvg } from '@resvg/resvg-js';
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

const logoSvg = readFileSync(join(root, 'src/assets/img/logo_white.svg'), 'utf-8');
const innerPath = logoSvg.match(/<path[^/]+\/>/)[0];

const SIZE = 1024;
// Logo original: 206x220. Fit inside ~60% of icon with equal padding.
const LOGO_W = 614;
const LOGO_H = Math.round(LOGO_W * (220 / 206));
const LOGO_X = (SIZE - LOGO_W) / 2;
const LOGO_Y = (SIZE - LOGO_H) / 2;
const SCALE = LOGO_W / 206;

function makeSvg(bgColor) {
  const bg = bgColor
    ? `<rect width="${SIZE}" height="${SIZE}" fill="${bgColor}"/>`
    : '';
  return `<svg width="${SIZE}" height="${SIZE}" xmlns="http://www.w3.org/2000/svg">
  ${bg}
  <g transform="translate(${LOGO_X.toFixed(2)}, ${LOGO_Y.toFixed(2)}) scale(${SCALE.toFixed(4)})">
    ${innerPath}
  </g>
</svg>`;
}

const variants = [
  { name: 'AppIcon-Light',  bg: '#1868b2' },
  { name: 'AppIcon-Dark',   bg: '#1c1c1e' },
  { name: 'AppIcon-Tinted', bg: null },      // transparent — iOS applies tint
];

const outDir = join(root, 'ios/App/App/Assets.xcassets/AppIcon.appiconset');

for (const { name, bg } of variants) {
  const svg = makeSvg(bg);
  const resvg = new Resvg(svg);
  const png = resvg.render().asPng();
  writeFileSync(join(outDir, `${name}.png`), png);
  console.log(`✓ ${name}.png`);
}
