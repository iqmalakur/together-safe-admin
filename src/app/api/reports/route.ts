import { getPrismaClient } from "@/utils/prisma";
import { NextResponse } from "next/server";
import { IncidentReportResponse } from "./type";
import { getFormattedDate, getTimeString } from "@/utils/date-utils";

export async function GET() {
  try {
    const prisma = getPrismaClient();

    const reports = await prisma.report.findMany({
      select: {
        id: true,
        description: true,
        date: true,
        time: true,
        isAnonymous: true,
        incident: { select: { category: { select: { name: true } } } },
        user: { select: { name: true } },
      },
      orderBy: { createdAt: "desc" },
      take: 10,
    });

    return NextResponse.json<IncidentReportResponse[]>(
      reports.map((report) => ({
        ...report,
        date: getFormattedDate(report.date, true),
        time: getTimeString(report.time, true),
      })),
    );
  } catch (error) {
    console.error("[GET /api/reports]", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
