import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/db/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { name, price, category, description, image } = body;

    if (!name || !price || !category || !image) {
      return NextResponse.json(
        { error: "Missing fields" },
        { status: 400 }
      );
    }

    const product = await prisma.product.create({
      data: {
        name,
        price: Number(price),
        category,
        description,
        image,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error("PRODUCT FETCH ERROR:", error);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}