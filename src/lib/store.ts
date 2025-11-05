import { create } from 'zustand';
import { OrbitalSystemState, MarketData, EXAScore, Position, PortfolioMetrics } from '@/types/orbital';
import { PLANET_CONFIGS } from '@/lib/planetConfigs';

interface WARROOMStore extends OrbitalSystemState {
  // Orbital System
  selectPlanet: (planetId: string | null) => void;
  setCameraTarget: (target: [number, number, number]) => void;
  setAnimating: (isAnimating: boolean) => void;

  // Market Data
  marketData: Record<string, MarketData>;
  updateMarketData: (symbol: string, data: MarketData) => void;

  // EXA Scores
  exaScores: Record<string, EXAScore>;
  updateEXAScore: (symbol: string, score: EXAScore) => void;

  // Trading
  positions: Position[];
  addPosition: (position: Position) => void;
  updatePosition: (symbol: string, updates: Partial<Position>) => void;
  closePosition: (symbol: string) => void;

  // Portfolio
  portfolio: PortfolioMetrics;
  updatePortfolio: (metrics: Partial<PortfolioMetrics>) => void;

  // UI State
  activeView: 'orbital' | 'trading' | 'analytics';
  setActiveView: (view: 'orbital' | 'trading' | 'analytics') => void;
}

export const useWARROOMStore = create<WARROOMStore>((set) => ({
  // Initial Orbital State
  planets: PLANET_CONFIGS,
  selectedPlanet: null,
  cameraTarget: [0, 0, 0],
  isAnimating: false,

  // Actions
  selectPlanet: (planetId) => set({ selectedPlanet: planetId }),
  setCameraTarget: (target) => set({ cameraTarget: target }),
  setAnimating: (isAnimating) => set({ isAnimating }),

  // Market Data
  marketData: {},
  updateMarketData: (symbol, data) => 
    set((state) => ({
      marketData: { ...state.marketData, [symbol]: data }
    })),

  // EXA Scores
  exaScores: {},
  updateEXAScore: (symbol, score) =>
    set((state) => ({
      exaScores: { ...state.exaScores, [symbol]: score }
    })),

  // Trading
  positions: [],
  addPosition: (position) =>
    set((state) => ({
      positions: [...state.positions, position]
    })),
  updatePosition: (symbol, updates) =>
    set((state) => ({
      positions: state.positions.map(p =>
        p.symbol === symbol ? { ...p, ...updates } : p
      )
    })),
  closePosition: (symbol) =>
    set((state) => ({
      positions: state.positions.filter(p => p.symbol !== symbol)
    })),

  // Portfolio
  portfolio: {
    totalValue: 100000,
    availableBalance: 100000,
    marginUsed: 0,
    unrealizedPnL: 0,
    realizedPnL: 0,
    totalPnL: 0,
    roi: 0
  },
  updatePortfolio: (metrics) =>
    set((state) => ({
      portfolio: { ...state.portfolio, ...metrics }
    })),

  // UI State
  activeView: 'orbital',
  setActiveView: (view) => set({ activeView: view })
}));