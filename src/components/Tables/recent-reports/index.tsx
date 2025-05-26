"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";

type ReportWithIncident = {
  id: string;
  description: string;
  latitude: number;
  longitude: number;
  date: string;
  time: string;
  isAnonymous: boolean;
  userEmail: string;
  incident: {
    id: string;
    category: { name: string };
    riskLevel: string;
  };
};

export default function AdminReports() {
  const [reports, setReports] = useState<ReportWithIncident[]>([]);

  useEffect(() => {
    fetch("/api/reports")
      .then((res) => res.json())
      .then((json) => setReports(json.data))
      .catch((err) => {
        console.error("Gagal mengambil data laporan:", err);
      });
  }, []);

  return (
    <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
      <div className="px-6 py-4 sm:px-7 sm:py-5 xl:px-8.5">
        <h2 className="text-2xl font-bold text-dark dark:text-white">
          Laporan Pengguna
        </h2>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="border-t text-base [&>th]:h-auto [&>th]:py-3 sm:[&>th]:py-4.5">
            <TableHead>#</TableHead>
            <TableHead>Insiden</TableHead>
            <TableHead>Pelapor</TableHead>
            <TableHead>Deskripsi</TableHead>
            <TableHead>Tanggal</TableHead>
            <TableHead>Waktu</TableHead>
            <TableHead>Lokasi</TableHead>
            <TableHead>Aksi</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {reports.map((report, index) => (
            <TableRow
              key={report.id}
              className="text-base font-medium text-dark dark:text-white"
            >
              <TableCell>{index + 1}</TableCell>
              <TableCell>{report.incident.category.name}</TableCell>
              <TableCell>
                {report.isAnonymous ? "Anonim" : report.userEmail}
              </TableCell>
              <TableCell className="max-w-[200px] truncate">
                {report.description}
              </TableCell>
              <TableCell>{report.date}</TableCell>
              <TableCell>{report.time}</TableCell>
              <TableCell>
                <Link
                  href={`https://www.google.com/maps?q=${report.latitude},${report.longitude}`}
                  target="_blank"
                  className="text-primary"
                >
                  Lihat
                </Link>
              </TableCell>
              <TableCell>
                <Link
                  href={`/admin/reports/${report.id}`}
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
  );
}
