export type IncidentReportResponse = {
  id: string;
  description: string;
  date: string;
  time: string;
  isAnonymous: boolean;
  incident: {
    category: {
      name: string;
    };
  };
  user: {
    name: string;
  };
};
