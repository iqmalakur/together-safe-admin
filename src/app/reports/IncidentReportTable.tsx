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
import { IncidentReportResponse } from "../api/reports/type";
import { IncidentReportTableSkeleton } from "./skeleton";

export default function IncidentReportTable() {
  const [reports, setReports] = useState<IncidentReportResponse[] | null>(null);

  useEffect(() => {
    fetch("/api/reports")
      .then((res) => res.json())
      .then((json) => setReports(json))
      .catch((err) => {
        console.error("Gagal mengambil data laporan:", err);
      });
  }, []);

  if (reports == null) return <IncidentReportTableSkeleton />;

  return (
    <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
      <div className="px-6 py-4 sm:px-7 sm:py-5 xl:px-8.5">
        <h3 className="mb-6 text-xl font-semibold text-dark dark:text-white">
          Daftar Laporan Insiden
        </h3>
        <Table>
          <TableHeader>
            <TableRow className="border-t text-base [&>th]:h-auto [&>th]:py-3 sm:[&>th]:py-4.5">
              <TableHead className="pl-5 sm:pl-6 xl:pl-7.5">#</TableHead>
              <TableHead>Kategori</TableHead>
              <TableHead>Deskripsi</TableHead>
              <TableHead>Tanggal</TableHead>
              <TableHead>Waktu</TableHead>
              <TableHead>Pelapor</TableHead>
              <TableHead>Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reports.map((report, index) => (
              <TableRow
                key={report.id}
                className="text-base font-medium text-dark dark:text-white"
              >
                <TableCell className="pl-5 sm:pl-6 xl:pl-7.5">
                  {index + 1}
                </TableCell>
                <TableCell>{report.incident.category.name}</TableCell>
                <TableCell>{report.description}</TableCell>
                <TableCell>{report.date}</TableCell>
                <TableCell>{report.time}</TableCell>
                <TableCell>
                  {report.isAnonymous ? "Anonim" : report.user.name}
                </TableCell>
                <TableCell>
                  <Link href={`/reports/${report.id}`} className="text-primary">
                    Detail
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
