export interface PlanetConfig {
  id: string;
  name: string;
  route: string;
  color: string;
  size: number;
  orbitRadius: number;
  orbitSpeed: number;
  rotationSpeed: number;
  texture: string;
  description: string;
  icon: string;
}

export interface SessionHighlight {
  name: string;
  region: string;
  color: string;
  position: [number, number, number];
  active: boolean;
  openTime: string;
  closeTime: string;
}

export interface SolarSystemState {
  selectedPlanet: string | null;
  hoveredPlanet: string | null;
  isTransitioning: boolean;
  cameraPosition: [number, number, number];
  earthRotation: number;
}

export interface MarketSession {
  name: 'Sydney' | 'Tokyo' | 'London' | 'New York';
  timezone: string;
  openHour: number;
  closeHour: number;
  color: string;
  position: { lat: number; lon: number };
}
