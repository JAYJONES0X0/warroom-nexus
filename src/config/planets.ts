import { PlanetConfig } from '../types/solar';

export const PLANETS: PlanetConfig[] = [
  {
    id: 'markets',
    name: 'MARKETS',
    route: '/markets',
    color: '#00d4ff',
    size: 1.2,
    orbitRadius: 8,
    orbitSpeed: 0.0003,
    rotationSpeed: 0.002,
    texture: 'markets',
    description: 'Global market overview and asset explorer',
    icon: '🌍'
  },
  {
    id: 'intelligence',
    name: 'INTELLIGENCE',
    route: '/intelligence',
    color: '#ff00ff',
    size: 1.1,
    orbitRadius: 8,
    orbitSpeed: 0.0003,
    rotationSpeed: 0.0025,
    texture: 'intelligence',
    description: '9-Layer EXA Protocol analysis engine',
    icon: '🧠'
  },
  {
    id: 'analysis',
    name: 'ANALYSIS',
    route: '/analysis',
    color: '#ff6b00',
    size: 1.0,
    orbitRadius: 8,
    orbitSpeed: 0.0003,
    rotationSpeed: 0.003,
    texture: 'analysis',
    description: 'Deep dive technical analysis tools',
    icon: '📊'
  },
  {
    id: 'portfolio',
    name: 'PORTFOLIO',
    route: '/portfolio',
    color: '#ffd700',
    size: 1.15,
    orbitRadius: 8,
    orbitSpeed: 0.0003,
    rotationSpeed: 0.0022,
    texture: 'portfolio',
    description: 'Position tracking and performance metrics',
    icon: '💼'
  },
  {
    id: 'nexus',
    name: 'NEXUS',
    route: '/nexus',
    color: '#00ffff',
    size: 1.05,
    orbitRadius: 8,
    orbitSpeed: 0.0003,
    rotationSpeed: 0.0028,
    texture: 'nexus',
    description: 'News, events, and market intelligence',
    icon: '📰'
  },
  {
    id: 'settings',
    name: 'SETTINGS',
    route: '/settings',
    color: '#888888',
    size: 0.95,
    orbitRadius: 8,
    orbitSpeed: 0.0003,
    rotationSpeed: 0.0032,
    texture: 'settings',
    description: 'Configuration and API management',
    icon: '⚙️'
  }
];

export const MARKET_SESSIONS = [
  {
    name: 'Sydney' as const,
    timezone: 'Australia/Sydney',
    openHour: 22,
    closeHour: 7,
    color: '#9b59b6',
    position: { lat: -33.8688, lon: 151.2093 }
  },
  {
    name: 'Tokyo' as const,
    timezone: 'Asia/Tokyo',
    openHour: 0,
    closeHour: 9,
    color: '#e74c3c',
    position: { lat: 35.6762, lon: 139.6503 }
  },
  {
    name: 'London' as const,
    timezone: 'Europe/London',
    openHour: 8,
    closeHour: 17,
    color: '#2ecc71',
    position: { lat: 51.5074, lon: -0.1278 }
  },
  {
    name: 'New York' as const,
    timezone: 'America/New_York',
    openHour: 13,
    closeHour: 22,
    color: '#3498db',
    position: { lat: 40.7128, lon: -74.0060 }
  }
];
