import { RecentIncident } from "@/types/incident-type";
import { getPrismaClient } from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const prisma = getPrismaClient();
    const incidents = await prisma.$queryRaw<RecentIncident[]>`
      SELECT
        i.id,
        i.risk_level,
        i.status,
        c.name AS category,
        CONCAT(TO_CHAR(i.date_start, 'YYYY-MM-DD'), ' - ', TO_CHAR(i.date_end, 'YYYY-MM-DD')) AS date,
        CONCAT(TO_CHAR(i.time_start, 'HH24:MI'), ' - ', TO_CHAR(i.time_end, 'HH24:MI')) AS time,
        CONCAT(ST_Y(location), ',', ST_X(location)) as location
      FROM "Incident" i
      JOIN "IncidentCategory" c ON i.category_id = c.id
      ORDER BY i.created_at DESC
      LIMIT 10;
    `;

    return NextResponse.json({ data: incidents });
  } catch (error) {
    console.error("[GET /api/incidents/recent]", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
