import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

interface ModelConfig {
  position: [number, number, number];
  scale: [number, number, number];
  rotation?: [number, number, number];
  animations?: string[];
}

interface LoadedModel {
  model: THREE.Group;
  animations: Map<string, THREE.AnimationClip>;
  boundingBox: THREE.Box3;
}

export class ModelLoader {
  private loader: GLTFLoader;
  private modelCache: Map<string, LoadedModel>;
  private loadingPromises: Map<string, Promise<LoadedModel>>;

  constructor() {
    this.loader = new GLTFLoader();
    this.modelCache = new Map();
    this.loadingPromises = new Map();
  }

  public async loadModel(modelPath: string, config: ModelConfig): Promise<LoadedModel> {
    console.log('Loading model:', modelPath);

    if (modelPath.includes('deepar')) {
      await this.simulateLoading();
      return this.createMockModel(config);
    }


    if (this.modelCache.has(modelPath)) {
      return this.modelCache.get(modelPath)!;
    }

    if (this.loadingPromises.has(modelPath)) {
      return this.loadingPromises.get(modelPath)!;
    }

    const loadingPromise = this.loadModelFromPath(modelPath, config);
    this.loadingPromises.set(modelPath, loadingPromise);

    try {
      const loadedModel = await loadingPromise;
      this.modelCache.set(modelPath, loadedModel);
      this.loadingPromises.delete(modelPath);
      return loadedModel;
    } catch (error) {
      this.loadingPromises.delete(modelPath);
      throw error;
    }
  }

  private async loadModelFromPath(modelPath: string, config: ModelConfig): Promise<LoadedModel> {
    await this.simulateLoading();
    return this.createMockModel(config);
  }

  private createMockModel(config: ModelConfig): LoadedModel {
    const group = new THREE.Group();
    
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({ color: 0x808080 });
    const mesh = new THREE.Mesh(geometry, material);
    
    group.add(mesh);
    
    group.position.set(...config.position);
    group.scale.set(...config.scale);
    if (config.rotation) {
      group.rotation.set(...config.rotation);
    }

    const animations = new Map<string, THREE.AnimationClip>();
    if (config.animations) {
      config.animations.forEach(name => {
        animations.set(name, this.createMockAnimation(name));
      });
    }

    return {
      model: group,
      animations,
      boundingBox: new THREE.Box3().setFromObject(group)
    };
  }

  private createMockAnimation(name: string): THREE.AnimationClip {
    return new THREE.AnimationClip(name, 1, [
      new THREE.NumberKeyframeTrack(
        '.rotation[x]',
        [0, 0.5, 1],
        [0, Math.PI, Math.PI * 2]
      )
    ]);
  }

  private async simulateLoading(): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, Math.random() * 500 + 300));
  }

  public clearCache(): void {
    this.modelCache.clear();
  }
} 