import { cn } from "@/lib/utils";
import { ReportWeekChart } from "./ReportWeekChart";
import { DashboardResponse } from "@/app/api/dashboard/type";

type PropsType = {
  data: DashboardResponse | null;
  className?: string;
};

const getDayName = (day: string) => {
  switch (day.trim()) {
    case "Monday":
      return "Sen";
    case "Tuesday":
      return "Sel";
    case "Wednesday":
      return "Rab";
    case "Thursday":
      return "Kam";
    case "Friday":
      return "Jum";
    case "Saturday":
      return "Sab";
    case "Sunday":
      return "Min";
    default:
      return day;
  }
};

export function ReportWeek({ data, className }: PropsType) {
  const reportWeek = data?.reportWeek.map(({ day, count }) => ({
    x: getDayName(day),
    y: count,
  }));

  return (
    <div
      className={cn(
        "rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card",
        className,
      )}
    >
      <div className="border-b border-stroke px-6 py-5.5 dark:border-dark-3">
        <div className="flex justify-between">
          <h2 className="mb-1.5 text-2xl font-bold text-dark dark:text-white">
            Laporan Minggu Ini
          </h2>
        </div>
      </div>

      {reportWeek && <ReportWeekChart data={reportWeek} />}
    </div>
  );
}
