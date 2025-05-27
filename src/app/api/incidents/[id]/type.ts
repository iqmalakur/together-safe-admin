export type IncidentDetailResult = {
  id: string;
  risk_level: string;
  status: string;
  category: string;
  date_start: Date;
  date_end: Date;
  time_start: Date;
  time_end: Date;
  location: string;
};

export type IncidentReportResult = {
  id: string;
  description: string;
  date: string;
  time: string;
  isAnonymous: boolean;
  user: {
    name: string;
  };
};

export type IncidentDetailResponse = {
  id: string;
  riskLevel: string;
  status: string;
  category: string;
  date: string;
  time: string;
  location: string;
  reports: IncidentReportResult[];
};
