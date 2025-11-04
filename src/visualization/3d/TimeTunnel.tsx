import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const TimeTunnel: React.FC = () => {
  const tunnelRef = useRef<THREE.Group>(null);

  // Create tunnel rings
  const rings = useMemo(() => {
    const ringArray = [];
    const ringCount = 50;
    const spacing = 2;

    for (let i = 0; i < ringCount; i++) {
      ringArray.push({
        z: -i * spacing,
        scale: 1 + i * 0.05,
        opacity: 1 - (i / ringCount) * 0.8
      });
    }

    return ringArray;
  }, []);

  // Animate tunnel
  useFrame((state, delta) => {
    if (tunnelRef.current) {
      tunnelRef.current.children.forEach((ring, i) => {
        ring.position.z += delta * 5;

        // Reset ring when it passes camera
        if (ring.position.z > 5) {
          ring.position.z = -rings.length * 2;
        }
      });
    }
  });

  return (
    <group ref={tunnelRef}>
      {rings.map((ring, i) => (
        <mesh key={i} position={[0, 0, ring.z]} scale={ring.scale}>
          <torusGeometry args={[5, 0.1, 16, 100]} />
          <meshBasicMaterial
            color="#00ffff"
            transparent
            opacity={ring.opacity}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}

      {/* Grid floor */}
      <gridHelper args={[100, 50, '#00ffff', '#003333']} position={[0, -5, 0]} />
    </group>
  );
};