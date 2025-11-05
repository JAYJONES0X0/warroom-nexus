import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, PerspectiveCamera } from '@react-three/drei';
import { Planet } from './Planet';
import { useWARROOMStore } from '@/lib/store';

export function OrbitalScene() {
  const planets = useWARROOMStore(state => state.planets);

  return (
    <div className="w-full h-full">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 20, 40]} fov={60} />
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={10}
          maxDistance={100}
          autoRotate={false}
        />

        {/* Lighting */}
        <ambientLight intensity={0.3} />
        <pointLight position={[0, 0, 0]} intensity={2} color="#00ff88" />
        <pointLight position={[20, 20, 20]} intensity={0.5} />
        <pointLight position={[-20, -20, -20]} intensity={0.5} />

        {/* Background */}
        <Stars radius={300} depth={50} count={5000} factor={4} fade speed={1} />

        {/* Central Sun (Market Data Hub) */}
        <mesh>
          <sphereGeometry args={[2.5, 64, 64]} />
          <meshStandardMaterial
            color="#00ff88"
            emissive="#00ff88"
            emissiveIntensity={1.5}
            roughness={0.5}
            metalness={0.5}
          />
        </mesh>

        {/* Glow effect for sun */}
        <mesh>
          <sphereGeometry args={[3, 32, 32]} />
          <meshBasicMaterial
            color="#00ff88"
            transparent
            opacity={0.2}
          />
        </mesh>

        {/* Planets */}
        {planets.map((planet) => (
          <Planet key={planet.id} planet={planet} />
        ))}

        {/* Grid helper */}
        <gridHelper args={[100, 50, '#00ff88', '#003322']} />
      </Canvas>
    </div>
  );
}