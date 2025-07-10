import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import { Metadata } from "next";
import { FC, Suspense } from "react";
import IncidentReportDetail from "./IncidentReportDetail";
import { IncidentReportDetailSkeleton } from "./skeleton";

export const metadata: Metadata = {
  title: "Detail Laporan Insiden",
};

const IncidentDetailPage: FC<any> = async ({ params }) => {
  const { id } = await params;

  return (
    <>
      <Breadcrumb pageName="Detail Laporan Insiden" />

      <div className="space-y-10">
        <Suspense fallback={<IncidentReportDetailSkeleton />}>
          <IncidentReportDetail reportId={id} />
        </Suspense>
      </div>
    </>
  );
};

export default IncidentDetailPage;
