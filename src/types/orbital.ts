export interface Planet {
  id: string;
  name: string;
  position: [number, number, number];
  radius: number;
  color: string;
  orbitRadius: number;
  orbitSpeed: number;
  rotationSpeed: number;
  texture?: string;
  metadata: {
    category: string;
    description: string;
    dataSource?: string;
  };
}

export interface OrbitalSystemState {
  planets: Planet[];
  selectedPlanet: string | null;
  cameraTarget: [number, number, number];
  isAnimating: boolean;
}

export interface MarketData {
  symbol: string;
  price: number;
  change: number;
  volume: number;
  timestamp: number;
}

export interface EXAScore {
  overall: number;
  layers: {
    layer1_displacement: number;
    layer2_inducement: number;
    layer3_manipulation: number;
    layer4_distribution: number;
    layer5_trend: number;
    layer6_momentum: number;
    layer7_volatility: number;
    layer8_liquidity: number;
    layer9_sentiment: number;
  };
  signal: 'LONG' | 'SHORT' | 'NEUTRAL';
  confidence: number;
}