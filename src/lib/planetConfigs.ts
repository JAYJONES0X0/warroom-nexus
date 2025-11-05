import { Planet } from '@/types/orbital';

export const PLANET_CONFIGS: Planet[] = [
  {
    id: 'market-data',
    name: 'Market Data',
    position: [0, 0, 0],
    radius: 2.5,
    color: '#00ff88',
    orbitRadius: 0,
    orbitSpeed: 0,
    rotationSpeed: 0.001,
    metadata: {
      category: 'core',
      description: 'Real-time market data aggregation',
      dataSource: 'Multi-exchange feed'
    }
  },
  {
    id: 'exa-engine',
    name: 'EXA Engine',
    position: [8, 0, 0],
    radius: 1.8,
    color: '#ff0088',
    orbitRadius: 8,
    orbitSpeed: 0.0005,
    rotationSpeed: 0.002,
    metadata: {
      category: 'analysis',
      description: '9-Layer ICT methodology processor',
      dataSource: 'EXA Protocol v2.0'
    }
  },
  {
    id: 'order-flow',
    name: 'Order Flow',
    position: [12, 0, 0],
    radius: 1.5,
    color: '#0088ff',
    orbitRadius: 12,
    orbitSpeed: 0.0008,
    rotationSpeed: 0.0015,
    metadata: {
      category: 'execution',
      description: 'Order book and flow analysis',
      dataSource: 'Level 2 & 3 data'
    }
  },
  {
    id: 'risk-management',
    name: 'Risk Control',
    position: [16, 0, 0],
    radius: 1.3,
    color: '#ffaa00',
    orbitRadius: 16,
    orbitSpeed: 0.0006,
    rotationSpeed: 0.001,
    metadata: {
      category: 'safety',
      description: 'Position sizing and risk metrics',
      dataSource: 'Portfolio analytics'
    }
  },
  {
    id: 'sentiment',
    name: 'Sentiment',
    position: [20, 0, 0],
    radius: 1.2,
    color: '#aa00ff',
    orbitRadius: 20,
    orbitSpeed: 0.0004,
    rotationSpeed: 0.0012,
    metadata: {
      category: 'intelligence',
      description: 'Market sentiment aggregation',
      dataSource: 'Social & news feeds'
    }
  },
  {
    id: 'execution',
    name: 'Execution',
    position: [10, 5, 0],
    radius: 1.0,
    color: '#00ffff',
    orbitRadius: 11.2,
    orbitSpeed: 0.0007,
    rotationSpeed: 0.0018,
    metadata: {
      category: 'trading',
      description: 'Smart order routing',
      dataSource: 'Multi-venue execution'
    }
  },
  {
    id: 'settings',
    name: 'Settings',
    position: [10, -5, 0],
    radius: 0.9,
    color: '#888888',
    orbitRadius: 11.2,
    orbitSpeed: 0.0003,
    rotationSpeed: 0.0008,
    metadata: {
      category: 'system',
      description: 'System configuration',
      dataSource: 'User preferences'
    }
  }
];

export const SUN_CONFIG = {
  radius: 2.5,
  color: '#00ff88',
  emissiveIntensity: 2,
  glowIntensity: 1.5
};