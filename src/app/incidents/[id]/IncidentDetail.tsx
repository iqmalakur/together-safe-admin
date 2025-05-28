"use client";

import { IncidentDetailResponse } from "@/app/api/incidents/[id]/type";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  getRiskLevel,
  getRiskLevelColor,
  getStatus,
  getStatusColor,
} from "@/utils/common";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { IncidentDetailSkeleton } from "./skeleton";

interface IncidentDetailProps {
  incidentId: string;
}

const IncidentDetail: FC<IncidentDetailProps> = ({ incidentId }) => {
  const [incident, setIncident] = useState<IncidentDetailResponse | null>(null);

  useEffect(() => {
    const fetchIncident = async () => {
      try {
        const res = await fetch(`/api/incidents/${incidentId}`);
        if (!res.ok) throw new Error("Failed to fetch incident data");
        const data = await res.json();
        setIncident(data);
      } catch (error) {
        console.error(error);
      }
    };

    if (incidentId) fetchIncident();
  }, [incidentId]);

  if (!incident) return <IncidentDetailSkeleton />;

  return (
    <>
      <div className="flex justify-end">
        <Link
          href="/incidents"
          className="inline-flex items-center gap-2 rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
        >
          ← Kembali
        </Link>
      </div>
      <div className="rounded-[10px] bg-white p-6 shadow-1 dark:bg-gray-dark dark:shadow-card">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <p className="mb-1 text-sm font-medium text-gray-500 dark:text-gray-400">
              Risk Level
            </p>
            <span
              className={`inline-block rounded-full px-3 py-1 text-sm font-semibold ${getRiskLevelColor(incident.riskLevel)}`}
            >
              {getRiskLevel(incident.riskLevel)}
            </span>
          </div>

          <div>
            <p className="mb-1 text-sm font-medium text-gray-500 dark:text-gray-400">
              Status
            </p>
            <span
              className={`inline-block rounded-full px-3 py-1 text-sm font-semibold ${getStatusColor(incident.status)}`}
            >
              {getStatus(incident.status)}
            </span>
          </div>

          <div>
            <p className="mb-1 text-sm font-medium text-gray-500 dark:text-gray-400">
              Tanggal
            </p>
            <p className="text-gray-900 dark:text-white">{incident.date}</p>
          </div>

          <div>
            <p className="mb-1 text-sm font-medium text-gray-500 dark:text-gray-400">
              Waktu
            </p>
            <p className="text-gray-900 dark:text-white">{incident.time}</p>
          </div>

          <div>
            <p className="mb-1 text-sm font-medium text-gray-500 dark:text-gray-400">
              Kategori
            </p>
            <p className="text-gray-900 dark:text-white">{incident.category}</p>
          </div>

          <div className="sm:col-span-2">
            <p className="mb-1 text-sm font-medium text-gray-500 dark:text-gray-400">
              Lokasi
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <Link
                href={`https://www.google.com/maps?q=${incident.location}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-blue-700"
              >
                Lihat di Google Maps
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
        <div className="px-6 py-4 sm:px-7 sm:py-5 xl:px-8.5">
          <h3 className="mb-6 text-xl font-semibold text-dark dark:text-white">
            Laporan Terkait
          </h3>
          <Table>
            <TableHeader>
              <TableRow className="border-t text-base [&>th]:h-auto [&>th]:py-3 sm:[&>th]:py-4.5">
                <TableHead className="pl-5 sm:pl-6 xl:pl-7.5">#</TableHead>
                <TableHead>Deskripsi</TableHead>
                <TableHead>Tanggal</TableHead>
                <TableHead>Waktu</TableHead>
                <TableHead>Pelapor</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {incident.reports.map((report, index) => (
                <TableRow
                  key={report.id}
                  className="text-base font-medium text-dark dark:text-white"
                >
                  <TableCell className="pl-5 sm:pl-6 xl:pl-7.5">
                    {index + 1}
                  </TableCell>
                  <TableCell>{report.description}</TableCell>
                  <TableCell>{report.date}</TableCell>
                  <TableCell>{report.time}</TableCell>
                  <TableCell>
                    {report.isAnonymous ? "Anonim" : report.user.name}
                  </TableCell>
                  <TableCell>
                    <Link
                      href={`/reports/${report.id}`}
                      className="text-primary"
                    >
                      Detail
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default IncidentDetail;
