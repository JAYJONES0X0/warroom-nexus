import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Stars } from '@react-three/drei';
import { MarketSphere } from './visualization/3d/MarketSphere';
import { TimeTunnel } from './visualization/3d/TimeTunnel';
import { LiquidityOcean } from './visualization/3d/LiquidityOcean';
import { NeuralPathways } from './visualization/3d/NeuralPathways';
import { ArchonInterface } from './ai/ArchonInterface';
import { HolographicPanel } from './visualization/panels/HolographicPanel';
import { useNexusStore } from './core/StateManager';
import { wsManager } from './core/WebSocketManager';
import { Activity, TrendingUp, Brain, Layers, Zap } from 'lucide-react';
import './App.css';

type ViewMode = 'sphere' | 'tunnel' | 'ocean' | 'neural';

function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('sphere');
  const [showArchon, setShowArchon] = useState(true);
  const [showMetrics, setShowMetrics] = useState(true);

  const markets = useNexusStore(state => state.markets);
  const activeSymbol = useNexusStore(state => state.activeSymbol);
  const setMarketData = useNexusStore(state => state.setMarketData);
  const watchlist = useNexusStore(state => state.watchlist);

  // Initialize demo data
  useEffect(() => {
    // Generate mock market data
    const generateMockData = () => {
      watchlist.forEach(symbol => {
        const basePrice = symbol === 'BTCUSDT' ? 45000 : 
                         symbol === 'ETHUSDT' ? 2500 :
                         symbol === 'SOLUSDT' ? 100 : 300;

        const change = (Math.random() - 0.5) * 10;
        const price = basePrice * (1 + change / 100);

        setMarketData(symbol, {
          symbol,
          price,
          volume: Math.random() * 1000000,
          timestamp: Date.now(),
          change24h: change,
          high24h: price * 1.05,
          low24h: price * 0.95,
          sentiment: (Math.random() - 0.5) * 2,
          liquidity: Math.random() * 10000000
        });
      });
    };

    // Initial data
    generateMockData();

    // Update every 2 seconds
    const interval = setInterval(generateMockData, 2000);

    return () => clearInterval(interval);
  }, [watchlist, setMarketData]);

  const marketArray = Array.from(markets.values());
  const activeMarket = markets.get(activeSymbol);

  const avgChange = marketArray.length > 0
    ? marketArray.reduce((sum, m) => sum + m.change24h, 0) / marketArray.length
    : 0;

  const totalVolume = marketArray.reduce((sum, m) => sum + m.volume, 0);

  return (
    <div className="app">
      {/* 3D Canvas */}
      <div className="canvas-container">
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 5, 15]} />
          <OrbitControls 
            enableDamping 
            dampingFactor={0.05}
            minDistance={5}
            maxDistance={50}
          />

          {/* Lighting */}
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#00ffff" />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff00ff" />

          {/* Stars background */}
          <Stars radius={100} depth={50} count={5000} factor={4} fade speed={1} />

          {/* Render active view */}
          {viewMode === 'sphere' && <MarketSphere />}
          {viewMode === 'tunnel' && <TimeTunnel />}
          {viewMode === 'ocean' && <LiquidityOcean />}
          {viewMode === 'neural' && <NeuralPathways />}
        </Canvas>
      </div>

      {/* HUD Overlay */}
      <div className="hud">
        {/* Top Bar */}
        <div className="top-bar">
          <div className="logo">
            <Zap className="logo-icon" />
            <span>WARROOM NEXUS</span>
          </div>

          <div className="status-bar">
            <div className="status-item">
              <Activity size={16} />
              <span>LIVE</span>
            </div>
            <div className="status-item">
              <span>{marketArray.length} Markets</span>
            </div>
            <div className="status-item">
              <span className={avgChange >= 0 ? 'positive' : 'negative'}>
                {avgChange >= 0 ? '+' : ''}{avgChange.toFixed(2)}%
              </span>
            </div>
          </div>
        </div>

        {/* View Mode Selector */}
        <div className="view-selector">
          <button
            className={`view-button ${viewMode === 'sphere' ? 'active' : ''}`}
            onClick={() => setViewMode('sphere')}
          >
            <Layers size={20} />
            <span>Sphere</span>
          </button>
          <button
            className={`view-button ${viewMode === 'tunnel' ? 'active' : ''}`}
            onClick={() => setViewMode('tunnel')}
          >
            <TrendingUp size={20} />
            <span>Tunnel</span>
          </button>
          <button
            className={`view-button ${viewMode === 'ocean' ? 'active' : ''}`}
            onClick={() => setViewMode('ocean')}
          >
            <Activity size={20} />
            <span>Ocean</span>
          </button>
          <button
            className={`view-button ${viewMode === 'neural' ? 'active' : ''}`}
            onClick={() => setViewMode('neural')}
          >
            <Brain size={20} />
            <span>Neural</span>
          </button>
        </div>

        {/* Metrics Panel */}
        {showMetrics && (
          <div className="metrics-panel">
            <HolographicPanel
              title="MARKET METRICS"
              onClose={() => setShowMetrics(false)}
            >
              <div className="metrics-grid">
                <div className="metric-card">
                  <div className="metric-label">Active Symbol</div>
                  <div className="metric-value">{activeSymbol}</div>
                </div>
                {activeMarket && (
                  <>
                    <div className="metric-card">
                      <div className="metric-label">Price</div>
                      <div className="metric-value">
                        ${activeMarket.price.toFixed(2)}
                      </div>
                    </div>
                    <div className="metric-card">
                      <div className="metric-label">24h Change</div>
                      <div className={`metric-value ${activeMarket.change24h >= 0 ? 'positive' : 'negative'}`}>
                        {activeMarket.change24h >= 0 ? '+' : ''}
                        {activeMarket.change24h.toFixed(2)}%
                      </div>
                    </div>
                    <div className="metric-card">
                      <div className="metric-label">Volume</div>
                      <div className="metric-value">
                        ${(activeMarket.volume / 1000000).toFixed(2)}M
                      </div>
                    </div>
                  </>
                )}
                <div className="metric-card">
                  <div className="metric-label">Total Volume</div>
                  <div className="metric-value">
                    ${(totalVolume / 1000000).toFixed(2)}M
                  </div>
                </div>
                <div className="metric-card">
                  <div className="metric-label">Market Trend</div>
                  <div className={`metric-value ${avgChange >= 0 ? 'positive' : 'negative'}`}>
                    {avgChange >= 0 ? 'BULLISH' : 'BEARISH'}
                  </div>
                </div>
              </div>
            </HolographicPanel>
          </div>
        )}

        {/* ARCHON Panel */}
        {showArchon && (
          <div className="archon-panel">
            <HolographicPanel
              title="ARCHON AI"
              onClose={() => setShowArchon(false)}
            >
              <ArchonInterface />
            </HolographicPanel>
          </div>
        )}

        {/* Bottom Controls */}
        <div className="bottom-controls">
          <button
            className={`control-button ${showMetrics ? 'active' : ''}`}
            onClick={() => setShowMetrics(!showMetrics)}
          >
            <TrendingUp size={20} />
            <span>Metrics</span>
          </button>
          <button
            className={`control-button ${showArchon ? 'active' : ''}`}
            onClick={() => setShowArchon(!showArchon)}
          >
            <Brain size={20} />
            <span>ARCHON</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;