import { DATA_MODE, LOCAL_PRODUCTS_URL, API_PRODUCTS_URL } from "../config.js";

let productCache = null;

export async function getProductsData() {
  if (productCache) {
    return productCache;
  }
  const url = DATA_MODE === "api" ? API_PRODUCTS_URL : LOCAL_PRODUCTS_URL;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to load products.json");
  }
  const data = await response.json();
  productCache = data;
  return data;
}
