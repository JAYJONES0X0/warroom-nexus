// Market data hook
import { useNexusStore } from '@/core/StateManager';
export const useMarketData = () => useNexusStore(state => state.markets);