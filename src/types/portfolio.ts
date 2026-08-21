export type OrderSide = 'BUY' | 'SELL';
export type OrderStatus = 'FILLED' | 'REJECTED' | 'PENDING' | 'CANCELLED';

export interface OrderRequest {
  symbol: string;
  quantity: number;
}

export interface OrderResponse {
  id: number;
  userId: number;
  symbol: string;
  stockName: string;
  side: OrderSide;
  quantity: number;
  price: number;
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
}

export interface PortfolioSummaryResponse {
  cashBalance: number;
  holdingsValue: number;
  totalValue: number;
  investedValue: number;
  unrealizedPnl: number;
  unrealizedPnlPercent: number;
}

export interface HoldingResponse {
  symbol: string;
  stockName: string;
  quantity: number;
  averagePrice: number;
  lastPrice: number;
  investedValue: number;
  marketValue: number;
  unrealizedPnl: number;
  unrealizedPnlPercent: number;
}

export interface PortfolioResponse {
  summary: PortfolioSummaryResponse;
  holdings: HoldingResponse[];
}

