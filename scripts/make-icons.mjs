import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const appDir = path.join(root, "src", "app");
const publicDir = path.join(root, "public");

const defs = `
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#23806a"/>
      <stop offset="1" stop-color="#0d3f32"/>
    </linearGradient>
    <linearGradient id="gold" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#f3dca6"/>
      <stop offset="1" stop-color="#c8994f"/>
    </linearGradient>
  </defs>`;

// Mihrab arch framing an open book, on a 64x64 grid.
const mark = `
  <g fill="none" stroke="url(#gold)" stroke-linejoin="round" stroke-linecap="round">
    <path d="M17 50V29.5C17 21 24.5 15.5 32 11.5C39.5 15.5 47 21 47 29.5V50" stroke-width="2.6"/>
    <path d="M22.5 50V30.5C22.5 24.5 27.5 20.5 32 18C36.5 20.5 41.5 24.5 41.5 30.5V50" stroke-width="1.3" stroke-opacity="0.6"/>  </g>
  <g fill="url(#gold)" stroke="#0f4536" stroke-width="0.9" stroke-linejoin="round">
    <path d="M32 34.6C29.6 33 26.8 32.8 24.7 33.5V43C26.8 42.2 29.6 42.5 32 44.1Z"/>
    <path d="M32 34.6C34.4 33 37.2 32.8 39.3 33.5V43C37.2 42.2 34.4 42.5 32 44.1Z"/>
  </g>`;

function iconSvg({ rounded = true, scale = 1 } = {}) {
  const offset = 32 - 32 * scale;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">${defs}
  <rect width="64" height="64" rx="${rounded ? 15 : 0}" fill="url(#bg)"/>
  <g transform="translate(${offset} ${offset}) scale(${scale})">${mark}</g>
</svg>
`;
}

function archTile(x, y, opacity) {
  return `<path transform="translate(${x} ${y})" opacity="${opacity}" d="M20 100V55C20 38 36 26 50 18C64 26 80 38 80 55V100"/>`;
}

function ogSvg() {
  const tiles = [];
  for (let row = 0; row < 7; row += 1) {
    for (let col = 0; col < 13; col += 1) {
      tiles.push(archTile(col * 100 - 20, row * 100 - 40, 0.09));
    }
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="og-bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#1c7660"/>
      <stop offset="1" stop-color="#0b3328"/>
    </linearGradient>
    <linearGradient id="og-gold" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#f3dca6"/>
      <stop offset="1" stop-color="#c8994f"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#og-bg)"/>
  <g fill="none" stroke="#f3dca6" stroke-width="1.4">${tiles.join("")}</g>
  <rect x="36" y="36" width="1128" height="558" rx="36" fill="none" stroke="url(#og-gold)" stroke-opacity="0.55" stroke-width="2"/>
  <svg x="90" y="155" width="320" height="320" viewBox="0 0 64 64">${defs}
    <rect width="64" height="64" rx="15" fill="url(#bg)" stroke="#f3dca6" stroke-opacity="0.35" stroke-width="0.6"/>
    ${mark}
  </svg>
  <g font-family="Segoe UI, Tahoma, Arial, sans-serif" text-anchor="start" direction="rtl">
    <text x="1110" y="270" font-size="120" font-weight="700" fill="url(#og-gold)">اعرف ربك</text>
    <text x="1110" y="360" font-size="44" fill="#f6f1e8">تعلّم أسماء الله وصفاته ببساطة</text>
    <text x="1110" y="420" font-size="44" fill="#f6f1e8">ومن مصدر يمكنك الرجوع إليه</text>
    <text x="1110" y="500" font-size="30" fill="#f3dca6" fill-opacity="0.9">كل معلومة موثّقة بالكتاب ورقم الصفحة</text>
  </g>
</svg>
`;
}

async function png(svg, size) {
  return sharp(Buffer.from(svg), { density: 600 }).resize(size, size).png().toBuffer();
}

function ico(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);
  const entries = [];
  let offset = 6 + images.length * 16;
  for (const { size, data } of images) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size >= 256 ? 0 : size, 0);
    entry.writeUInt8(size >= 256 ? 0 : size, 1);
    entry.writeUInt8(0, 2);
    entry.writeUInt8(0, 3);
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(data.length, 8);
    entry.writeUInt32LE(offset, 12);
    entries.push(entry);
    offset += data.length;
  }
  return Buffer.concat([header, ...entries, ...images.map((image) => image.data)]);
}

fs.mkdirSync(publicDir, { recursive: true });

const rounded = iconSvg();
const fullBleed = iconSvg({ rounded: false });
const maskable = iconSvg({ rounded: false, scale: 0.78 });

fs.writeFileSync(path.join(appDir, "icon.svg"), rounded);
fs.writeFileSync(path.join(publicDir, "logo.svg"), rounded);

const favicons = await Promise.all([16, 32, 48].map(async (size) => ({ size, data: await png(rounded, size) })));
fs.writeFileSync(path.join(appDir, "favicon.ico"), ico(favicons));

fs.writeFileSync(path.join(appDir, "apple-icon.png"), await png(fullBleed, 180));
fs.writeFileSync(path.join(publicDir, "icon-192.png"), await png(rounded, 192));
fs.writeFileSync(path.join(publicDir, "icon-512.png"), await png(rounded, 512));
fs.writeFileSync(path.join(publicDir, "icon-maskable-512.png"), await png(maskable, 512));

const og = await sharp(Buffer.from(ogSvg())).png().toBuffer();
fs.writeFileSync(path.join(appDir, "opengraph-image.png"), og);
fs.writeFileSync(path.join(appDir, "twitter-image.png"), og);

console.log("icons written");
