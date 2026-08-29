import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const search = searchParams.get("search") || undefined;
    const location = searchParams.get("location") || undefined;
    const minFees = searchParams.get("minFees");
    const maxFees = searchParams.get("maxFees");
    const minRating = searchParams.get("minRating");
    const sortBy = searchParams.get("sortBy") || "rating";
    const sortOrder = searchParams.get("sortOrder") === "asc" ? "asc" : "desc";

    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const limit = Math.min(50, parseInt(searchParams.get("limit") || "12", 10));
    const skip = (page - 1) * limit;

    const where: any = {};

    if (search) {
      where.name = { contains: search, mode: "insensitive" };
    }

    if (location) {
      where.location = { contains: location, mode: "insensitive" };
    }

    if (minFees || maxFees) {
      where.fees = {};
      if (minFees) where.fees.gte = parseInt(minFees, 10);
      if (maxFees) where.fees.lte = parseInt(maxFees, 10);
    }

    if (minRating) {
      where.rating = { gte: parseFloat(minRating) };
    }

    const allowedSortFields = ["rating", "fees", "name"];
    const safeSortBy = allowedSortFields.includes(sortBy) ? sortBy : "rating";

    const [colleges, total] = await Promise.all([
      prisma.college.findMany({
        where,
        orderBy: { [safeSortBy]: sortOrder },
        skip,
        take: limit,
      }),
      prisma.college.count({ where }),
    ]);

    return NextResponse.json({
      colleges,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("GET /api/colleges error:", error);
    return NextResponse.json({ error: "Failed to fetch colleges" }, { status: 500 });
  }
}
