import { useWARROOMStore } from '@/lib/store';
import { EXAScore } from '@/types/orbital';

export function EXADashboard() {
  const exaScores = useWARROOMStore(state => state.exaScores);
  const selectedPlanet = useWARROOMStore(state => state.selectedPlanet);

  if (selectedPlanet !== 'exa-engine') return null;

  const symbols = Object.keys(exaScores);

  return (
    <div className="absolute top-20 right-4 w-96 bg-black/90 border border-warroom-accent/30 rounded-lg p-4 backdrop-blur-sm">
      <h2 className="text-xl font-bold text-warroom-accent mb-4">EXA ENGINE</h2>

      {symbols.length === 0 ? (
        <p className="text-gray-400 text-sm">No active EXA scores</p>
      ) : (
        <div className="space-y-4">
          {symbols.map(symbol => {
            const score = exaScores[symbol];
            return (
              <EXAScoreCard key={symbol} symbol={symbol} score={score} />
            );
          })}
        </div>
      )}
    </div>
  );
}

function EXAScoreCard({ symbol, score }: { symbol: string; score: EXAScore }) {
  const signalColor = 
    score.signal === 'LONG' ? 'text-green-400' :
    score.signal === 'SHORT' ? 'text-red-400' :
    'text-gray-400';

  return (
    <div className="bg-warroom-darker p-3 rounded border border-white/10">
      <div className="flex justify-between items-center mb-2">
        <span className="font-bold text-white">{symbol}</span>
        <span className={`font-bold ${signalColor}`}>{score.signal}</span>
      </div>

      <div className="mb-2">
        <div className="flex justify-between text-xs mb-1">
          <span className="text-gray-400">Overall Score</span>
          <span className="text-white font-mono">{score.overall.toFixed(2)}</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div
            className="bg-warroom-accent h-2 rounded-full transition-all"
            style={{ width: `${score.overall}%` }}
          />
        </div>
      </div>

      <div className="mb-2">
        <div className="flex justify-between text-xs mb-1">
          <span className="text-gray-400">Confidence</span>
          <span className="text-white font-mono">{(score.confidence * 100).toFixed(0)}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all"
            style={{ width: `${score.confidence * 100}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-1 text-xs">
        {Object.entries(score.layers).map(([layer, value]) => (
          <div key={layer} className="bg-black/50 p-1 rounded">
            <div className="text-gray-500 text-[10px]">{layer.split('_')[0]}</div>
            <div className="text-white font-mono">{value.toFixed(1)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}