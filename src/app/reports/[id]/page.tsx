import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { RecentIncidentsSkeleton } from "@/components/Tables/recent-incidents/skeleton";

import { Metadata } from "next";
import { FC, Suspense } from "react";
import IncidentDetail from "./ReportDetail";
import ReportDetail from "./ReportDetail";

export const metadata: Metadata = {
  title: "Reports",
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
          <ReportDetail reportId={id} />
        </Suspense>
      </div>
    </>
  );
};

export default IncidentDetailPage;
