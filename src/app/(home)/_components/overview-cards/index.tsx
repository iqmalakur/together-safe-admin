import { compactFormat } from "@/lib/format-number";
import { OverviewCard } from "./card";
import * as icons from "./icons";
import { getPrismaClient } from "@/utils/prisma";

export async function OverviewCardsGroup() {
  const prisma = getPrismaClient();
  const totalReports = await prisma.report.count();
  const totalUsers = await prisma.user.count();
  const totalIncidents = (
    await prisma.$queryRaw<
      {
        all: number;
        verified: number;
      }[]
    >`
    SELECT 
      COUNT(*)::int AS all,
      COUNT(*) FILTER (WHERE i.status IN ('verified', 'admin_verified'))::int AS verified
    FROM "Incident" i
  `
  )[0];

  return (
    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4 2xl:gap-7.5">
      <OverviewCard
        label="Total Insiden"
        data={{
          value: compactFormat(totalIncidents.all),
        }}
        Icon={icons.TotalIncident}
      />

      <OverviewCard
        label="Total Insiden Terverifikasi"
        data={{
          value: compactFormat(totalIncidents.verified),
        }}
        Icon={icons.ActiveIncidentIcon}
      />

      <OverviewCard
        label="Total Laporan Insiden"
        data={{
          value: compactFormat(totalReports),
        }}
        Icon={icons.TotalReport}
      />

      <OverviewCard
        label="Total Users"
        data={{
          value: compactFormat(totalUsers),
        }}
        Icon={icons.Users}
      />
    </div>
  );
}
