import * as THREE from 'three';

interface AnimationState {
  name: string;
  weight: number;
  timeScale: number;
  loop: boolean;
}

export class AnimationController {
  private mixer: THREE.AnimationMixer;
  private animations: Map<string, THREE.AnimationAction>;
  private currentState: AnimationState | null = null;
  private transitionDuration: number = 0.5;

  constructor(model: THREE.Object3D) {
    this.mixer = new THREE.AnimationMixer(model);
    this.animations = new Map();
  }

  public addAnimation(name: string, clip: THREE.AnimationClip): void {
    const action = this.mixer.clipAction(clip);
    this.animations.set(name, action);
  }

  public playAnimation(name: string, options: Partial<AnimationState> = {}): void {
    const action = this.animations.get(name);
    if (!action) {
      console.warn(`Animation "${name}" not found`);
      return;
    }

    const newState: AnimationState = {
      name,
      weight: options.weight ?? 1,
      timeScale: options.timeScale ?? 1,
      loop: options.loop ?? true
    };

    this.transitionTo(newState);
  }

  private transitionTo(newState: AnimationState): void {
    const oldAction = this.currentState ? this.animations.get(this.currentState.name) : null;
    const newAction = this.animations.get(newState.name);

    if (oldAction === newAction) return;

    if (newAction) {
      newAction.reset();
      newAction.setEffectiveWeight(newState.weight);
      newAction.setEffectiveTimeScale(newState.timeScale);
      newAction.setLoop(newState.loop ? THREE.LoopRepeat : THREE.LoopOnce, Infinity);

      if (oldAction) {
        newAction.time = 0;
        newAction.enabled = true;
        newAction.crossFadeFrom(oldAction, this.transitionDuration, true);
      }

      newAction.play();
    }

    this.currentState = newState;
  }

  public update(deltaTime: number): void {
    if (this.mixer) {
      this.mixer.update(deltaTime);
    }
  }

  public setAnimationSpeed(name: string, timeScale: number): void {
    const action = this.animations.get(name);
    if (action) {
      action.setEffectiveTimeScale(timeScale);
    }
  }

  public setAnimationWeight(name: string, weight: number): void {
    const action = this.animations.get(name);
    if (action) {
      action.setEffectiveWeight(weight);
    }
  }

  public stopAllAnimations(): void {
    this.animations.forEach(action => action.stop());
    this.currentState = null;
  }

  public dispose(): void {
    this.mixer.stopAllAction();
    this.mixer.uncacheRoot(this.mixer.getRoot());
  }
} 