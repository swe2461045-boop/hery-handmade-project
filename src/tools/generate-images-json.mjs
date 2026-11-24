import fs from "fs";
import path from "path";

const projectRoot = process.cwd();
const imageDir = path.join(projectRoot, "src", "img", "products");
const outputFile = path.join(projectRoot, "src", "data", "images.json");

function buildImageMap(files) {
  const imageMap = {};
  for (const file of files) {
    const match = file.match(/^([A-Z]\d_\d{3})_\d+\.(jpg|jpeg|png|webp|svg)$/i);
    if (!match) continue;
    const code = match[1];
    if (!imageMap[code]) imageMap[code] = [];
    imageMap[code].push(`./img/products/${file}`);
  }
  return imageMap;
}

if (fs.existsSync(imageDir)) {
  const files = fs.readdirSync(imageDir);
  const map = buildImageMap(files);
  fs.writeFileSync(outputFile, JSON.stringify(map, null, 2), "utf-8");
  console.log("Generated images.json:", Object.keys(map).length);
}
