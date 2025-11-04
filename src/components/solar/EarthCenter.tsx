import React, { useRef, useMemo } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { MARKET_SESSIONS } from '../../config/planets';

interface EarthCenterProps {
  rotationSpeed?: number;
}

export const EarthCenter: React.FC<EarthCenterProps> = ({ rotationSpeed = 0.0005 }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  // Create Earth texture
  const earthTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;

    // Base ocean color
    const gradient = ctx.createLinearGradient(0, 0, 1024, 512);
    gradient.addColorStop(0, '#0a4d68');
    gradient.addColorStop(0.5, '#088395');
    gradient.addColorStop(1, '#05445e');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1024, 512);

    // Continents (simplified)
    ctx.fillStyle = '#2d5016';

    // North America
    ctx.beginPath();
    ctx.ellipse(200, 150, 80, 60, 0, 0, Math.PI * 2);
    ctx.fill();

    // South America
    ctx.beginPath();
    ctx.ellipse(250, 300, 50, 80, 0.3, 0, Math.PI * 2);
    ctx.fill();

    // Europe
    ctx.beginPath();
    ctx.ellipse(520, 140, 60, 40, 0, 0, Math.PI * 2);
    ctx.fill();

    // Africa
    ctx.beginPath();
    ctx.ellipse(540, 280, 70, 90, 0, 0, Math.PI * 2);
    ctx.fill();

    // Asia
    ctx.beginPath();
    ctx.ellipse(750, 160, 120, 80, 0, 0, Math.PI * 2);
    ctx.fill();

    // Australia
    ctx.beginPath();
    ctx.ellipse(850, 350, 50, 40, 0, 0, Math.PI * 2);
    ctx.fill();

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, []);

  // Determine active sessions
  const activeSessions = useMemo(() => {
    const now = new Date();
    const utcHour = now.getUTCHours();

    return MARKET_SESSIONS.map(session => {
      let isActive = false;
      if (session.openHour < session.closeHour) {
        isActive = utcHour >= session.openHour && utcHour < session.closeHour;
      } else {
        isActive = utcHour >= session.openHour || utcHour < session.closeHour;
      }
      return { ...session, isActive };
    });
  }, []);

  // Rotation animation
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += rotationSpeed;
    }
  });

  // Convert lat/lon to 3D position
  const latLonToVector3 = (lat: number, lon: number, radius: number) => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);

    const x = -(radius * Math.sin(phi) * Math.cos(theta));
    const z = radius * Math.sin(phi) * Math.sin(theta);
    const y = radius * Math.cos(phi);

    return new THREE.Vector3(x, y, z);
  };

  return (
    <group>
      {/* Earth sphere */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[3, 64, 64]} />
        <meshStandardMaterial
          map={earthTexture}
          roughness={0.8}
          metalness={0.2}
        />
      </mesh>

      {/* Atmosphere glow */}
      <mesh ref={glowRef} scale={1.05}>
        <sphereGeometry args={[3, 64, 64]} />
        <meshBasicMaterial
          color="#4da6ff"
          transparent
          opacity={0.15}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Session highlights */}
      {activeSessions.map(session => {
        if (!session.isActive) return null;

        const position = latLonToVector3(session.position.lat, session.position.lon, 3.1);

        return (
          <group key={session.name}>
            {/* Glow marker */}
            <mesh position={position}>
              <sphereGeometry args={[0.15, 16, 16]} />
              <meshBasicMaterial
                color={session.color}
                transparent
                opacity={0.8}
              />
            </mesh>

            {/* Pulsing ring */}
            <mesh position={position} rotation={[Math.PI / 2, 0, 0]}>
              <ringGeometry args={[0.2, 0.3, 32]} />
              <meshBasicMaterial
                color={session.color}
                transparent
                opacity={0.5}
                side={THREE.DoubleSide}
              />
            </mesh>
          </group>
        );
      })}

      {/* Ambient point lights for session regions */}
      {activeSessions.map(session => {
        if (!session.isActive) return null;
        const position = latLonToVector3(session.position.lat, session.position.lon, 5);
        return (
          <pointLight
            key={`light-${session.name}`}
            position={position}
            color={session.color}
            intensity={0.5}
            distance={8}
          />
        );
      })}
    </group>
  );
};
