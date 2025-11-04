import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { oceanVertexShader, oceanFragmentShader } from '@/shaders/ocean.glsl';

export const LiquidityOcean: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  const uniforms = React.useMemo(() => ({
    time: { value: 0 },
    waveHeight: { value: 0.5 },
    waveFrequency: { value: 0.5 },
    deepColor: { value: new THREE.Color('#001a33') },
    shallowColor: { value: new THREE.Color('#00ffff') }
  }), []);

  useFrame((state, delta) => {
    if (meshRef.current) {
      uniforms.time.value += delta;
    }
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]}>
      <planeGeometry args={[50, 50, 128, 128]} />
      <shaderMaterial
        vertexShader={oceanVertexShader}
        fragmentShader={oceanFragmentShader}
        uniforms={uniforms}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};