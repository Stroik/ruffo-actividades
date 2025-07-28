import { resetPool } from "@/utils/shared";
import { NextResponse } from "next/server";

export async function POST() {
  resetPool();
  return NextResponse.json({ ok: true });
}
