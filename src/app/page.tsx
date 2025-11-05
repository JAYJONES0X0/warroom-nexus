import { OrbitalScene } from '@/components/orbital/OrbitalScene';
import { ControlPanel } from '@/components/ui/ControlPanel';
import { PlanetInfoPanel } from '@/components/ui/PlanetInfoPanel';
import { EXADashboard } from '@/components/ui/EXADashboard';
import { MarketDataPanel } from '@/components/ui/MarketDataPanel';
import { PortfolioPanel } from '@/components/ui/PortfolioPanel';

export default function Home() {
  return (
    <main className="w-screen h-screen bg-warroom-darker overflow-hidden relative">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/80 to-transparent p-4">
        <h1 className="text-3xl font-bold text-warroom-accent tracking-wider">
          WARROOM NEXUS
        </h1>
        <p className="text-xs text-gray-400 mt-1">
          3D Spatial Trading Intelligence Platform
        </p>
      </div>

      {/* Control Panel */}
      <ControlPanel />

      {/* 3D Orbital Scene */}
      <OrbitalScene />

      {/* Info Panels */}
      <PlanetInfoPanel />
      <EXADashboard />
      <MarketDataPanel />
      <PortfolioPanel />

      {/* Status Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
        <div className="flex justify-between items-center text-xs text-gray-400">
          <div>ARCHON AI: ACTIVE</div>
          <div>EXA PROTOCOL: v2.0</div>
          <div>LATENCY: 12ms</div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            CONNECTED
          </div>
        </div>
      </div>
    </main>
  );
}