import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const college = await prisma.college.findUnique({
      where: { id },
      include: {
        courses: true,
        reviews: { orderBy: { createdAt: "desc" } },
      },
    });

    if (!college) {
      return NextResponse.json({ error: "College not found" }, { status: 404 });
    }

    return NextResponse.json({ college });
  } catch (error) {
    console.error(`GET /api/colleges/${params.id} error:`, error);
    return NextResponse.json({ error: "Failed to fetch college" }, { status: 500 });
  }
}
