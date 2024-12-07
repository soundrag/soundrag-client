import { DoubleSide, RepeatWrapping } from "three";

import { useTexture } from "@react-three/drei";
import {
  DEFAULT_POSITION,
  WALL_POSITIONS,
  ROOM_SIZE,
  WALL_HEIGHT,
  WALL_DEPTH,
  ROTATE_X_MINUS_90_DEGREES,
} from "../constants";

import type { WallProps } from "../types/components";

const Floor = () => {
  const floorTexture = useTexture("/textures/carpet.jpg");
  floorTexture.wrapS = RepeatWrapping;
  floorTexture.wrapT = RepeatWrapping;
  floorTexture.repeat.set(4, 4);

  return (
    <mesh position={DEFAULT_POSITION} rotation={ROTATE_X_MINUS_90_DEGREES}>
      <planeGeometry args={[ROOM_SIZE, ROOM_SIZE]} />
      <meshStandardMaterial map={floorTexture} side={DoubleSide} />
    </mesh>
  );
};

const Wall = ({ position, rotation }: WallProps) => {
  const wallTexture = useTexture("/textures/foam.jpg");
  wallTexture.wrapS = RepeatWrapping;
  wallTexture.wrapT = RepeatWrapping;
  wallTexture.repeat.set(4, 4);

  return (
    <mesh position={position} rotation={rotation}>
      <boxGeometry args={[ROOM_SIZE, WALL_HEIGHT, WALL_DEPTH]} />
      <meshStandardMaterial map={wallTexture} />
    </mesh>
  );
};

const Room = () => {
  return (
    <>
      <Floor />
      {WALL_POSITIONS.map(({ direction, position, rotation }) => (
        <Wall key={direction} position={position} rotation={rotation} />
      ))}
    </>
  );
};

export default Room;
