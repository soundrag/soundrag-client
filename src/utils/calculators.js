import { Vector2, Vector3, Plane, Raycaster } from "three";

const getPlane = (isSpeaker, camera) => {
  return new Plane(
    isSpeaker
      ? camera.getWorldDirection(new Vector3()).negate()
      : new Vector3(0, 1, 0),
    0,
  );
};

const calculateIntersectPoint = (plane, event, camera, gl) => {
  const raycaster = new Raycaster();
  const mouse = new Vector2(
    (event.clientX / gl.domElement.clientWidth) * 2 - 1,
    -(event.clientY / gl.domElement.clientHeight) * 2 + 1,
  );
  const intersectPoint = new Vector3();

  raycaster.setFromCamera(mouse, camera);
  raycaster.ray.intersectPlane(plane, intersectPoint);

  return intersectPoint;
};

const calculateNewPosition = (
  initialPosition,
  currentIntersect,
  initialIntersect,
) => {
  const delta = currentIntersect.clone().sub(initialIntersect);
  return initialPosition.clone().add(delta);
};

const constrainPosition = (
  newPosition,
  isSpeaker,
  size,
  ROOM_SIZE,
  WALL_HEIGHT,
) => {
  const halfSize = ROOM_SIZE / 2 - size;
  const heightConstraint = WALL_HEIGHT - 0.5 * 4;

  newPosition.x = Math.max(-halfSize, Math.min(halfSize, newPosition.x));
  newPosition.z = Math.max(-halfSize, Math.min(halfSize, newPosition.z));
  newPosition.y =
    isSpeaker && newPosition.y < heightConstraint ? 0 : WALL_HEIGHT - size * 4;
};

export {
  getPlane,
  calculateIntersectPoint,
  calculateNewPosition,
  constrainPosition,
};
