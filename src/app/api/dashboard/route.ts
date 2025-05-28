import { getPrismaClient } from "@/utils/prisma";
import { NextResponse } from "next/server";
import { CategoryResult, DashboardResponse } from "./type";

export async function GET() {
  try {
    const prisma = getPrismaClient();
    const data = await prisma.$queryRaw<CategoryResult[]>`
      SELECT ic.name as category, COUNT(*)::int FROM "Incident" i
      JOIN "IncidentCategory" ic ON i.category_id = ic.id
      GROUP BY ic.name
    `;

    const totalIncident = data.reduce((acc, { count }) => acc + count, 0);

    return NextResponse.json<DashboardResponse>({
      categoryTren: data.map((item) => ({
        name: item.category,
        percentage: item.count / totalIncident,
        amount: item.count,
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
