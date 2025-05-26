import { getPrismaClient } from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ error: "Missing report ID" }, { status: 400 });
    }

    const prisma = getPrismaClient();

    const report = await prisma.report.findUnique({
      where: { id },
      include: {
        user: { select: { name: true } },
        incident: {
          select: {
            id: true,
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

    return NextResponse.json({
      id: report.id,
      description: report.description,
      date: report.date.toISOString().split("T")[0],
      time: report.time,
      reporter: report.user.name,
      incident: report.incident || null,
    });
  } catch (error) {
    console.error("[GET /api/reports/[id]]", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
