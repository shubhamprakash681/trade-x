export interface AddWatchlistRequest {
  symbol: string;
}

export interface WatchlistResponse {
  id: number;
  symbol: string;
  stockName: string;
  exchange: string;
  createdAt: string;
}
