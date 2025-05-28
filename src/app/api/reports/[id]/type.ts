export type IncidentReportDetailResponse = {
  id: string;
  description: string;
  date: string;
  time: string;
  location: string;
  isAnonymous: boolean;
  user: { name: string };
  incident: {
    id: string;
    category: { name: string };
    riskLevel: string;
    status: string;
    date: string;
    time: string;
  };
};
