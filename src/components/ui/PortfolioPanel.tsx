import { useWARROOMStore } from '@/lib/store';
import { Wallet, TrendingUp, Activity } from 'lucide-react';

export function PortfolioPanel() {
  const portfolio = useWARROOMStore(state => state.portfolio);
  const positions = useWARROOMStore(state => state.positions);

  const metrics = [
    {
      label: 'Total Value',
      value: `$${portfolio.totalValue.toLocaleString()}`,
      icon: Wallet,
      color: 'text-warroom-accent'
    },
    {
      label: 'Total P&L',
      value: `$${portfolio.totalPnL.toFixed(2)}`,
      icon: TrendingUp,
      color: portfolio.totalPnL >= 0 ? 'text-green-400' : 'text-red-400'
    },
    {
      label: 'ROI',
      value: `${portfolio.roi.toFixed(2)}%`,
      icon: Activity,
      color: portfolio.roi >= 0 ? 'text-green-400' : 'text-red-400'
    }
  ];

  return (
    <div className="absolute bottom-4 left-4 w-96 bg-black/90 border border-warroom-accent/30 rounded-lg p-4 backdrop-blur-sm">
      <h2 className="text-xl font-bold text-warroom-accent mb-4">PORTFOLIO</h2>

      <div className="grid grid-cols-3 gap-2 mb-4">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <div key={metric.label} className="bg-warroom-darker p-3 rounded border border-white/10">
              <Icon className={`${metric.color} mb-2`} size={20} />
              <div className="text-xs text-gray-400 mb-1">{metric.label}</div>
              <div className={`font-mono font-bold ${metric.color}`}>{metric.value}</div>
            </div>
          );
        })}
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-bold text-white mb-2">Active Positions ({positions.length})</h3>
        {positions.length === 0 ? (
          <p className="text-gray-400 text-xs">No active positions</p>
        ) : (
          positions.map((position) => (
            <div key={position.symbol} className="bg-warroom-darker p-2 rounded border border-white/10">
              <div className="flex justify-between items-center">
                <div>
                  <span className="font-bold text-white text-sm">{position.symbol}</span>
                  <span className={`ml-2 text-xs ${position.side === 'long' ? 'text-green-400' : 'text-red-400'}`}>
                    {position.side.toUpperCase()}
                  </span>
                </div>
                <div className="text-right">
                  <div className={`font-mono text-sm ${position.pnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    ${position.pnl.toFixed(2)}
                  </div>
                  <div className={`text-xs ${position.pnlPercent >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {position.pnlPercent >= 0 ? '+' : ''}{position.pnlPercent.toFixed(2)}%
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}