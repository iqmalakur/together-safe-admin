"use client";

import { FC, useEffect, useState } from "react";
import { getRiskLevel, getStatus } from "@/utils/common";
import Link from "next/link";

interface ReportDetailProps {
  reportId: string;
}

interface IncidentInfo {
  id: string;
  risklevel: string;
  status: string;
  datestart: string;
  dateend: string;
  timestart: string;
  timeend: string;
}

interface Report {
  id: string;
  description: string;
  date: string;
  time: string;
  reporter: string;
  incident?: IncidentInfo;
}

const ReportDetail: FC<ReportDetailProps> = ({ reportId }) => {
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const res = await fetch(`/api/reports/${reportId}`);
        if (!res.ok) throw new Error("Failed to fetch report detail");

        const data = await res.json();
        setReport(data);
      } catch (error) {
        console.error("Error fetching report detail:", error);
      } finally {
        setLoading(false);
      }
    };

    if (reportId) fetchReport();
  }, [reportId]);

  if (loading) return <p>Loading...</p>;
  if (!report) return <p>Data laporan tidak ditemukan.</p>;

  return (
    <div className="rounded-[10px] bg-white px-6 py-6 shadow-1 dark:bg-gray-dark dark:shadow-card sm:px-8 sm:py-7">
      <h2 className="mb-4 text-2xl font-bold text-dark dark:text-white">
        Detail Laporan Insiden
      </h2>
      <ul className="space-y-2 text-dark dark:text-white">
        <li>
          <strong>ID Laporan:</strong> {report.id}
        </li>
        <li>
          <strong>Deskripsi:</strong> {report.description}
        </li>
        <li>
          <strong>Tanggal Kejadian:</strong> {report.date}
        </li>
        <li>
          <strong>Waktu Kejadian:</strong> {report.time}
        </li>
        <li>
          <strong>Pelapor:</strong> {report.reporter}
        </li>
      </ul>

      {report.incident && (
        <div className="mt-6">
          <h3 className="mb-2 text-xl font-semibold text-dark dark:text-white">
            Terkait Insiden
          </h3>
          <ul className="space-y-1 text-dark dark:text-white">
            <li>
              <strong>ID Insiden:</strong> {report.incident.id}
            </li>
            <li>
              <strong>Risk Level:</strong>{" "}
              {getRiskLevel(report.incident.risklevel)}
            </li>
            <li>
              <strong>Status:</strong> {getStatus(report.incident.status)}
            </li>
            <li>
              <strong>Start Date:</strong> {report.incident.datestart}
            </li>
            <li>
              <strong>End Date:</strong> {report.incident.dateend}
            </li>
            <li>
              <strong>Start Time:</strong> {report.incident.timestart}
            </li>
            <li>
              <strong>End Time:</strong> {report.incident.timeend}
            </li>
            <li>
              <Link
                href={`/incidents/${report.incident.id}`}
                className="text-primary hover:underline"
              >
                Lihat Detail Insiden
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ReportDetail;
