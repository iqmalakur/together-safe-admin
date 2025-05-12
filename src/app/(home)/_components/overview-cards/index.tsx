import { compactFormat } from "@/lib/format-number";
import { OverviewCard } from "./card";
import * as icons from "./icons";
import { getPrismaClient } from "@/utils/prisma";

export async function OverviewCardsGroup() {
  const prisma = getPrismaClient();
  const totalIncidents = await prisma.incident.count();
  const totalActiveIncidents = await prisma.incident.count({
    where: { status: "active" },
  });
  const totalReports = await prisma.report.count();
  const totalUsers = await prisma.user.count();

  return (
    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4 2xl:gap-7.5">
      <OverviewCard
        label="Total Insiden"
        data={{
          value: compactFormat(totalIncidents),
        }}
        Icon={icons.TotalIncident}
      />

      <OverviewCard
        label="Total Insiden Aktif"
        data={{
          value: compactFormat(totalActiveIncidents),
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
