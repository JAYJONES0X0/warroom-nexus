import { useWARROOMStore } from '@/lib/store';
import { Orbit, BarChart3, Settings } from 'lucide-react';

export function ControlPanel() {
  const activeView = useWARROOMStore(state => state.activeView);
  const setActiveView = useWARROOMStore(state => state.setActiveView);

  const views = [
    { id: 'orbital' as const, label: 'Orbital', icon: Orbit },
    { id: 'trading' as const, label: 'Trading', icon: BarChart3 },
    { id: 'analytics' as const, label: 'Analytics', icon: Settings }
  ];

  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/90 border border-warroom-accent/30 rounded-lg p-2 backdrop-blur-sm flex gap-2">
      {views.map((view) => {
        const Icon = view.icon;
        const isActive = activeView === view.id;

        return (
          <button
            key={view.id}
            onClick={() => setActiveView(view.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded transition-all ${
              isActive
                ? 'bg-warroom-accent text-black font-bold'
                : 'text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <Icon size={18} />
            <span className="text-sm">{view.label}</span>
          </button>
        );
      })}
    </div>
  );
}