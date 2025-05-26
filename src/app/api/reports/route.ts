import { getPrismaClient } from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const prisma = getPrismaClient();

    const reports = await prisma.report.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        incident: {
          select: {
            id: true,
            category: {
              select: { name: true },
            },
            riskLevel: true,
          },
        },
      },
    });

    // Format data: ubah date dan time jadi string agar mudah ditampilkan di frontend
    const formatted = reports.map((report) => ({
      id: report.id,
      description: report.description,
      latitude: report.latitude,
      longitude: report.longitude,
      date: report.date.toISOString().split("T")[0], // format YYYY-MM-DD
      time: report.time.toISOString().split("T")[1].slice(0, 5), // format HH:mm
      isAnonymous: report.isAnonymous,
      userEmail: report.userEmail,
      incident: report.incident,
    }));

    return NextResponse.json({ data: formatted });
  } catch (error) {
    console.error("[GET /api/reports]", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
