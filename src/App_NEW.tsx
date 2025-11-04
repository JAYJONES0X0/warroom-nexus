import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HomeScreen } from './screens/HomeScreen';
import { TopBar } from './components/layout/TopBar';
import './App.css';

// Placeholder screens (to be built)
const MarketsScreen = () => <div className="placeholder-screen"><h1>MARKETS</h1><p>Coming soon...</p></div>;
const IntelligenceScreen = () => <div className="placeholder-screen"><h1>INTELLIGENCE</h1><p>EXA Protocol - Coming soon...</p></div>;
const AnalysisScreen = () => <div className="placeholder-screen"><h1>ANALYSIS</h1><p>Coming soon...</p></div>;
const PortfolioScreen = () => <div className="placeholder-screen"><h1>PORTFOLIO</h1><p>Coming soon...</p></div>;
const NexusScreen = () => <div className="placeholder-screen"><h1>NEXUS</h1><p>Coming soon...</p></div>;
const SettingsScreen = () => <div className="placeholder-screen"><h1>SETTINGS</h1><p>Coming soon...</p></div>;

function App() {
  return (
    <Router>
      <div className="app">
        <TopBar />
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/markets" element={<MarketsScreen />} />
          <Route path="/intelligence" element={<IntelligenceScreen />} />
          <Route path="/analysis" element={<AnalysisScreen />} />
          <Route path="/portfolio" element={<PortfolioScreen />} />
          <Route path="/nexus" element={<NexusScreen />} />
          <Route path="/settings" element={<SettingsScreen />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
