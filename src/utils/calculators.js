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

  if (isSpeaker) {
    newPosition.y =
      newPosition.y < heightConstraint ? -0.12 : WALL_HEIGHT - size * 4;
  }
};

const calculatePan = (listenerPosition, speakerPosition) => {
  const distanceX = listenerPosition[0] - speakerPosition[0];
  const distanceZ = listenerPosition[2] - speakerPosition[2];

  const azimuth = Math.atan2(distanceX, distanceZ);

  const pan = Math.cos(azimuth);

  return pan;
};

const calculateVector = (rotX, rotY, rotZ) => {
  const radX = (rotX * Math.PI) / 180;
  const radY = (rotY * Math.PI) / 180;
  const radZ = (rotZ * Math.PI) / 180;

  let x = 0;
  let y = 0;
  let z = -1;

  let x1 = x;
  let y1 = y * Math.cos(radX) - z * Math.sin(radX);
  let z1 = y * Math.sin(radX) + z * Math.cos(radX);

  let x2 = x1 * Math.cos(radY) + z1 * Math.sin(radY);
  let y2 = y1;
  let z2 = -x1 * Math.sin(radY) + z1 * Math.cos(radY);

  let x3 = x2 * Math.cos(radZ) - y2 * Math.sin(radZ);
  let y3 = x2 * Math.sin(radZ) + y2 * Math.cos(radZ);
  let z3 = z2;

  return { x: x3, y: y3, z: z3 };
};

export {
  getPlane,
  calculateIntersectPoint,
  calculateNewPosition,
  constrainPosition,
  calculatePan,
  calculateVector,
};
