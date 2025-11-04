import { create } from 'zustand';
import { MarketTick, OrderBook } from '@/types/market';
import { ArchonMessage, Alert, Pattern } from '@/types/ai';
import { NavigationState, PanelConfig } from '@/types/ui';

interface NexusState {
  // Market State
  markets: Map<string, MarketTick>;
  orderBooks: Map<string, OrderBook>;
  activeSymbol: string;
  watchlist: string[];

  // UI State
  navigation: NavigationState;
  panels: PanelConfig[];
  theme: 'dark' | 'light' | 'cyber';

  // AI State
  archonMessages: ArchonMessage[];
  archonThinking: boolean;
  patterns: Pattern[];
  alerts: Alert[];

  // Performance
  fps: number;
  latency: number;

  // Actions
  setMarketData: (symbol: string, data: MarketTick) => void;
  setOrderBook: (symbol: string, orderBook: OrderBook) => void;
  setActiveSymbol: (symbol: string) => void;
  addToWatchlist: (symbol: string) => void;
  removeFromWatchlist: (symbol: string) => void;

  updateNavigation: (nav: Partial<NavigationState>) => void;
  togglePanel: (panelId: string) => void;

  addArchonMessage: (message: ArchonMessage) => void;
  setArchonThinking: (thinking: boolean) => void;
  addPattern: (pattern: Pattern) => void;
  addAlert: (alert: Alert) => void;
  dismissAlert: (alertId: string) => void;

  updatePerformance: (fps: number, latency: number) => void;
}

export const useNexusStore = create<NexusState>((set) => ({
  // Initial State
  markets: new Map(),
  orderBooks: new Map(),
  activeSymbol: 'BTCUSDT',
  watchlist: ['BTCUSDT', 'ETHUSDT', 'SOLUSDT', 'BNBUSDT'],

  navigation: {
    mode: '3d',
    cameraPosition: [0, 5, 10],
    cameraTarget: [0, 0, 0],
    timePosition: Date.now(),
    activeView: 'sphere'
  },

  panels: [
    { id: 'metrics', title: 'Metrics', position: { x: -8, y: 3, z: 0 }, size: { width: 400, height: 300 }, visible: true, locked: false, opacity: 0.95 },
    { id: 'orderbook', title: 'Order Book', position: { x: 8, y: 3, z: 0 }, size: { width: 400, height: 300 }, visible: true, locked: false, opacity: 0.95 },
    { id: 'archon', title: 'ARCHON', position: { x: 0, y: -3, z: 5 }, size: { width: 500, height: 400 }, visible: true, locked: false, opacity: 0.98 }
  ],

  theme: 'cyber',

  archonMessages: [],
  archonThinking: false,
  patterns: [],
  alerts: [],

  fps: 60,
  latency: 0,

  // Actions
  setMarketData: (symbol, data) => set((state) => {
    const markets = new Map(state.markets);
    markets.set(symbol, data);
    return { markets };
  }),

  setOrderBook: (symbol, orderBook) => set((state) => {
    const orderBooks = new Map(state.orderBooks);
    orderBooks.set(symbol, orderBook);
    return { orderBooks };
  }),

  setActiveSymbol: (symbol) => set({ activeSymbol: symbol }),

  addToWatchlist: (symbol) => set((state) => ({
    watchlist: [...state.watchlist, symbol]
  })),

  removeFromWatchlist: (symbol) => set((state) => ({
    watchlist: state.watchlist.filter(s => s !== symbol)
  })),

  updateNavigation: (nav) => set((state) => ({
    navigation: { ...state.navigation, ...nav }
  })),

  togglePanel: (panelId) => set((state) => ({
    panels: state.panels.map(p => 
      p.id === panelId ? { ...p, visible: !p.visible } : p
    )
  })),

  addArchonMessage: (message) => set((state) => ({
    archonMessages: [...state.archonMessages, message]
  })),

  setArchonThinking: (thinking) => set({ archonThinking: thinking }),

  addPattern: (pattern) => set((state) => ({
    patterns: [...state.patterns, pattern]
  })),

  addAlert: (alert) => set((state) => ({
    alerts: [...state.alerts, alert]
  })),

  dismissAlert: (alertId) => set((state) => ({
    alerts: state.alerts.filter(a => a.id !== alertId)
  })),

  updatePerformance: (fps, latency) => set({ fps, latency })
}));