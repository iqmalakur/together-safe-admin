"use client";

import { cn } from "@/lib/utils";
import { DonutChart } from "./DonutChart";
import { useEffect, useState } from "react";
import { DashboardResponse } from "@/app/api/dashboard/type";

type PropsType = {
  className?: string;
};

export function IncidentCategoryTren({ className }: PropsType) {
  const [data, setData] = useState<DashboardResponse | null>(null);

  useEffect(() => {
    fetch("/api/dashboard")
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => {
        console.error("Gagal mengambil data laporan:", err);
      });
  }, []);

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
