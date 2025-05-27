import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { RecentIncidentsSkeleton } from "@/app/incidents/skeleton";

import { Metadata } from "next";
import { FC, Suspense } from "react";
import IncidentDetail from "./IncidentDetail";

export const metadata: Metadata = {
  title: "Incidents",
};

const IncidentDetailPage: FC<{ params: { id: string } }> = async ({
  params,
}) => {
  const { id } = await params;

  return (
    <>
      <Breadcrumb pageName="Detail Insiden" />

      <div className="space-y-10">
        <Suspense fallback={<RecentIncidentsSkeleton />}>
          <IncidentDetail incidentId={id} />
        </Suspense>
      </div>
    </>
  );
};

export default IncidentDetailPage;
