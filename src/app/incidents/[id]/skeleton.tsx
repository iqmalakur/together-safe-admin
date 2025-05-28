import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";

export function IncidentDetailSkeleton() {
  return (
    <>
      <div className="rounded-[10px] bg-white p-6 shadow-1 dark:bg-gray-dark dark:shadow-card">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <p className="mb-1 text-sm font-medium text-gray-500 dark:text-gray-400">
              Risk Level
            </p>
            <span
              className={`inline-block rounded-full px-3 py-1 text-sm font-semibold`}
            >
              ...
            </span>
          </div>

          <div>
            <p className="mb-1 text-sm font-medium text-gray-500 dark:text-gray-400">
              Status
            </p>
            <span
              className={`inline-block rounded-full px-3 py-1 text-sm font-semibold`}
            >
              ...
            </span>
          </div>

          <div>
            <p className="mb-1 text-sm font-medium text-gray-500 dark:text-gray-400">
              Tanggal
            </p>
            <p className="text-gray-900 dark:text-white">...</p>
          </div>

          <div>
            <p className="mb-1 text-sm font-medium text-gray-500 dark:text-gray-400">
              Waktu
            </p>
            <p className="text-gray-900 dark:text-white">...</p>
          </div>

          <div>
            <p className="mb-1 text-sm font-medium text-gray-500 dark:text-gray-400">
              Kategori
            </p>
            <p className="text-gray-900 dark:text-white">...</p>
          </div>

          <div className="sm:col-span-2">
            <p className="mb-1 text-sm font-medium text-gray-500 dark:text-gray-400">
              Lokasi
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <Link
                href={`https://www.google.com/maps?q=`}
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
              {Array.from({ length: 10 }).map((_, i) => (
                <TableRow key={i}>
                  {Array.from({ length: 6 }).map((_, j) => (
                    <TableCell key={j}>
                      <Skeleton className="h-6 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}
