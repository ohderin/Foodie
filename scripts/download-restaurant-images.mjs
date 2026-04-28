import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const projectRoot = process.cwd();
const sourceFile = path.join(projectRoot, "src/data/sampleRestaurant.ts");
const outputDir = path.join(projectRoot, "assets/restaurants");
const mapFile = path.join(projectRoot, "src/data/restaurantImageAssets.ts");

function extractRestaurants(content) {
  const restaurants = [];
  const lines = content.split(/\r?\n/);
  let currentId = null;
  let awaitingUrlForId = null;

  for (const rawLine of lines) {
    const line = rawLine.trim();

    const idMatch = line.match(/^id:\s*"([^"]+)",?\s*$/);
    if (idMatch) {
      currentId = idMatch[1];
      continue;
    }

    if (!currentId) continue;

    if (line.startsWith("imageUrl:")) {
      const inlineUrl = line.match(/imageUrl:\s*"([^"]+)"/);
      if (inlineUrl) {
        restaurants.push({ id: currentId, url: inlineUrl[1] });
      } else {
        awaitingUrlForId = currentId;
      }
      continue;
    }

    if (awaitingUrlForId) {
      const nextLineUrl = line.match(/^"([^"]+)",?$/);
      if (nextLineUrl) {
        restaurants.push({ id: awaitingUrlForId, url: nextLineUrl[1] });
      }
      awaitingUrlForId = null;
    }
  }

  const deduped = new Map();
  for (const item of restaurants) {
    deduped.set(item.id, item.url);
  }

  return [...deduped.entries()].map(([id, url]) => ({ id, url }));
}

function extensionFor(contentType, url) {
  if (contentType) {
    if (contentType.includes("image/png")) return "png";
    if (contentType.includes("image/webp")) return "webp";
    if (contentType.includes("image/gif")) return "gif";
    if (contentType.includes("image/jpeg") || contentType.includes("image/jpg")) return "jpg";
  }

  try {
    const pathname = new URL(url).pathname;
    const ext = path.extname(pathname).toLowerCase().replace(".", "");
    if (["jpg", "jpeg", "png", "webp", "gif"].includes(ext)) {
      return ext === "jpeg" ? "jpg" : ext;
    }
  } catch {
    // ignore and fallback
  }

  return "jpg";
}

async function downloadImage(id, url) {
  const res = await fetch(url, {
    headers: {
      "user-agent": "Mozilla/5.0 (compatible; FoodieFinderImageDownloader/1.0)",
      accept: "image/*,*/*;q=0.8",
    },
  });

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }

  const contentType = res.headers.get("content-type") ?? "";
  const ext = extensionFor(contentType, url);
  const bytes = new Uint8Array(await res.arrayBuffer());
  const fileName = `${id}.${ext}`;
  const filePath = path.join(outputDir, fileName);
  await writeFile(filePath, bytes);
  return { id, fileName };
}

function buildMapFile(successful) {
  const lines = [];
  lines.push('import { type ImageSourcePropType } from "react-native";');
  lines.push('import { type Restaurant } from "./sampleRestaurant";');
  lines.push("");
  lines.push(
    "export const DEFAULT_RESTAURANT_IMAGE: ImageSourcePropType = require(\"../../assets/restaurants/raising-canes-sample.jpg\");"
  );
  lines.push("");
  lines.push("export const RESTAURANT_IMAGE_SOURCES: Record<string, ImageSourcePropType> = {");
  for (const { id, fileName } of successful) {
    lines.push(`  "${id}": require("../../assets/restaurants/${fileName}"),`);
  }
  lines.push("};");
  lines.push("");
  lines.push("export function getRestaurantImageSource(restaurant?: Restaurant | null): ImageSourcePropType {");
  lines.push("  if (!restaurant) return DEFAULT_RESTAURANT_IMAGE;");
  lines.push("  const localImage = RESTAURANT_IMAGE_SOURCES[restaurant.id];");
  lines.push("  if (localImage) return localImage;");
  lines.push("  if (restaurant.imageUrl) return { uri: restaurant.imageUrl };");
  lines.push("  return DEFAULT_RESTAURANT_IMAGE;");
  lines.push("}");
  lines.push("");
  return lines.join("\n");
}

async function main() {
  await mkdir(outputDir, { recursive: true });
  const content = await readFile(sourceFile, "utf8");
  const restaurants = extractRestaurants(content);

  const successful = [];
  const failed = [];

  for (const restaurant of restaurants) {
    try {
      const result = await downloadImage(restaurant.id, restaurant.url);
      successful.push(result);
      console.log(`downloaded ${restaurant.id}`);
    } catch (error) {
      failed.push({ id: restaurant.id, url: restaurant.url, reason: String(error) });
      console.log(`failed ${restaurant.id}: ${String(error)}`);
    }
  }

  await writeFile(mapFile, buildMapFile(successful), "utf8");

  console.log(`\nDownloaded ${successful.length}/${restaurants.length} images.`);
  if (failed.length > 0) {
    console.log("Failed IDs:");
    for (const item of failed) {
      console.log(`- ${item.id}`);
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
