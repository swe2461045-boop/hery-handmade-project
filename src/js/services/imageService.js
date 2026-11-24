import { LOCAL_IMAGES_URL } from "../config.js";

let imageMap = {};

export async function loadImages() {
  if (Object.keys(imageMap).length > 0) return;
  const response = await fetch(LOCAL_IMAGES_URL);
  if (!response.ok) {
    throw new Error("Failed to load images.json");
  }
  imageMap = await response.json();
}

export function getImagesByProductCode(productCode) {
  return imageMap[productCode] || [];
}
