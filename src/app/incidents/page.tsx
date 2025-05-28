import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { IncidentTable } from "@/app/incidents/IncidentTable";
import { IncidentTableSkeleton } from "@/app/incidents/skeleton";

import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Insiden",
};

const IncidentsPage = () => {
  return (
    <>
      <Breadcrumb pageName="Insiden" />

      <div className="space-y-10">
        <Suspense fallback={<IncidentTableSkeleton />}>
          <IncidentTable />
        </Suspense>
      </div>
    </>
  );
};

export default IncidentsPage;
