import * as THREE from 'three';

interface TextureOptions {
  format?: THREE.PixelFormat;
  encoding?: THREE.TextureEncoding;
  generateMipmaps?: boolean;
  anisotropy?: number;
}

export class TextureProcessor {
  private textureLoader: THREE.TextureLoader;
  private textureCache: Map<string, THREE.Texture>;

  constructor() {
    this.textureLoader = new THREE.TextureLoader();
    this.textureCache = new Map();
  }

  public async loadTexture(url: string, options: TextureOptions = {}): Promise<THREE.Texture> {
    if (this.textureCache.has(url)) {
      return this.textureCache.get(url)!;
    }

    const texture = await new Promise<THREE.Texture>((resolve, reject) => {
      this.textureLoader.load(
        url,
        (texture) => {
          this.configureTexture(texture, options);
          this.textureCache.set(url, texture);
          resolve(texture);
        },
        undefined,
        reject
      );
    });

    return texture;
  }

  private configureTexture(texture: THREE.Texture, options: TextureOptions): void {
    texture.format = options.format || THREE.RGBAFormat;
    texture.encoding = options.encoding || THREE.sRGBEncoding;
    texture.generateMipmaps = options.generateMipmaps !== false;
    texture.anisotropy = options.anisotropy || 4;
  }

  public processNormalMap(texture: THREE.Texture): THREE.Texture {
    texture.encoding = THREE.LinearEncoding;
    return texture;
  }

  public processEnvironmentMap(texture: THREE.Texture): THREE.Texture {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    return texture;
  }
} 