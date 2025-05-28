"use client";

import { cn } from "@/lib/utils";
import { DonutChart } from "./DonutChart";
import { DashboardResponse } from "@/app/api/dashboard/type";

type PropsType = {
  data: DashboardResponse | null;
  className?: string;
};

export function IncidentCategoryTren({ data, className }: PropsType) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 grid-rows-[auto_1fr] gap-9 rounded-[10px] bg-white p-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card",
        className,
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-body-2xlg font-bold text-dark dark:text-white">
          Distribusi Kategori Insiden
        </h2>
      </div>

      {data && (
        <div className="grid place-items-center">
          <DonutChart data={data.categoryTren} />
        </div>
      )}
    </div>
  );
}
