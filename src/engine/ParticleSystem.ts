import * as THREE from 'three';
import { particleVertexShader, particleFragmentShader } from '@/shaders/particle.glsl';

export interface ParticleConfig {
  count: number;
  size: number;
  color: THREE.Color;
  spread: number;
  speed: number;
  lifetime: number;
}

export class ParticleSystem {
  private geometry: THREE.BufferGeometry;
  private material: THREE.ShaderMaterial;
  private points: THREE.Points;
  private particles: Particle[] = [];
  private config: ParticleConfig;

  constructor(config: ParticleConfig) {
    this.config = config;

    // Geometry
    this.geometry = new THREE.BufferGeometry();

    // Material
    this.material = new THREE.ShaderMaterial({
      vertexShader: particleVertexShader,
      fragmentShader: particleFragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });

    // Points
    this.points = new THREE.Points(this.geometry, this.material);

    // Initialize particles
    this.initParticles();
  }

  private initParticles(): void {
    const positions: number[] = [];
    const sizes: number[] = [];
    const colors: number[] = [];
    const alphas: number[] = [];

    for (let i = 0; i < this.config.count; i++) {
      const particle = this.createParticle();
      this.particles.push(particle);

      positions.push(particle.position.x, particle.position.y, particle.position.z);
      sizes.push(particle.size);
      colors.push(particle.color.r, particle.color.g, particle.color.b);
      alphas.push(particle.alpha);
    }

    this.geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    this.geometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1));
    this.geometry.setAttribute('customColor', new THREE.Float32BufferAttribute(colors, 3));
    this.geometry.setAttribute('alpha', new THREE.Float32BufferAttribute(alphas, 1));
  }

  private createParticle(): Particle {
    return {
      position: new THREE.Vector3(
        (Math.random() - 0.5) * this.config.spread,
        (Math.random() - 0.5) * this.config.spread,
        (Math.random() - 0.5) * this.config.spread
      ),
      velocity: new THREE.Vector3(
        (Math.random() - 0.5) * this.config.speed,
        (Math.random() - 0.5) * this.config.speed,
        (Math.random() - 0.5) * this.config.speed
      ),
      size: this.config.size * (0.5 + Math.random() * 0.5),
      color: this.config.color.clone(),
      alpha: 1,
      life: this.config.lifetime,
      age: 0
    };
  }

  update(delta: number): void {
    const positions = this.geometry.attributes.position.array as Float32Array;
    const alphas = this.geometry.attributes.alpha.array as Float32Array;

    for (let i = 0; i < this.particles.length; i++) {
      const particle = this.particles[i];

      // Update age
      particle.age += delta;

      // Reset if dead
      if (particle.age >= particle.life) {
        const newParticle = this.createParticle();
        this.particles[i] = newParticle;
        particle.position.copy(newParticle.position);
        particle.velocity.copy(newParticle.velocity);
        particle.age = 0;
      }

      // Update position
      particle.position.add(particle.velocity.clone().multiplyScalar(delta));

      // Update alpha based on life
      particle.alpha = 1 - (particle.age / particle.life);

      // Update buffers
      const i3 = i * 3;
      positions[i3] = particle.position.x;
      positions[i3 + 1] = particle.position.y;
      positions[i3 + 2] = particle.position.z;
      alphas[i] = particle.alpha;
    }

    this.geometry.attributes.position.needsUpdate = true;
    this.geometry.attributes.alpha.needsUpdate = true;
  }

  getMesh(): THREE.Points {
    return this.points;
  }

  dispose(): void {
    this.geometry.dispose();
    this.material.dispose();
  }
}

interface Particle {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  size: number;
  color: THREE.Color;
  alpha: number;
  life: number;
  age: number;
}