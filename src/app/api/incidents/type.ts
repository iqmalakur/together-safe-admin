export type IncidentResult = {
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

export type IncidentResponse = {
  id: string;
  riskLevel: string;
  status: string;
  category: string;
  date: string;
  time: string;
  location: string;
};
