import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';

interface RenderConfig {
  resolution: number;
  quality: 'high' | 'medium' | 'low';
  antialiasing: boolean;
}

export class ThreeJSRenderer {
  private renderer: THREE.WebGLRenderer;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private composer: EffectComposer;
  private clock: THREE.Clock;

  constructor() {
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.composer = new EffectComposer(this.renderer);
    this.clock = new THREE.Clock();
  }

  public async initialize(config: RenderConfig): Promise<void> {
    console.log('Initializing ThreeJS Renderer...');
    
    this.setupRenderer(config);
    this.setupScene();
    this.setupPostProcessing();
    
    window.addEventListener('resize', this.handleResize.bind(this));
  }

  private setupRenderer(config: RenderConfig): void {
    this.renderer.setPixelRatio(window.devicePixelRatio * config.resolution);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = config.quality !== 'low';
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  }

  private setupScene(): void {
    this.scene.fog = new THREE.FogExp2(0x000000, 0.001);
    this.camera.position.set(0, 2, 5);
    
    const ambientLight = new THREE.AmbientLight(0x404040);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    this.scene.add(ambientLight, directionalLight);
  }

  private setupPostProcessing(): void {
    const renderPass = new RenderPass(this.scene, this.camera);
    this.composer.addPass(renderPass);
  }

  private handleResize(): void {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
    this.composer.setSize(width, height);
  }

  public render(): void {
    const delta = this.clock.getDelta();
    this.composer.render(delta);
  }
} 