import { useWARROOMStore } from '@/lib/store';
import { X } from 'lucide-react';

export function PlanetInfoPanel() {
  const selectedPlanet = useWARROOMStore(state => state.selectedPlanet);
  const planets = useWARROOMStore(state => state.planets);
  const selectPlanet = useWARROOMStore(state => state.selectPlanet);

  if (!selectedPlanet) return null;

  const planet = planets.find(p => p.id === selectedPlanet);
  if (!planet) return null;

  return (
    <div className="absolute top-20 left-4 w-80 bg-black/90 border border-warroom-accent/30 rounded-lg p-4 backdrop-blur-sm">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-xl font-bold text-white">{planet.name}</h2>
          <span className="text-xs text-gray-400 uppercase">{planet.metadata.category}</span>
        </div>
        <button
          onClick={() => selectPlanet(null)}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      <div className="space-y-3">
        <div>
          <div className="text-xs text-gray-400 mb-1">Description</div>
          <div className="text-sm text-white">{planet.metadata.description}</div>
        </div>

        {planet.metadata.dataSource && (
          <div>
            <div className="text-xs text-gray-400 mb-1">Data Source</div>
            <div className="text-sm text-white">{planet.metadata.dataSource}</div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-2">
          <div className="bg-warroom-darker p-2 rounded">
            <div className="text-xs text-gray-400">Orbit Radius</div>
            <div className="text-sm text-white font-mono">{planet.orbitRadius.toFixed(1)}</div>
          </div>
          <div className="bg-warroom-darker p-2 rounded">
            <div className="text-xs text-gray-400">Radius</div>
            <div className="text-sm text-white font-mono">{planet.radius.toFixed(1)}</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="text-xs text-gray-400">Color</div>
          <div
            className="w-6 h-6 rounded border border-white/20"
            style={{ backgroundColor: planet.color }}
          />
          <div className="text-xs text-white font-mono">{planet.color}</div>
        </div>
      </div>
    </div>
  );
}