import { getPrismaClient } from "@/utils/prisma";
import { NextResponse } from "next/server";
import { IncidentResponse, IncidentResult } from "./type";
import { getDateRange, getTimeRange } from "@/utils/date-utils";

export async function GET() {
  try {
    const prisma = getPrismaClient();
    const incidents = await prisma.$queryRaw<IncidentResult[]>`
      SELECT
        i.id,
        i.risk_level,
        i.status,
        c.name AS category,
        i.date_start,
        i.date_end,
        i.time_start,
        i.time_end,
        CONCAT(ST_Y(location), ',', ST_X(location)) as location
      FROM "Incident" i
      JOIN "IncidentCategory" c ON i.category_id = c.id
      ORDER BY i.updated_at DESC
      LIMIT 10
    `;

    return NextResponse.json<{ data: IncidentResponse[] }>({
      data: incidents.map((incident) => ({
        id: incident.id,
        riskLevel: incident.risk_level,
        status: incident.status,
        category: incident.category,
        date: getDateRange(incident.date_start, incident.date_end),
        time: getTimeRange(incident.time_start, incident.time_end),
        location: incident.location,
      })),
    });
  } catch (error) {
    console.error("[GET /api/incidents/recent]", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
