import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const idsParam = request.nextUrl.searchParams.get("ids");

    if (!idsParam) {
      return NextResponse.json({ error: "No college ids provided" }, { status: 400 });
    }

    const ids = idsParam.split(",").filter(Boolean);

    if (ids.length < 2 || ids.length > 3) {
      return NextResponse.json(
        { error: "Compare requires 2 or 3 college ids" },
        { status: 400 }
      );
    }

    const colleges = await prisma.college.findMany({
      where: { id: { in: ids } },
    });

    const ordered = ids
      .map((id) => colleges.find((c) => c.id === id))
      .filter(Boolean);

    return NextResponse.json({ colleges: ordered });
  } catch (error) {
    console.error("GET /api/colleges/compare error:", error);
    return NextResponse.json({ error: "Failed to fetch comparison" }, { status: 500 });
  }
}
