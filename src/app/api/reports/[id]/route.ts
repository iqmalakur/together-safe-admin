import {
  getDateRange,
  getFormattedDate,
  getTimeRange,
  getTimeString,
} from "@/utils/date-utils";
import { getPrismaClient } from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";
import { IncidentReportDetailResponse } from "./type";

export async function GET(req: NextRequest, { params }: any) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ error: "Missing report ID" }, { status: 400 });
    }

    const prisma = getPrismaClient();

    const report = await prisma.report.findUnique({
      where: { id },
      select: {
        id: true,
        description: true,
        date: true,
        time: true,
        isAnonymous: true,
        latitude: true,
        longitude: true,
        user: { select: { name: true } },
        incident: {
          select: {
            id: true,
            category: { select: { name: true } },
            riskLevel: true,
            status: true,
            dateStart: true,
            dateEnd: true,
            timeStart: true,
            timeEnd: true,
          },
        },
      },
    });

    if (!report) {
      return NextResponse.json({ error: "Report not found" }, { status: 404 });
    }

    return NextResponse.json<IncidentReportDetailResponse>({
      id: report.id,
      description: report.description,
      date: getFormattedDate(report.date),
      time: getTimeString(report.time, true),
      user: report.user,
      location: `${report.latitude},${report.longitude}`,
      isAnonymous: report.isAnonymous,
      incident: {
        id: report.incident.id,
        category: report.incident.category,
        riskLevel: report.incident.riskLevel,
        status: report.incident.status,
        date: getDateRange(report.incident.dateStart, report.incident.dateEnd),
        time: getTimeRange(report.incident.timeStart, report.incident.timeEnd),
      },
    });
  } catch (error) {
    console.error("[GET /api/reports/[id]]", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
