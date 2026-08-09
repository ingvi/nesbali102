/**
 * Generates the stand-in photography in /public/images.
 *
 * These exist only so the layout reads correctly before the real photographs
 * arrive. Replace them one for one with your own JPGs (keep the file names, or
 * update the paths in content/property.ts) and delete this script.
 *
 *   node scripts/make-placeholders.mjs
 */
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "public", "images");

// Warm neutrals sampled to sit alongside the chalk page background.
const tones = [
  ["#E8E4D9", "#D3CDBE"],
  ["#DFDCD3", "#C7C1B2"],
  ["#EDE9DF", "#D8D2C3"],
  ["#D9D5C9", "#BDB7A6"],
  ["#E4DFD2", "#CBC4B3"],
  ["#EAE7DE", "#D0CABB"],
];

function photo({ w, h, label, tone }) {
  const [a, b] = tones[tone % tones.length];
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${label}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="0.7" y2="1">
      <stop offset="0" stop-color="${a}"/>
      <stop offset="1" stop-color="${b}"/>
    </linearGradient>
    <linearGradient id="light" x1="0.15" y1="0" x2="0.75" y2="1">
      <stop offset="0" stop-color="#FFFFFF" stop-opacity="0.55"/>
      <stop offset="0.55" stop-color="#FFFFFF" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#g)"/>
  <rect x="${w * 0.08}" y="0" width="${w * 0.34}" height="${h}" fill="url(#light)"/>
  <rect x="${w * 0.5}" y="${h * 0.18}" width="${w * 0.28}" height="${h * 0.52}" fill="#FFFFFF" opacity="0.28"/>
  <rect x="${w * 0.06}" y="${h * 0.62}" width="${w * 0.3}" height="${h * 0.02}" fill="#211F1A" opacity="0.1"/>
  <text x="${w / 2}" y="${h / 2}" text-anchor="middle" dominant-baseline="middle"
    font-family="Georgia, 'Times New Roman', serif" font-size="${Math.round(Math.min(w, h) * 0.055)}"
    fill="#211F1A" opacity="0.42">${label}</text>
</svg>
`;
}

function plan({ label }) {
  const w = 1200;
  const h = 900;
  const rooms = [
    [80, 80, 520, 380],
    [620, 80, 500, 200],
    [620, 300, 500, 160],
    [80, 490, 300, 330],
    [400, 490, 340, 330],
    [760, 480, 360, 340],
  ];
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${label}">
  <rect width="${w}" height="${h}" fill="#FFFFFF"/>
  ${rooms
    .map(
      ([x, y, rw, rh]) =>
        `<rect x="${x}" y="${y}" width="${rw}" height="${rh}" fill="#F1F0EA" stroke="#211F1A" stroke-width="4"/>`,
    )
    .join("\n  ")}
  <text x="${w / 2}" y="${h - 34}" text-anchor="middle"
    font-family="Helvetica, Arial, sans-serif" font-size="26" letter-spacing="3"
    fill="#211F1A" opacity="0.45">${label.toUpperCase()} — PLACEHOLDER</text>
</svg>
`;
}

const files = [
  ["hero.svg", photo({ w: 2400, h: 1500, label: "Hero photograph", tone: 0 })],
  ["01.svg", photo({ w: 2000, h: 1333, label: "Kitchen and dining", tone: 1 })],
  ["02.svg", photo({ w: 1200, h: 1500, label: "Living room", tone: 2 })],
  ["03.svg", photo({ w: 2000, h: 1333, label: "Hallway and stair", tone: 3 })],
  ["04.svg", photo({ w: 1600, h: 1200, label: "Principal bedroom", tone: 4 })],
  ["05.svg", photo({ w: 1200, h: 1500, label: "Bathroom", tone: 5 })],
  ["06.svg", photo({ w: 2000, h: 1250, label: "Deck and garden", tone: 0 })],
  ["07.svg", photo({ w: 1600, h: 1200, label: "Second bedroom", tone: 2 })],
  ["08.svg", photo({ w: 2000, h: 1333, label: "The house from the street", tone: 3 })],
  ["closing.svg", photo({ w: 1400, h: 1600, label: "Western shore", tone: 4 })],
  ["plan-ground.svg", plan({ label: "Ground floor" })],
  ["plan-upper.svg", plan({ label: "Upper floor" })],
];

await mkdir(outDir, { recursive: true });
await Promise.all(files.map(([name, svg]) => writeFile(join(outDir, name), svg, "utf8")));
console.log(`Wrote ${files.length} placeholder images to public/images`);
