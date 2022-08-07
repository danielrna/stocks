export interface Pagination {
  limit: number;
  offset: number;
  count: number;
  total: number;
}

export interface Quote {
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  adj_high?: any;
  adj_low?: any;
  adj_close: number;
  adj_open?: any;
  adj_volume?: any;
  split_factor: number;
  symbol: string;
  exchange: string;
  date: Date;
}

export interface QuoteResponse {
  pagination: Pagination;
  data: Quote[];
}



