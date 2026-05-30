import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const materialId = parseInt(id, 10);
    
    if (isNaN(materialId)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    await prisma.material.delete({
      where: { id: materialId },
    });
    
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error deleting material:", error);
    return NextResponse.json({ error: "Failed to delete material" }, { status: 500 });
  }
}
