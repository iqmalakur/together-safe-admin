import { getPrismaClient } from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = await params;
  const body = await req.json();
  const { status } = body;

  if (!status) {
    return NextResponse.json({ error: "Status is required" }, { status: 400 });
  }

  try {
    const prisma = getPrismaClient();
    const updated = await prisma.$executeRaw`
      UPDATE "Incident"
        SET status = ${status}::"IncidentStatus"
      WHERE id = ${id}::uuid
    `;

    return NextResponse.json({ message: "Status updated", data: updated });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update status", detail: (error as Error).message },
      { status: 500 },
    );
  }
}
