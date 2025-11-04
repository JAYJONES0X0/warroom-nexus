import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export class SceneManager {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  controls: OrbitControls;
  clock: THREE.Clock;

  private animationId: number | null = null;
  private onRenderCallbacks: ((delta: number) => void)[] = [];

  constructor(canvas: HTMLCanvasElement) {
    // Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x000000);
    this.scene.fog = new THREE.FogExp2(0x000000, 0.02);

    // Camera
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.set(0, 5, 15);

    // Renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.minDistance = 5;
    this.controls.maxDistance = 50;
    this.controls.maxPolarAngle = Math.PI / 2;

    // Clock
    this.clock = new THREE.Clock();

    // Lights
    this.setupLights();

    // Handle resize
    window.addEventListener('resize', this.handleResize.bind(this));
  }

  private setupLights(): void {
    // Ambient light
    const ambient = new THREE.AmbientLight(0xffffff, 0.3);
    this.scene.add(ambient);

    // Main directional light
    const mainLight = new THREE.DirectionalLight(0x00ffff, 1);
    mainLight.position.set(10, 10, 10);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 2048;
    mainLight.shadow.mapSize.height = 2048;
    this.scene.add(mainLight);

    // Accent lights
    const accentLight1 = new THREE.PointLight(0xff00ff, 0.5, 50);
    accentLight1.position.set(-10, 5, -10);
    this.scene.add(accentLight1);

    const accentLight2 = new THREE.PointLight(0x00ff00, 0.5, 50);
    accentLight2.position.set(10, 5, -10);
    this.scene.add(accentLight2);
  }

  private handleResize(): void {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  onRender(callback: (delta: number) => void): () => void {
    this.onRenderCallbacks.push(callback);
    return () => {
      const index = this.onRenderCallbacks.indexOf(callback);
      if (index > -1) {
        this.onRenderCallbacks.splice(index, 1);
      }
    };
  }

  start(): void {
    if (this.animationId !== null) return;

    const animate = () => {
      this.animationId = requestAnimationFrame(animate);

      const delta = this.clock.getDelta();

      // Update controls
      this.controls.update();

      // Call render callbacks
      this.onRenderCallbacks.forEach(callback => callback(delta));

      // Render
      this.renderer.render(this.scene, this.camera);
    };

    animate();
  }

  stop(): void {
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  dispose(): void {
    this.stop();
    this.renderer.dispose();
    this.controls.dispose();
    window.removeEventListener('resize', this.handleResize.bind(this));
  }
}