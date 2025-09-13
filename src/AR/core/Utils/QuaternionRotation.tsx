import * as THREE from 'three';

export class QuaternionRotation {
  private tempQuaternion: THREE.Quaternion;
  private tempEuler: THREE.Euler;
  private tempVector: THREE.Vector3;

  constructor() {
    this.tempQuaternion = new THREE.Quaternion();
    this.tempEuler = new THREE.Euler();
    this.tempVector = new THREE.Vector3();
  }

  public eulerToQuaternion(euler: THREE.Euler): THREE.Quaternion {
    return new THREE.Quaternion().setFromEuler(euler);
  }

  public quaternionToEuler(quaternion: THREE.Quaternion): THREE.Euler {
    return new THREE.Euler().setFromQuaternion(quaternion);
  }

  public slerp(qa: THREE.Quaternion, qb: THREE.Quaternion, t: number): THREE.Quaternion {
    return new THREE.Quaternion().slerpQuaternions(qa, qb, t);
  }

  public lookAt(sourcePosition: THREE.Vector3, targetPosition: THREE.Vector3): THREE.Quaternion {
    this.tempVector.subVectors(targetPosition, sourcePosition).normalize();
    return new THREE.Quaternion().setFromRotationMatrix(
      new THREE.Matrix4().lookAt(this.tempVector, new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 1, 0))
    );
  }

  public rotateTowards(current: THREE.Quaternion, target: THREE.Quaternion, maxAngle: number): THREE.Quaternion {
    const result = current.clone();
    result.rotateTowards(target, maxAngle);
    return result;
  }

  public getRelativeRotation(sourceQuat: THREE.Quaternion, targetQuat: THREE.Quaternion): THREE.Quaternion {
    return targetQuat.clone().multiply(sourceQuat.clone().invert());
  }

  public applyAxisAngle(quaternion: THREE.Quaternion, axis: THREE.Vector3, angle: number): THREE.Quaternion {
    return quaternion.clone().multiply(
      new THREE.Quaternion().setFromAxisAngle(axis.normalize(), angle)
    );
  }

  public decomposeRotation(quaternion: THREE.Quaternion): {
    yaw: number;
    pitch: number;
    roll: number;
  } {
    this.tempEuler.setFromQuaternion(quaternion, 'YXZ');
    return {
      yaw: this.tempEuler.y,
      pitch: this.tempEuler.x,
      roll: this.tempEuler.z
    };
  }
} 