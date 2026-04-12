import { prisma } from "@/db/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const category = searchParams.get("category");
    const search = searchParams.get("search");

    // New pagination params 
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "8");
    const skip = (page - 1) * limit;

    // build filters dynamically
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const filters: any = {};

    if (category && category !== "all") {
      filters.category = category;
    }

    if (search) {
      filters.name = {
        contains: search,
        mode: "insensitive",
      };
    }

    // fetch products
    const products = await prisma.product.findMany({
      where: filters,
      skip,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
    });

    // total count (for pagination UI)
    const total = await prisma.product.count({
      where: filters,
    })

    return NextResponse.json({
      products,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });

  } catch (error) {
    console.error("PRODUCT FETCH ERROR:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}