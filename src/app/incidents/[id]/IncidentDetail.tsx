"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { FC, useEffect, useState } from "react";

interface IncidentDetailProps {
  incidentId: string;
}

interface Report {
  id: string;
  description: string;
  date: string;
  time: string;
  reporter: string;
}

interface Incident {
  id: string;
  risklevel: string;
  status: string;
  createdat: string;
  updatedat: string;
  datestart: string;
  dateend: string;
  timestart: string;
  timeend: string;
  reports: Report[];
}

const IncidentDetail: FC<IncidentDetailProps> = ({ incidentId }) => {
  const [incident, setIncident] = useState<Incident | null>(null);

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

  if (!incident) return <p>Loading...</p>;

  console.log(incident);

  return (
    <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
      <div className="px-6 py-4 sm:px-7 sm:py-5 xl:px-8.5">
        <h2 className="text-2xl font-bold text-dark dark:text-white">
          Incident Details
        </h2>
        <p>Risk Level: {incident.risklevel}</p>
        <p>Status: {incident.status}</p>
        <p>Start Date: {incident.datestart}</p>
        <p>End Date: {incident.dateend}</p>
        <p>Start Time: {incident.timestart}</p>
        <p>End Time: {incident.timeend}</p>
      </div>

      <div className="px-6 py-4 sm:px-7 sm:py-5 xl:px-8.5">
        <h3 className="text-xl font-semibold text-dark dark:text-white">
          Related Reports
        </h3>
        <Table>
          <TableHeader>
            <TableRow className="border-t text-base [&>th]:h-auto [&>th]:py-3 sm:[&>th]:py-4.5">
              <TableHead className="pl-5 sm:pl-6 xl:pl-7.5">#</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
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
                <TableCell>{report.reporter}</TableCell>
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
};

export default IncidentDetail;
