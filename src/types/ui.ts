import { ReactNode } from 'react';

export interface PanelConfig {
  id: string;
  title: string;
  position: { x: number; y: number; z: number };
  size: { width: number; height: number };
  visible: boolean;
  locked: boolean;
  opacity: number;
}

export interface HUDElement {
  id: string;
  component: ReactNode;
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';
  priority: number;
  contextual: boolean;
}

export interface NavigationState {
  mode: '3d' | '2d' | 'hybrid';
  cameraPosition: [number, number, number];
  cameraTarget: [number, number, number];
  timePosition: number; // Unix timestamp
  activeView: string;
}

export interface GestureEvent {
  type: 'swipe' | 'pinch' | 'rotate' | 'tap' | 'hold';
  direction?: 'up' | 'down' | 'left' | 'right';
  velocity?: number;
  scale?: number;
  rotation?: number;
  position: { x: number; y: number };
}

export interface Theme {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  glow: string;
  danger: string;
  success: string;
}