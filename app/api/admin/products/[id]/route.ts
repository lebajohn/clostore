import { NextResponse } from "next/server";
import { prisma } from "@/db/prisma";


export async function DELETE(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        await prisma.product.delete({
            where: {
                id: params.id,
            },
        });

        return NextResponse.json({ message: "Deleted" });
    } catch (error) {
        console.error("PRODUCT FETCH ERROR:", error);
        return NextResponse.json(
            { error: "Delete Failed" },
            { status: 500}
        );
    }
}
