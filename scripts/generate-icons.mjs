import sharp from "sharp";

const OUTPUTS = [
  { path: "public/icon-192.png", size: 192 },
  { path: "public/icon-512.png", size: 512 },
  { path: "public/icon-maskable-512.png", size: 512, maskable: true },
];

const background = { r: 11, g: 15, b: 20, alpha: 1 };
const accent = { r: 0, g: 255, b: 180, alpha: 1 };

async function generate() {
  for (const { path, size, maskable } of OUTPUTS) {
    const radius = Math.round(size * (maskable ? 0.35 : 0.4));
    const circle = Buffer.from(
      `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
        <rect width="${size}" height="${size}" fill="rgba(${background.r},${background.g},${background.b},${background.alpha})" rx="${maskable ? size * 0.1 : size * 0.12}" />
        <circle cx="${size / 2}" cy="${size / 2}" r="${radius}" fill="rgba(${accent.r},${accent.g},${accent.b},${accent.alpha})" />
        <text x="50%" y="54%" font-family="'JetBrains Mono', monospace" font-size="${Math.round(size * 0.28)}" fill="rgb(${background.r},${background.g},${background.b})" text-anchor="middle" dominant-baseline="middle">_</text>
      </svg>`
    );

    await sharp(circle)
      .png({ compressionLevel: 9 })
      .toFile(path);
  }
}

generate().catch((error) => {
  console.error("Failed to generate icons", error);
  process.exitCode = 1;
});
