import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useNexusStore } from '@/core/StateManager';
import { Text } from '@react-three/drei';

export const MarketSphere: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const markets = useNexusStore(state => state.markets);
  const activeSymbol = useNexusStore(state => state.activeSymbol);

  // Convert markets to array
  const marketArray = useMemo(() => Array.from(markets.values()), [markets]);

  // Animate rotation
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1;
    }
  });

  // Position markets on sphere
  const marketPositions = useMemo(() => {
    const radius = 8;
    return marketArray.map((market, i) => {
      const phi = Math.acos(-1 + (2 * i) / marketArray.length);
      const theta = Math.sqrt(marketArray.length * Math.PI) * phi;

      return {
        position: new THREE.Vector3(
          radius * Math.cos(theta) * Math.sin(phi),
          radius * Math.sin(theta) * Math.sin(phi),
          radius * Math.cos(phi)
        ),
        market
      };
    });
  }, [marketArray]);

  return (
    <group ref={groupRef}>
      {/* Sphere wireframe */}
      <mesh>
        <sphereGeometry args={[8, 32, 32]} />
        <meshBasicMaterial 
          color="#00ffff" 
          wireframe 
          transparent 
          opacity={0.1} 
        />
      </mesh>

      {/* Market points */}
      {marketPositions.map(({ position, market }, i) => (
        <group key={market.symbol} position={position}>
          {/* Market sphere */}
          <mesh>
            <sphereGeometry args={[0.2, 16, 16]} />
            <meshStandardMaterial
              color={market.change24h >= 0 ? '#00ff00' : '#ff0000'}
              emissive={market.symbol === activeSymbol ? '#00ffff' : '#000000'}
              emissiveIntensity={market.symbol === activeSymbol ? 0.5 : 0}
            />
          </mesh>

          {/* Symbol label */}
          <Text
            position={[0, 0.4, 0]}
            fontSize={0.3}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
          >
            {market.symbol}
          </Text>

          {/* Price label */}
          <Text
            position={[0, -0.4, 0]}
            fontSize={0.2}
            color={market.change24h >= 0 ? '#00ff00' : '#ff0000'}
            anchorX="center"
            anchorY="middle"
          >
            ${market.price.toFixed(2)}
          </Text>

          {/* Connection to center */}
          <line>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={2}
                array={new Float32Array([0, 0, 0, -position.x, -position.y, -position.z])}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial color="#00ffff" transparent opacity={0.2} />
          </line>
        </group>
      ))}

      {/* Central core */}
      <mesh>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial
          color="#00ffff"
          emissive="#00ffff"
          emissiveIntensity={0.5}
          transparent
          opacity={0.8}
        />
      </mesh>
    </group>
  );
};