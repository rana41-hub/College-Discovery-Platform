import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const saved = await prisma.savedCollege.findMany({
    where: { userId: (session.user as any).id },
    include: { college: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ saved });
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { collegeId } = await request.json();
  if (!collegeId) {
    return NextResponse.json({ error: "collegeId is required" }, { status: 400 });
  }

  try {
    const saved = await prisma.savedCollege.create({
      data: { userId: (session.user as any).id, collegeId },
    });
    return NextResponse.json({ saved }, { status: 201 });
  } catch (error: any) {
    if (error.code === "P2002") {
      return NextResponse.json({ error: "Already saved" }, { status: 409 });
    }
    console.error("POST /api/saved/colleges error:", error);
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }
}
