import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const comparisons = await prisma.savedComparison.findMany({
    where: { userId: (session.user as any).id },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ comparisons });
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { collegeIds } = await request.json();

  if (!Array.isArray(collegeIds) || collegeIds.length < 2 || collegeIds.length > 3) {
    return NextResponse.json(
      { error: "collegeIds must contain 2-3 items" },
      { status: 400 }
    );
  }

  const comparison = await prisma.savedComparison.create({
    data: { userId: (session.user as any).id, collegeIds },
  });

  return NextResponse.json({ comparison }, { status: 201 });
}
