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
