import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Bell, Sun, Moon, Settings, User } from 'lucide-react';
import '../styles/solar/topbar.css';

export const TopBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [showNotifications, setShowNotifications] = useState(false);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    // TODO: Implement theme switching
  };

  const isHome = location.pathname === '/';

  return (
    <div className="top-bar">
      {/* Logo */}
      <div className="top-bar-logo" onClick={() => navigate('/')}>
        <div className="logo-icon">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="14" stroke="#00d4ff" strokeWidth="2" />
            <circle cx="16" cy="16" r="8" fill="#00d4ff" opacity="0.3" />
            <path d="M16 4 L16 28 M4 16 L28 16" stroke="#00d4ff" strokeWidth="1.5" />
          </svg>
        </div>
        <span className="logo-text">WARROOM NEXUS</span>
      </div>

      {/* Right side icons */}
      <div className="top-bar-actions">
        {/* Notifications */}
        <button 
          className="top-bar-icon"
          onClick={() => setShowNotifications(!showNotifications)}
          title="Notifications"
        >
          <Bell size={20} />
          <span className="notification-badge">3</span>
        </button>

        {/* Theme toggle */}
        <button 
          className="top-bar-icon"
          onClick={toggleTheme}
          title="Toggle theme"
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* Settings */}
        <button 
          className="top-bar-icon"
          onClick={() => navigate('/settings')}
          title="Settings"
        >
          <Settings size={20} />
        </button>

        {/* User profile */}
        <button 
          className="top-bar-icon user-icon"
          title="Profile"
        >
          <User size={20} />
        </button>
      </div>

      {/* Notifications dropdown */}
      {showNotifications && (
        <div className="notifications-dropdown">
          <div className="notification-header">Notifications</div>
          <div className="notification-item">
            <div className="notification-title">Market Alert</div>
            <div className="notification-text">EUR/USD reached target level</div>
            <div className="notification-time">2 minutes ago</div>
          </div>
          <div className="notification-item">
            <div className="notification-title">News Update</div>
            <div className="notification-text">Fed announces rate decision</div>
            <div className="notification-time">15 minutes ago</div>
          </div>
          <div className="notification-item">
            <div className="notification-title">System</div>
            <div className="notification-text">Data sources connected: 4/6</div>
            <div className="notification-time">1 hour ago</div>
          </div>
        </div>
      )}
    </div>
  );
};
