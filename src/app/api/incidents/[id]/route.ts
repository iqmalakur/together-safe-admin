import { getPrismaClient } from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const prisma = getPrismaClient();
    const { id } = await params;

    // Query untuk mengambil data insiden
    const incident = await prisma.$queryRaw<any>`
      SELECT
        i.id,
        i.risk_level AS riskLevel,
        i.status,
        TO_CHAR(i.created_at, 'YYYY-MM-DD"T"HH24:MI:SS"Z"') AS createdAt,
        TO_CHAR(i.updated_at, 'YYYY-MM-DD"T"HH24:MI:SS"Z"') AS updatedAt,
        TO_CHAR(i.date_start, 'YYYY-MM-DD') AS dateStart,
        TO_CHAR(i.date_end, 'YYYY-MM-DD') AS dateEnd,
        TO_CHAR(i.time_start, 'HH24:MI') AS timeStart,
        TO_CHAR(i.time_end, 'HH24:MI') AS timeEnd,
        c.name AS category
      FROM "Incident" i
      JOIN "IncidentCategory" c ON i.category_id = c.id
      WHERE i.id = ${id}::uuid
    `;

    if (!incident.length) {
      return NextResponse.json(
        { error: "Incident not found" },
        { status: 404 },
      );
    }

    // Query untuk mengambil laporan terkait insiden
    const reports = await prisma.$queryRaw<any>`
      SELECT
        r.id,
        r.description,
        TO_CHAR(r.date, 'YYYY-MM-DD') AS date,
        TO_CHAR(r.time, 'HH24:MI') AS time,
        u.name AS reporter
      FROM "Report" r
      JOIN "User" u ON r.user_email = u.email
      WHERE r.incident_id = ${id}::uuid
      ORDER BY r.created_at DESC
    `;

    // Menggabungkan data insiden dengan laporan
    const responseData = {
      ...incident[0],
      reports,
    };

    return NextResponse.json(responseData);
  } catch (error) {
    console.error("[GET /api/incidents/:id]", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

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
