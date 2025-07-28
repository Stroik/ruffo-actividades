import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function GET() {
  const dir = path.join(process.cwd(), "public", "characters");
  const files = await fs.readdir(dir);
  const images = files
    .filter((f) => /\.(png|jpe?g|png|webp|gif)$/i.test(f))
    .map((f) => `/characters/${f}`);
  return NextResponse.json({ images });
}
