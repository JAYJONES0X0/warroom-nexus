import { useWARROOMStore } from '@/lib/store';
import { TrendingUp, TrendingDown } from 'lucide-react';

export function MarketDataPanel() {
  const marketData = useWARROOMStore(state => state.marketData);
  const selectedPlanet = useWARROOMStore(state => state.selectedPlanet);

  if (selectedPlanet !== 'market-data') return null;

  const symbols = Object.keys(marketData);

  return (
    <div className="absolute top-20 right-4 w-96 bg-black/90 border border-warroom-accent/30 rounded-lg p-4 backdrop-blur-sm">
      <h2 className="text-xl font-bold text-warroom-accent mb-4">MARKET DATA</h2>

      {symbols.length === 0 ? (
        <p className="text-gray-400 text-sm">No market data available</p>
      ) : (
        <div className="space-y-2">
          {symbols.map(symbol => {
            const data = marketData[symbol];
            const isPositive = data.change >= 0;

            return (
              <div key={symbol} className="bg-warroom-darker p-3 rounded border border-white/10 hover:border-warroom-accent/50 transition-colors cursor-pointer">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-bold text-white">{symbol}</div>
                    <div className="text-xs text-gray-400">
                      Vol: {(data.volume / 1000000).toFixed(2)}M
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-lg text-white">
                      ${data.price.toFixed(2)}
                    </div>
                    <div className={`flex items-center gap-1 text-sm ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                      {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                      {isPositive ? '+' : ''}{data.change.toFixed(2)}%
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}