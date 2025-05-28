"use client";

import { FC, useEffect, useState } from "react";
import {
  getRiskLevel,
  getRiskLevelColor,
  getStatus,
  getStatusColor,
} from "@/utils/common";
import Link from "next/link";
import { IncidentReportDetailSkeleton } from "./skeleton";
import { IncidentReportDetailResponse } from "@/app/api/reports/[id]/type";

interface ReportDetailProps {
  reportId: string;
}

const IncidentReportDetail: FC<ReportDetailProps> = ({ reportId }) => {
  const [report, setReport] = useState<IncidentReportDetailResponse | null>(
    null,
  );

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const res = await fetch(`/api/reports/${reportId}`);
        if (!res.ok) throw new Error("Failed to fetch report detail");

        const data = await res.json();
        setReport(data);
      } catch (error) {
        console.error("Error fetching report detail:", error);
      }
    };

    if (reportId) fetchReport();
  }, [reportId]);

  if (!report) return <IncidentReportDetailSkeleton />;

  return (
    <>
      <div className="mb-4 flex justify-end">
        <Link
          href="/reports"
          className="inline-flex items-center gap-2 rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
        >
          ← Kembali
        </Link>
      </div>

      <div className="rounded-[10px] bg-white p-6 shadow-1 dark:bg-gray-dark dark:shadow-card">
        <h2 className="mb-6 text-2xl font-bold text-dark dark:text-white">
          Detail Laporan Insiden
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <p className="mb-1 text-sm font-medium text-gray-500 dark:text-gray-400">
              Pelapor
            </p>
            <p className="text-gray-900 dark:text-white">
              {report.isAnonymous ? "Anonim" : report.user.name}
            </p>
          </div>

          <div className="sm:col-span-2">
            <p className="mb-1 text-sm font-medium text-gray-500 dark:text-gray-400">
              Deskripsi
            </p>
            <p className="text-gray-900 dark:text-white">
              {report.description}
            </p>
          </div>

          <div>
            <p className="mb-1 text-sm font-medium text-gray-500 dark:text-gray-400">
              Tanggal Kejadian
            </p>
            <p className="text-gray-900 dark:text-white">{report.date}</p>
          </div>

          <div>
            <p className="mb-1 text-sm font-medium text-gray-500 dark:text-gray-400">
              Waktu Kejadian
            </p>
            <p className="text-gray-900 dark:text-white">{report.time}</p>
          </div>

          <div className="sm:col-span-2">
            <p className="mb-1 text-sm font-medium text-gray-500 dark:text-gray-400">
              Lokasi
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <Link
                href={`https://www.google.com/maps?q=${report.location}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-blue-700"
              >
                Lihat di Google Maps
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t pt-6 dark:border-gray-600">
          <h3 className="mb-4 text-xl font-semibold text-dark dark:text-white">
            Informasi Terkait Insiden
          </h3>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <p className="mb-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                Kategori
              </p>
              <p className="text-gray-900 dark:text-white">
                {report.incident.category.name}
              </p>
            </div>

            <div>
              <p className="mb-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                Tingkat Risiko
              </p>
              <span
                className={`inline-block rounded-full px-3 py-1 text-sm font-semibold ${getRiskLevelColor(report.incident.riskLevel)}`}
              >
                {getRiskLevel(report.incident.riskLevel)}
              </span>
            </div>

            <div>
              <p className="mb-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                Status
              </p>
              <span
                className={`inline-block rounded-full px-3 py-1 text-sm font-semibold ${getStatusColor(report.incident.status)}`}
              >
                {getStatus(report.incident.status)}
              </span>
            </div>

            <div>
              <p className="mb-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                Tanggal
              </p>
              <p className="text-gray-900 dark:text-white">
                {report.incident.date}
              </p>
            </div>

            <div>
              <p className="mb-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                Waktu
              </p>
              <p className="text-gray-900 dark:text-white">
                {report.incident.time}
              </p>
            </div>

            <div className="sm:col-span-2">
              <Link
                href={`/incidents/${report.incident.id}`}
                className="inline-block rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
              >
                Lihat Detail Insiden
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default IncidentReportDetail;
