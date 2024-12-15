import { Vector2, Vector3, Plane, Raycaster } from "three";
import type { Camera, WebGLRenderer } from "three";
import type { Vector3Values } from "../types/common";

function calculateSliderValue(currentTime: number, duration: number): number {
  return (currentTime / duration) * 100 || 0;
}

function getPlane() {
  return new Plane(new Vector3(0, 1, 0), 0);
}

function calculateIntersectPoint(
  plane: Plane,
  event: MouseEvent,
  camera: Camera,
  gl: WebGLRenderer,
): Vector3 {
  const raycaster = new Raycaster();
  const mouse = new Vector2(
    (event.clientX / gl.domElement.clientWidth) * 2 - 1,
    -(event.clientY / gl.domElement.clientHeight) * 2 + 1,
  );
  const intersectPoint = new Vector3();

  raycaster.setFromCamera(mouse, camera);
  raycaster.ray.intersectPlane(plane, intersectPoint);

  return intersectPoint;
}

function calculateNewPosition(
  initialPosition: Vector3,
  currentIntersect: Vector3,
  initialIntersect: Vector3,
) {
  const delta = currentIntersect.clone().sub(initialIntersect);

  return initialPosition.clone().add(delta);
}

function constrainPosition(
  newPosition: Vector3,
  size: number,
  ROOM_SIZE: number,
) {
  const halfSize = ROOM_SIZE / 2 - size;

  newPosition.x = Math.max(-halfSize, Math.min(halfSize, newPosition.x));
  newPosition.z = Math.max(-halfSize, Math.min(halfSize, newPosition.z));
}

function calculatePan(
  listenerPosition: Vector3Values,
  speakerPosition: Vector3Values,
): number {
  const distanceX = listenerPosition[0] - speakerPosition[0];
  const distanceZ = listenerPosition[2] - speakerPosition[2];

  const azimuth = Math.atan2(distanceX, distanceZ);

  const pan = Math.cos(azimuth);

  return pan;
}

export {
  calculateSliderValue,
  getPlane,
  calculateIntersectPoint,
  calculateNewPosition,
  constrainPosition,
  calculatePan,
};
