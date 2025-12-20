export type SummaryRow = {
  date: string;
  total: number;
  risk: number;
};

export type SummaryData = {
  totalFound: number;
  rows: SummaryRow[];
};
