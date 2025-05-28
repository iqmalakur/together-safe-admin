import Link from "next/link";

export function IncidentReportDetailSkeleton() {
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
            <p className="text-gray-900 dark:text-white">...</p>
          </div>

          <div className="sm:col-span-2">
            <p className="mb-1 text-sm font-medium text-gray-500 dark:text-gray-400">
              Deskripsi
            </p>
            <p className="text-gray-900 dark:text-white">...</p>
          </div>

          <div>
            <p className="mb-1 text-sm font-medium text-gray-500 dark:text-gray-400">
              Tanggal Kejadian
            </p>
            <p className="text-gray-900 dark:text-white">...</p>
          </div>

          <div>
            <p className="mb-1 text-sm font-medium text-gray-500 dark:text-gray-400">
              Waktu Kejadian
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

        <div className="mt-8 border-t pt-6 dark:border-gray-600">
          <h3 className="mb-4 text-xl font-semibold text-dark dark:text-white">
            Informasi Terkait Insiden
          </h3>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <p className="mb-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                Kategori
              </p>
              <p className="text-gray-900 dark:text-white">...</p>
            </div>

            <div>
              <p className="mb-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                Tingkat Risiko
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

            <div className="sm:col-span-2">
              <Link
                href={`/incidents/`}
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
}
