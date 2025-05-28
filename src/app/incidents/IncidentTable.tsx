"use client";

import { useEffect, useState } from "react";
import { Select } from "@/components/FormElements/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { IncidentResponse } from "@/app/api/incidents/type";
import { IncidentTableSkeleton } from "./skeleton";

export function IncidentTable() {
  const [incidents, setIncidents] = useState<IncidentResponse[] | null>(null);

  useEffect(() => {
    const fetchIncident = async () => {
      try {
        const res = await fetch("/api/incidents");
        if (!res.ok) throw new Error("Failed to fetch incident data");
        const incidents = await res.json();
        setIncidents(incidents);
      } catch (error) {
        console.error(error);
      }
    };

    fetchIncident();
  }, []);

  if (incidents === null) return <IncidentTableSkeleton />;

  return (
    <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
      <div className="px-6 py-4 sm:px-7 sm:py-5 xl:px-8.5">
        <h2 className="text-2xl font-bold text-dark dark:text-white">
          Daftar Insiden
        </h2>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="border-t text-base [&>th]:h-auto [&>th]:py-3 sm:[&>th]:py-4.5">
            <TableHead className="pl-5 sm:pl-6 xl:pl-7.5">#</TableHead>
            <TableHead>Kategori</TableHead>
            <TableHead>Tingkat Risiko</TableHead>
            <TableHead>Tanggal</TableHead>
            <TableHead>Waktu</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Aksi</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {incidents.map((incident, index) => (
            <TableRow
              key={incident.id}
              className="text-base font-medium text-dark dark:text-white"
            >
              <TableCell className="pl-5 sm:pl-6 xl:pl-7.5">
                {index + 1}
              </TableCell>
              <TableCell>{incident.category}</TableCell>
              <TableCell>
                <Select
                  label=""
                  items={[
                    { label: "Tinggi", value: "high" },
                    { label: "Sedang", value: "medium" },
                    { label: "Rendah", value: "low" },
                  ]}
                  defaultValue={incident.riskLevel}
                  onChange={(value) => {
                    fetch(`/api/incidents/${incident.id}`, {
                      method: "PATCH",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ riskLevel: value }),
                    });
                  }}
                />
              </TableCell>
              <TableCell>{incident.date}</TableCell>
              <TableCell>{incident.time}</TableCell>
              <TableCell>
                <Select
                  label=""
                  items={[
                    { label: "Diverifikasi Admin", value: "admin_verified" },
                    { label: "Ditolak Admin", value: "admin_rejected" },
                    { label: "Telah Ditangani", value: "admin_resolved" },
                    { label: "Pending", value: "pending" },
                    { label: "Terverifikasi", value: "verified" },
                  ]}
                  defaultValue={incident.status}
                  onChange={(value) => {
                    fetch(`/api/incidents/${incident.id}`, {
                      method: "PATCH",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ status: value }),
                    });
                  }}
                />
              </TableCell>
              <TableCell>
                <Link
                  href={`/incidents/${incident.id}`}
                  className="text-primary"
                >
                  Detail
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {incidents.length === 0 && (
        <div className="p-6 text-center text-body-2xlg font-semibold text-gray">
          Tidak ada data insiden
        </div>
      )}
    </div>
  );
}
