import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import { Metadata } from "next";
import { FC, Suspense } from "react";
import IncidentDetail from "./IncidentDetail";
import { IncidentDetailSkeleton } from "./skeleton";

export const metadata: Metadata = {
  title: "Detail Insiden",
};

const IncidentDetailPage: FC<{ params: { id: string } }> = async ({
  params,
}) => {
  const { id } = await params;

  return (
    <>
      <Breadcrumb pageName="Detail Insiden" />

      <div className="space-y-10">
        <Suspense fallback={<IncidentDetailSkeleton />}>
          <IncidentDetail incidentId={id} />
        </Suspense>
      </div>
    </>
  );
};

export default IncidentDetailPage;
