import * as THREE from 'three';

export class MatrixTransforms {
  private tempMatrix: THREE.Matrix4;
  private tempVector: THREE.Vector3;
  private tempQuaternion: THREE.Quaternion;

  constructor() {
    this.tempMatrix = new THREE.Matrix4();
    this.tempVector = new THREE.Vector3();
    this.tempQuaternion = new THREE.Quaternion();
  }

  public computeWorldMatrix(position: THREE.Vector3, rotation: THREE.Euler, scale: THREE.Vector3): THREE.Matrix4 {
    return new THREE.Matrix4()
      .compose(position, this.tempQuaternion.setFromEuler(rotation), scale);
  }

  public decomposeMatrix(matrix: THREE.Matrix4): {
    position: THREE.Vector3;
    rotation: THREE.Euler;
    scale: THREE.Vector3;
  } {
    const position = new THREE.Vector3();
    const rotation = new THREE.Euler();
    const scale = new THREE.Vector3();
    
    matrix.decompose(position, this.tempQuaternion, scale);
    rotation.setFromQuaternion(this.tempQuaternion);

    return { position, rotation, scale };
  }

  public applyTransform(object: THREE.Object3D, matrix: THREE.Matrix4): void {
    const decomposed = this.decomposeMatrix(matrix);
    object.position.copy(decomposed.position);
    object.rotation.copy(decomposed.rotation);
    object.scale.copy(decomposed.scale);
  }

  public interpolateMatrices(matrixA: THREE.Matrix4, matrixB: THREE.Matrix4, t: number): THREE.Matrix4 {
    const decomposeA = this.decomposeMatrix(matrixA);
    const decomposeB = this.decomposeMatrix(matrixB);

    const position = new THREE.Vector3().lerpVectors(decomposeA.position, decomposeB.position, t);
    const quaternion = new THREE.Quaternion().slerpQuaternions(
      new THREE.Quaternion().setFromEuler(decomposeA.rotation),
      new THREE.Quaternion().setFromEuler(decomposeB.rotation),
      t
    );
    const scale = new THREE.Vector3().lerpVectors(decomposeA.scale, decomposeB.scale, t);

    return new THREE.Matrix4().compose(position, quaternion, scale);
  }

  public createViewMatrix(camera: THREE.Camera): THREE.Matrix4 {
    return camera.matrixWorldInverse.clone();
  }

  public createProjectionMatrix(camera: THREE.PerspectiveCamera): THREE.Matrix4 {
    return camera.projectionMatrix.clone();
  }
} 