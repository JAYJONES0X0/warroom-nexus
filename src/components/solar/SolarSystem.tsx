import React, { useState, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';
import { Planet } from './Planet';
import { EarthCenter } from './EarthCenter';
import { PLANETS } from '../../config/planets';

interface SolarSystemProps {
  onPlanetClick: (planetId: string) => void;
}

export const SolarSystem: React.FC<SolarSystemProps> = ({ onPlanetClick }) => {
  const [hoveredPlanet, setHoveredPlanet] = useState<string | null>(null);
  const [planetAngles, setPlanetAngles] = useState<number[]>(
    PLANETS.map((_, i) => (i / PLANETS.length) * Math.PI * 2)
  );

  // Update planet positions
  useFrame((state, delta) => {
    setPlanetAngles(prev => 
      prev.map((angle, i) => angle + PLANETS[i].orbitSpeed)
    );
  });

  return (
    <group>
      {/* Starfield background */}
      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
        speed={0.5}
      />

      {/* Ambient lighting */}
      <ambientLight intensity={0.3} />

      {/* Main directional light (sun) */}
      <directionalLight
        position={[10, 10, 10]}
        intensity={1}
        castShadow
      />

      {/* Fill light */}
      <pointLight position={[-10, -10, -10]} intensity={0.3} />

      {/* Earth at center */}
      <EarthCenter />

      {/* Orbit rings */}
      {PLANETS.map((planet, i) => (
        <mesh key={`orbit-${planet.id}`} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[planet.orbitRadius - 0.02, planet.orbitRadius + 0.02, 128]} />
          <meshBasicMaterial
            color={planet.color}
            transparent
            opacity={hoveredPlanet === planet.id ? 0.3 : 0.1}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}

      {/* Planets */}
      {PLANETS.map((planet, i) => (
        <Planet
          key={planet.id}
          config={planet}
          angle={planetAngles[i]}
          onHover={setHoveredPlanet}
          onClick={onPlanetClick}
          isHovered={hoveredPlanet === planet.id}
        />
      ))}
    </group>
  );
};
