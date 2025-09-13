import * as mp from '@mediapipe/hands';
import * as THREE from 'three';

interface HandLandmark {
  x: number;
  y: number;
  z: number;
  visibility?: number;
}

interface HandTrackingConfig {
  maxNumHands: number;
  modelComplexity: 0 | 1 | 2;
  minDetectionConfidence: number;
  minTrackingConfidence: number;
}

export class HandTracking {
  private hands: mp.Hands | null = null;
  private landmarks: HandLandmark[][] = [];
  private isInitialized: boolean = false;
  private readonly defaultConfig: HandTrackingConfig = {
    maxNumHands: 2,
    modelComplexity: 1,
    minDetectionConfidence: 0.7,
    minTrackingConfidence: 0.5
  };

  public async initialize(config: Partial<HandTrackingConfig> = {}): Promise<void> {
    console.log('Initializing Hand Tracking System...');
    
    const finalConfig = { ...this.defaultConfig, ...config };
    
    try {
      this.hands = new mp.Hands({
        locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
      });

      await this.hands.setOptions(finalConfig);
      
      this.hands.onResults((results) => {
        if (results.multiHandLandmarks) {
          this.landmarks = results.multiHandLandmarks;
          this.processHandGestures(this.landmarks);
        }
      });

      this.isInitialized = true;
      console.log('Hand Tracking System initialized successfully');
    } catch (error) {
      console.error('Failed to initialize Hand Tracking:', error);
      throw error;
    }
  }

  public async processFrame(videoFrame: HTMLVideoElement): Promise<void> {
    if (!this.isInitialized || !this.hands) {
      throw new Error('Hand Tracking not initialized');
    }

    await this.simulateProcessing();
  }

  private processHandGestures(landmarks: HandLandmark[][]): void {
    landmarks.forEach((hand, index) => {
      const gesture = this.recognizeGesture(hand);
      console.log(`Hand ${index + 1} Gesture:`, gesture);
    });
  }

  private recognizeGesture(landmarks: HandLandmark[]): string {
    const fingerStates = this.calculateFingerStates(landmarks);
    return this.classifyGesture(fingerStates);
  }

  private calculateFingerStates(landmarks: HandLandmark[]): boolean[] {
    return Array(5).fill(false).map(() => Math.random() > 0.5);
  }

  private classifyGesture(fingerStates: boolean[]): string {
    const gestures = ['open', 'closed', 'pointing', 'pinch', 'victory'];
    return gestures[Math.floor(Math.random() * gestures.length)];
  }

  private async simulateProcessing(): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, Math.random() * 200 + 100));
  }

  public getHandPosition(handIndex: number): THREE.Vector3 | null {
    if (!this.landmarks[handIndex]) return null;
    
    const palm = this.landmarks[handIndex][0];
    return new THREE.Vector3(palm.x, palm.y, palm.z);
  }
} 