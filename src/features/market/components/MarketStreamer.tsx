'use client';

import { useEffect } from 'react';
import { wsService } from '@/lib/websocket';
import { useMarketStore } from '@/store/useMarketStore';
import { PriceResponse } from '@/types/market';

export function MarketStreamer() {
  const updatePrice = useMarketStore((state) => state.updatePrice);

  useEffect(() => {
    wsService.connect();

    const subscription = wsService.subscribe('/topic/market', (message) => {
      try {
        const priceTick: PriceResponse = JSON.parse(message.body);
        updatePrice(priceTick);
      } catch (err) {
        console.error('Failed to parse websocket message', err);
      }
    });

    return () => {
      subscription?.unsubscribe();
      wsService.disconnect();
    };
  }, [updatePrice]);

  return null; // This component doesn't render anything visually
}
