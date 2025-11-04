import React, { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { PlanetConfig } from '../../types/solar';
import { createPlanetTexture } from '../../utils/solar/planetTextures';

interface PlanetProps {
  config: PlanetConfig;
  angle: number;
  onHover: (id: string | null) => void;
  onClick: (id: string) => void;
  isHovered: boolean;
}

export const Planet: React.FC<PlanetProps> = ({ config, angle, onHover, onClick, isHovered }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const [showLabel, setShowLabel] = useState(false);

  // Create planet texture
  const texture = useMemo(() => createPlanetTexture(config.texture, config.color), [config.texture, config.color]);

  // Calculate position on orbit
  const x = Math.cos(angle) * config.orbitRadius;
  const z = Math.sin(angle) * config.orbitRadius;

  // Rotation animation
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += config.rotationSpeed;
    }
  });

  // Show label after hover delay
  React.useEffect(() => {
    if (isHovered) {
      const timer = setTimeout(() => setShowLabel(true), 300);
      return () => clearTimeout(timer);
    } else {
      setShowLabel(false);
    }
  }, [isHovered]);

  return (
    <group ref={groupRef} position={[x, 0, z]}>
      {/* Planet sphere */}
      <mesh
        ref={meshRef}
        onPointerOver={() => onHover(config.id)}
        onPointerOut={() => onHover(null)}
        onClick={() => onClick(config.id)}
        scale={isHovered ? config.size * 1.2 : config.size}
      >
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          map={texture}
          emissive={config.color}
          emissiveIntensity={isHovered ? 0.4 : 0.2}
          roughness={0.7}
          metalness={0.3}
        />
      </mesh>

      {/* Glow effect */}
      <mesh scale={isHovered ? config.size * 1.3 : config.size * 1.1}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          color={config.color}
          transparent
          opacity={isHovered ? 0.3 : 0.15}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Label */}
      {showLabel && (
        <Text
          position={[0, -config.size * 1.5, 0]}
          fontSize={0.4}
          color="white"
          anchorX="center"
          anchorY="top"
          outlineWidth={0.05}
          outlineColor="#000000"
        >
          {config.name}
        </Text>
      )}
    </group>
  );
};
