import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import IncidentReportTable from "@/app/reports/IncidentReportTable";

import { Metadata } from "next";
import { Suspense } from "react";
import { IncidentReportTableSkeleton } from "./skeleton";

export const metadata: Metadata = {
  title: "Laporan Insiden",
};

const IncidentsPage = () => {
  return (
    <>
      <Breadcrumb pageName="Laporan Insiden" />

      <div className="space-y-10">
        <Suspense fallback={<IncidentReportTableSkeleton />}>
          <IncidentReportTable />
        </Suspense>
      </div>
    </>
  );
};

export default IncidentsPage;
