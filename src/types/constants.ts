import type { Vector3, Euler } from "three";

export interface WallValues {
  direction: string;
  position: Vector3;
  rotation: Euler;
}
