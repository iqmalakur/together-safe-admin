"use client";

import { ReportWeek } from "@/app/(home)/_components/ReportWeek";
import { IncidentCategoryTren } from "./_components/IncidentCategoryTren";
import { DashboardResponse } from "../api/dashboard/type";
import { useEffect, useState } from "react";

const DashboardCharts = () => {
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
    <div className="mt-4 grid grid-cols-10 gap-4 md:mt-6 md:gap-6 2xl:mt-9 2xl:gap-7.5">
      <IncidentCategoryTren className="col-span-12 xl:col-span-5" data={data} />
      <ReportWeek className="col-span-12 xl:col-span-5" data={data} />
    </div>
  );
};

export default DashboardCharts;
