import { prisma } from "@/db/prisma";
import { NextResponse } from "next/server";

// ✅ GET all products
export async function GET() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(products);
}

// ✅ ADD product (Admin use)
export async function POST(req: Request) {
  const body = await req.json();

  // validate the required fields
  if (!body.name || !body.price || !body.category) {
    return NextResponse.json(
      { error: "Missing required field"},
      { status: 400 }
    );
  }

  // convert price safely 
  const price = Number(body.price);

  if (isNaN(price)) {
    return NextResponse.json(
       { error: "Invalid price"},
      { status: 400 }  
    );
  }

  const product = await prisma.product.create({
    data: {
      name: body.name,
      category: body.category,
      price,
      imageUrl: body.imageUrl,
      description: body.description,
    },
  });

  return NextResponse.json(product);
}