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
