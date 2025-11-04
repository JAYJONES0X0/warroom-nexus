// Market Data Types
export interface MarketTick {
  symbol: string;
  price: number;
  volume: number;
  timestamp: number;
  change24h: number;
  high24h: number;
  low24h: number;
  sentiment: number; // -1 to 1
  liquidity: number;
}

export interface OrderBookLevel {
  price: number;
  volume: number;
  total: number;
}

export interface OrderBook {
  symbol: string;
  bids: OrderBookLevel[];
  asks: OrderBookLevel[];
  timestamp: number;
}

export interface Trade {
  id: string;
  symbol: string;
  price: number;
  volume: number;
  side: 'buy' | 'sell';
  timestamp: number;
}

export interface Candle {
  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface MarketCorrelation {
  symbol1: string;
  symbol2: string;
  correlation: number;
  strength: 'weak' | 'moderate' | 'strong';
}