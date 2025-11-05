import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Html } from '@react-three/drei';
import * as THREE from 'three';
import { Planet as PlanetType } from '@/types/orbital';
import { useWARROOMStore } from '@/lib/store';

interface PlanetProps {
  planet: PlanetType;
}

export function Planet({ planet }: PlanetProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const selectedPlanet = useWARROOMStore(state => state.selectedPlanet);
  const selectPlanet = useWARROOMStore(state => state.selectPlanet);

  const isSelected = selectedPlanet === planet.id;

  useFrame((state) => {
    if (!meshRef.current) return;

    // Rotation
    meshRef.current.rotation.y += planet.rotationSpeed;

    // Orbit
    if (planet.orbitRadius > 0) {
      const time = state.clock.getElapsedTime();
      const angle = time * planet.orbitSpeed;
      meshRef.current.position.x = Math.cos(angle) * planet.orbitRadius;
      meshRef.current.position.z = Math.sin(angle) * planet.orbitRadius;
    }

    // Hover effect
    const scale = isSelected ? 1.2 : hovered ? 1.1 : 1;
    meshRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1);
  });

  return (
    <group>
      <Sphere
        ref={meshRef}
        args={[planet.radius, 64, 64]}
        position={planet.position}
        onClick={() => selectPlanet(planet.id)}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <meshStandardMaterial
          color={planet.color}
          emissive={planet.color}
          emissiveIntensity={isSelected ? 0.8 : hovered ? 0.5 : 0.2}
          roughness={0.7}
          metalness={0.3}
        />
      </Sphere>

      {/* Orbit path */}
      {planet.orbitRadius > 0 && (
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[planet.orbitRadius - 0.05, planet.orbitRadius + 0.05, 128]} />
          <meshBasicMaterial
            color={planet.color}
            transparent
            opacity={0.2}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}

      {/* Label */}
      {(hovered || isSelected) && (
        <Html position={[0, planet.radius + 1, 0]} center>
          <div className="bg-black/80 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap border border-white/20">
            {planet.name}
          </div>
        </Html>
      )}

      {/* Selection indicator */}
      {isSelected && (
        <Sphere args={[planet.radius + 0.3, 32, 32]} position={planet.position}>
          <meshBasicMaterial
            color={planet.color}
            transparent
            opacity={0.1}
            wireframe
          />
        </Sphere>
      )}
    </group>
  );
}