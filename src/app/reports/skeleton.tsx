import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function IncidentReportTableSkeleton() {
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
            {Array.from({ length: 10 }).map((_, i) => (
              <TableRow key={i}>
                {Array.from({ length: 7 }).map((_, j) => (
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
  );
}
