import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls } from '@react-three/drei';
import { SolarSystem } from '../components/solar/SolarSystem';
import { useNavigate } from 'react-router-dom';
import '../styles/solar/home.css';

export const HomeScreen: React.FC = () => {
  const navigate = useNavigate();
  const [showIntro, setShowIntro] = useState(true);
  const [tickerData, setTickerData] = useState([
    { symbol: 'GBP/USD', price: 1.2634, change: -0.12 },
    { symbol: 'EUR/USD', price: 1.0847, change: 0.34 },
    { symbol: 'USD/JPY', price: 149.82, change: 0.58 },
    { symbol: 'BTC/USD', price: 43250, change: 2.14 },
    { symbol: 'ETH/USD', price: 2287, change: 1.87 },
    { symbol: 'GOLD', price: 2034, change: 0.45 }
  ]);

  // Hide intro after first load
  useEffect(() => {
    const hasSeenIntro = localStorage.getItem('warroom_intro_seen');
    if (hasSeenIntro) {
      setShowIntro(false);
    } else {
      const timer = setTimeout(() => {
        setShowIntro(false);
        localStorage.setItem('warroom_intro_seen', 'true');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  // Simulate live ticker updates
  useEffect(() => {
    const interval = setInterval(() => {
      setTickerData(prev => prev.map(item => ({
        ...item,
        price: item.price * (1 + (Math.random() - 0.5) * 0.001),
        change: item.change + (Math.random() - 0.5) * 0.1
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handlePlanetClick = (planetId: string) => {
    // Navigate to the planet's route
    const planet = PLANETS.find(p => p.id === planetId);
    if (planet) {
      navigate(planet.route);
    }
  };

  return (
    <div className="home-screen">
      {/* Intro animation */}
      {showIntro && (
        <div className="intro-overlay">
          <div className="intro-content">
            <h1 className="intro-title">WARROOM NEXUS</h1>
            <p className="intro-subtitle">Initializing Intelligence Systems...</p>
          </div>
        </div>
      )}

      {/* 3D Canvas */}
      <div className="solar-canvas">
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 8, 20]} />
          <OrbitControls
            enableDamping
            dampingFactor={0.05}
            minDistance={10}
            maxDistance={40}
            maxPolarAngle={Math.PI / 1.8}
            minPolarAngle={Math.PI / 3}
          />
          <SolarSystem onPlanetClick={handlePlanetClick} />
        </Canvas>
      </div>

      {/* Ticker bar */}
      <div className="ticker-bar">
        <div className="ticker-content">
          {tickerData.map((item, i) => (
            <div key={i} className="ticker-item">
              <span className="ticker-symbol">{item.symbol}</span>
              <span className="ticker-price">{item.price.toFixed(item.symbol.includes('BTC') || item.symbol.includes('ETH') || item.symbol.includes('GOLD') ? 0 : 4)}</span>
              <span className={`ticker-change ${item.change >= 0 ? 'positive' : 'negative'}`}>
                {item.change >= 0 ? '+' : ''}{item.change.toFixed(2)}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Session indicator */}
      <div className="session-indicator">
        <div className="session-clock">
          <span className="session-label">ACTIVE SESSIONS</span>
          <div className="session-dots">
            <div className="session-dot london active" title="London"></div>
            <div className="session-dot newyork active" title="New York"></div>
            <div className="session-dot tokyo" title="Tokyo"></div>
            <div className="session-dot sydney" title="Sydney"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Import PLANETS for navigation
import { PLANETS } from '../config/planets';
