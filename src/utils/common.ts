export const capitalize = (word: string) =>
  word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();

export const getRiskLevel = (riskLevel: string) => {
  switch (riskLevel) {
    case "low":
      return "Rendah";
    case "medium":
      return "Sedang";
    case "high":
      return "Tinggi";
    default:
      return "-";
  }
};

export const getStatus = (status: string) => {
  switch (status) {
    case "admin_verified":
      return "Diverifikasi Admin";
    case "admin_rejected":
      return "Ditolak Admin";
    case "admin_resolved":
      return "Telah Ditangani";
    case "verified":
      return "Terverifikasi";
    default:
      return "Pending";
  }
};

export const getRiskLevelColor = (level: string) => {
  switch (level) {
    case "high":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
    case "medium":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
    case "low":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
  }
};

export const getStatusColor = (status: string) => {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
    case "verified":
    case "admin_verified":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
    case "admin_resolved":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
    case "admin_rejected":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
  }
};
