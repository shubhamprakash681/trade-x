export interface MarketMoverResponse {
  symbol: string;
  name: string;
  price: number;
  changeAmount: number;
  changePercent: number;
  volume: number;
  asOf: string;
}

export interface MarketTrendResponse {
  symbol: string;
  name: string;
  price: number;
  changePercent: number;
  score: number;
  reason: string;
  asOf: string;
}
