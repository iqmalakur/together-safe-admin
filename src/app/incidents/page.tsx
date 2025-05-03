import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { RecentIncidents } from "@/components/Tables/recent-incidents";
import { RecentIncidentsSkeleton } from "@/components/Tables/recent-incidents/skeleton";

import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Incidents",
};

const IncidentsPage = () => {
  return (
    <>
      <Breadcrumb pageName="Incidents" />

      <div className="space-y-10">
        <Suspense fallback={<RecentIncidentsSkeleton />}>
          <RecentIncidents />
        </Suspense>
      </div>
    </>
  );
};

export default IncidentsPage;
