import { getPrismaClient } from "@/utils/prisma";
import { NextResponse } from "next/server";
import { CategoryResult, DashboardResponse, ReportWeekResult } from "./type";

export async function GET() {
  try {
    const prisma = getPrismaClient();

    const categoryTren = await prisma.$queryRaw<CategoryResult[]>`
      SELECT ic.name as category, COUNT(*)::int FROM "Incident" i
      JOIN "IncidentCategory" ic ON i.category_id = ic.id
      GROUP BY ic.name
    `;

    const reportWeek = await prisma.$queryRaw<ReportWeekResult[]>`
      WITH days AS (
        SELECT generate_series(
          date_trunc('week', CURRENT_DATE),
          date_trunc('week', CURRENT_DATE) + INTERVAL '6 days',
          INTERVAL '1 day'
        ) AS date
      )
      SELECT 
        TO_CHAR(d.date, 'Day') AS day,
        COUNT(r.id)::int AS count
      FROM days d
      LEFT JOIN "Report" r ON DATE_TRUNC('day', r.date) = d.date
      GROUP BY d.date
      ORDER BY d.date;
    `;

    const totalIncident = categoryTren.reduce(
      (acc, { count }) => acc + count,
      0,
    );

    return NextResponse.json<DashboardResponse>({
      categoryTren: categoryTren.map((item) => ({
        name: item.category,
        percentage: item.count / totalIncident,
        amount: item.count,
      })),
      reportWeek,
    });
  } catch (error) {
    console.error("[GET /api/incidents/recent]", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
