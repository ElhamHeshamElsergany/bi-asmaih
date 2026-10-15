import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";

function crc32(buffer) {
  let crc = ~0;
  for (let i = 0; i < buffer.length; i += 1) {
    crc ^= buffer[i];
    for (let bit = 0; bit < 8; bit += 1) {
      crc = (crc >>> 1) ^ (0xedb88320 & -(crc & 1));
    }
  }
  return ~crc >>> 0;
}

function chunk(type, data) {
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length);
  const name = Buffer.from(type);
  const checksum = Buffer.alloc(4);
  checksum.writeUInt32BE(crc32(Buffer.concat([name, data])));
  return Buffer.concat([length, name, data, checksum]);
}

function png(size) {
  const raw = Buffer.alloc((size * 4 + 1) * size);
  const background = [243, 239, 231, 255];
  const ink = [30, 107, 86, 255];
  const center = (size - 1) / 2;
  const outer = size * 0.3;
  const inner = size * 0.13;

  for (let y = 0; y < size; y += 1) {
    const row = y * (size * 4 + 1);
    raw[row] = 0;
    for (let x = 0; x < size; x += 1) {
      const dx = x - center;
      const dy = y - center;
      const distance = Math.hypot(dx, dy);
      const angle = Math.atan2(dy, dx);
      const spokes = 8;
      const wave = Math.cos(spokes * angle);
      const radius = inner + (outer - inner) * (0.55 + 0.45 * wave * wave);
      const disk = distance < size * 0.42;
      const star = distance < radius;
      const color = disk && star ? ink : background;
      const offset = row + 1 + x * 4;
      raw[offset] = color[0];
      raw[offset + 1] = color[1];
      raw[offset + 2] = color[2];
      raw[offset + 3] = color[3];
    }
  }

  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const header = Buffer.alloc(13);
  header.writeUInt32BE(size, 0);
  header.writeUInt32BE(size, 4);
  header[8] = 8;
  header[9] = 6;
  return Buffer.concat([
    signature,
    chunk("IHDR", header),
    chunk("IDAT", zlib.deflateSync(raw)),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

const directory = path.join(process.cwd(), "public");
fs.mkdirSync(directory, { recursive: true });
fs.writeFileSync(path.join(directory, "icon-192.png"), png(192));
fs.writeFileSync(path.join(directory, "icon-512.png"), png(512));
