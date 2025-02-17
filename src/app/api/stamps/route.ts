import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const stamps = await prisma.stamp.findMany();
  return NextResponse.json(stamps.map(stamp => stamp.unitPrice));
}