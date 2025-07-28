// app/api/characters/shared.ts
import fs from "fs/promises";
import path from "path";

export let allImages: string[] = [];
export let pool: string[] = [];

export async function init() {
  if (allImages.length === 0) {
    const dir = path.join(process.cwd(), "public", "characters");
    const files = await fs.readdir(dir);
    allImages = files
      .filter((f) => /\.(png|jpe?g|gif|webp)$/i.test(f))
      .map((f) => `/characters/${f}`);
    pool = [...allImages];
  }
}

export function resetPool() {
  pool = [...allImages];
}
