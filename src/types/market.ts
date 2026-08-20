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

export interface StockResponse {
  symbol: string;
  name: string;
  exchange: string;
  sector: string;
  referencePrice: number;
  synthetic: boolean;
}

export interface CandleResponse {
  symbol: string;
  interval: string;
  candleTime: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface PriceResponse {
  symbol: string;
  price: number;
  previousPrice: number;
  changeAmount: number;
  changePercent: number;
  synthetic: boolean;
  timestamp: string;
}
