export type AlertCondition = 'ABOVE' | 'BELOW';
export type AlertStatus = 'ACTIVE' | 'TRIGGERED';

export interface CreateAlertRequest {
  symbol: string;
  targetPrice: number;
  condition: AlertCondition;
}

export interface AlertResponse {
  id: number;
  symbol: string;
  stockName: string;
  targetPrice: number;
  condition: AlertCondition;
  status: AlertStatus;
  triggeredPrice?: number;
  triggeredAt?: string;
  createdAt: string;
}

export interface NotificationResponse {
  id: number;
  symbol: string;
  title: string;
  message: string;
  alertId: number;
  createdAt: string;
}
