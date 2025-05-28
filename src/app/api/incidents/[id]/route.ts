import { getPrismaClient } from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";
import { IncidentDetailResponse, IncidentDetailResult } from "./type";
import {
  getDateRange,
  getFormattedDate,
  getTimeRange,
  getTimeString,
} from "@/utils/date-utils";

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const prisma = getPrismaClient();
    const { id } = await params;

    const incidentResult = await prisma.$queryRaw<IncidentDetailResult[]>`
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
      WHERE i.id = ${id}::uuid
      LIMIT 1
    `;

    const incident = incidentResult[0];

    if (!incident) {
      return NextResponse.json(
        { error: "Incident not found" },
        { status: 404 },
      );
    }

    const reports = await prisma.report.findMany({
      where: { incidentId: id },
      select: {
        id: true,
        description: true,
        date: true,
        time: true,
        isAnonymous: true,
        user: { select: { name: true } },
      },
    });

    return NextResponse.json<IncidentDetailResponse>({
      id: incident.id,
      riskLevel: incident.risk_level,
      status: incident.status,
      category: incident.category,
      date: getDateRange(incident.date_start, incident.date_end),
      time: getTimeRange(incident.time_start, incident.time_end),
      location: incident.location,
      reports: reports.map((report) => ({
        ...report,
        date: getFormattedDate(report.date, true),
        time: getTimeString(report.time, true),
      })),
    });
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
  const { status, riskLevel } = body;

  try {
    const prisma = getPrismaClient();
    const updated = await prisma.incident.update({
      where: { id },
      data: {
        status,
        riskLevel,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({ message: "Status updated", data: updated });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update status", detail: (error as Error).message },
      { status: 500 },
    );
  }
}
