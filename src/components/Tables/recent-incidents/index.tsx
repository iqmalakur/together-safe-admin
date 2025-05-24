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
import { capitalize } from "@/utils/common";
import Link from "next/link";
import { RecentIncident } from "@/types/incident-type";

export function RecentIncidents() {
  const [data, setData] = useState<RecentIncident[]>([]);

  useEffect(() => {
    fetch("/api/incidents")
      .then((res) => res.json())
      .then((json) => setData(json.data))
      .catch((err) => {
        console.error("Gagal mengambil data insiden:", err);
      });
  }, []);

  return (
    <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
      <div className="px-6 py-4 sm:px-7 sm:py-5 xl:px-8.5">
        <h2 className="text-2xl font-bold text-dark dark:text-white">
          Insiden Terbaru
        </h2>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="border-t text-base [&>th]:h-auto [&>th]:py-3 sm:[&>th]:py-4.5">
            <TableHead className="pl-5 sm:pl-6 xl:pl-7.5">#</TableHead>
            <TableHead>Kategori</TableHead>
            <TableHead>Tingkat Risiko</TableHead>
            <TableHead>Rentang Tanggal</TableHead>
            <TableHead>Rentang Waktu</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Lokasi</TableHead>
            <TableHead>Aksi</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((incident, index) => (
            <TableRow
              key={incident.id}
              className="text-base font-medium text-dark dark:text-white"
            >
              <TableCell className="pl-5 sm:pl-6 xl:pl-7.5">
                {index + 1}
              </TableCell>
              <TableCell>{incident.category}</TableCell>
              <TableCell>{capitalize(incident.risk_level)}</TableCell>
              <TableCell>{incident.date}</TableCell>
              <TableCell>{incident.time}</TableCell>
              <TableCell>
                <Select
                  label=""
                  items={[
                    { label: "Active", value: "active" },
                    { label: "Non Active", value: "non_active" },
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
                  href={`https://www.google.com/maps?q=${incident.location}`}
                  target="_blank"
                  className="text-primary"
                >
                  Lihat
                </Link>
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
    </div>
  );
}
