import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const NeuralPathways: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);

  // Generate neural network structure
  const network = useMemo(() => {
    const nodes: THREE.Vector3[] = [];
    const connections: [number, number][] = [];

    // Create layers
    const layers = [5, 8, 8, 5];
    let nodeIndex = 0;

    layers.forEach((nodeCount, layerIndex) => {
      const layerZ = layerIndex * 3 - 4.5;

      for (let i = 0; i < nodeCount; i++) {
        const y = (i - nodeCount / 2) * 1.5;
        nodes.push(new THREE.Vector3(0, y, layerZ));

        // Connect to previous layer
        if (layerIndex > 0) {
          const prevLayerStart = nodeIndex - layers[layerIndex - 1];
          const prevLayerEnd = nodeIndex;

          for (let j = prevLayerStart; j < prevLayerEnd; j++) {
            connections.push([j, nodeIndex]);
          }
        }

        nodeIndex++;
      }
    });

    return { nodes, connections };
  }, []);

  // Animate pulse
  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.elapsedTime;
      groupRef.current.rotation.y = Math.sin(time * 0.2) * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Nodes */}
      {network.nodes.map((position, i) => (
        <mesh key={`node-${i}`} position={position}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial
            color="#00ffff"
            emissive="#00ffff"
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}

      {/* Connections */}
      {network.connections.map(([start, end], i) => {
        const startPos = network.nodes[start];
        const endPos = network.nodes[end];

        return (
          <line key={`connection-${i}`}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={2}
                array={new Float32Array([
                  startPos.x, startPos.y, startPos.z,
                  endPos.x, endPos.y, endPos.z
                ])}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial color="#00ffff" transparent opacity={0.3} />
          </line>
        );
      })}
    </group>
  );
};