import { getPrismaClient } from "@/utils/prisma";
import { NextResponse } from "next/server";
import { IncidentResponse } from "./type";
import { getDateRange, getTimeRange } from "@/utils/date-utils";

export async function GET() {
  try {
    const prisma = getPrismaClient();
    const incidents = await prisma.incident.findMany({
      select: {
        id: true,
        riskLevel: true,
        status: true,
        category: { select: { name: true } },
        dateStart: true,
        dateEnd: true,
        timeStart: true,
        timeEnd: true,
      },
      take: 10,
      orderBy: { updatedAt: "desc" },
    });

    return NextResponse.json<IncidentResponse[]>(
      incidents.map((incident) => ({
        id: incident.id,
        riskLevel: incident.riskLevel,
        status: incident.status,
        category: incident.category.name,
        date: getDateRange(incident.dateStart, incident.dateEnd, true),
        time: getTimeRange(incident.timeStart, incident.timeEnd),
      })),
    );
  } catch (error) {
    console.error("[GET /api/incidents/recent]", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
