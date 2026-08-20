import { create } from 'zustand';
import { PriceResponse } from '@/types/market';

interface MarketStore {
  prices: Record<string, PriceResponse>;
  updatePrice: (price: PriceResponse) => void;
}

export const useMarketStore = create<MarketStore>((set) => ({
  prices: {},
  updatePrice: (price) =>
    set((state) => ({
      prices: {
        ...state.prices,
        [price.symbol]: price,
      },
    })),
}));
