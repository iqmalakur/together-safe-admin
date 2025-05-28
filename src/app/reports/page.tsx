import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { IncidentTableSkeleton } from "@/app/incidents/skeleton";
import AdminReports from "@/components/Tables/recent-reports";

import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Incidents",
};

const IncidentsPage = () => {
  return (
    <>
      <Breadcrumb pageName="Daftar Insiden" />

      <div className="space-y-10">
        <Suspense fallback={<IncidentTableSkeleton />}>
          <AdminReports />
        </Suspense>
      </div>
    </>
  );
};

export default IncidentsPage;
