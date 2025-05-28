export type CategoryResult = {
  category: string;
  count: number;
};

export type CategoryTren = {
  name: string;
  percentage: number;
  amount: number;
};

export type DashboardResponse = {
  categoryTren: CategoryTren[];
};
