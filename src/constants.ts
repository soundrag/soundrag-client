import { Vector3, Euler } from "three";
import type { Vector3Values } from "./types/common";
import type { WallValues } from "./types/constants";

const AUTO_SAVE_DELAY = 5000;

const AUDIO_STARTING_POINT = 0;

const HAVE_NOTHING = 0;
const HAVE_METADATA = 1;
const HAVE_CURRENT_DATA = 2;
const HAVE_FUTURE_DATA = 3;
const HAVE_ENOUGH_DATA = 4;

const SPEAKER_SIZE = 0.5;
const LISTENER_SIZE = 1;
const ROOM_SIZE = 30;
const WALL_HEIGHT = 5;
const WALL_DEPTH = 0.2;
const MODEL_HEIGHT = 1;

const FLOOR_THICKNESS = 0.12;
const CEILING_OFFSET = 3;

const DEFAULT_ROTATION: Vector3Values = [0, 0, 0];
const LISTENER_STARTING_ROTATION: Vector3Values = [0, -Math.PI / 2, 0];
const ROTATE_X_90_DEGREES: Vector3Values = [Math.PI / 2, 0, 0];
const ROTATE_X_MINUS_90_DEGREES: Vector3Values = [-Math.PI / 2, 0, 0];
const ROTATE_Y_90_DEGREES: Vector3Values = [0, Math.PI / 2, 0];
const ROTATE_Y_MINUS_90_DEGREES: Vector3Values = [0, -Math.PI / 2, 0];

const STANDARD_SPEAKER_SCALE = 0.5;
const STANDARD_LISTENER_SCALE = 0.03;

const DEFAULT_POSITION: Vector3Values = [0, 0, 0];
const FLOOR_POSITION = 0;
const CEILING_POSITION = WALL_HEIGHT;
const FIRST_SPEAKER_STARTING_POSITION: Vector3Values = [-2, -0.05, -5];
const SECOND_SPEAKER_STARTING_POSITION: Vector3Values = [-2, -0.05, 5];
const LISTENER_STARTING_POSITION: Vector3Values = [5, -0.05, 0];
const CAMERA_STARTING_POSITION: Vector3Values = [15, 10, 5];
const DIRECTIONAL_LIGHT_POSITION: Vector3Values = [5, 5, 5];
const WALL_POSITIONS: WallValues[] = [
  {
    direction: "forwardWall",
    position: new Vector3(0, WALL_HEIGHT / 2, -(ROOM_SIZE / 2)),
    rotation: new Euler(...DEFAULT_ROTATION),
  },
  {
    direction: "backWall",
    position: new Vector3(0, WALL_HEIGHT / 2, ROOM_SIZE / 2),
    rotation: new Euler(...DEFAULT_ROTATION),
  },
  {
    direction: "leftWall",
    position: new Vector3(-(ROOM_SIZE / 2), WALL_HEIGHT / 2, 0),
    rotation: new Euler(...ROTATE_Y_90_DEGREES),
  },
  {
    direction: "rightWall",
    position: new Vector3(ROOM_SIZE / 2, WALL_HEIGHT / 2, 0),
    rotation: new Euler(...ROTATE_Y_90_DEGREES),
  },
];

const MEDIUM_LIGHT_INTENSITY = 0.5;
const HARD_LIGHT_INTENSITY = 1;

export {
  AUTO_SAVE_DELAY,
  AUDIO_STARTING_POINT,
  HAVE_NOTHING,
  HAVE_METADATA,
  HAVE_CURRENT_DATA,
  HAVE_FUTURE_DATA,
  HAVE_ENOUGH_DATA,
  SPEAKER_SIZE,
  LISTENER_SIZE,
  ROOM_SIZE,
  WALL_HEIGHT,
  WALL_DEPTH,
  MODEL_HEIGHT,
  FLOOR_THICKNESS,
  CEILING_OFFSET,
  DEFAULT_ROTATION,
  LISTENER_STARTING_ROTATION,
  ROTATE_X_90_DEGREES,
  ROTATE_X_MINUS_90_DEGREES,
  ROTATE_Y_90_DEGREES,
  ROTATE_Y_MINUS_90_DEGREES,
  STANDARD_SPEAKER_SCALE,
  STANDARD_LISTENER_SCALE,
  DEFAULT_POSITION,
  FLOOR_POSITION,
  CEILING_POSITION,
  FIRST_SPEAKER_STARTING_POSITION,
  SECOND_SPEAKER_STARTING_POSITION,
  LISTENER_STARTING_POSITION,
  CAMERA_STARTING_POSITION,
  DIRECTIONAL_LIGHT_POSITION,
  WALL_POSITIONS,
  MEDIUM_LIGHT_INTENSITY,
  HARD_LIGHT_INTENSITY,
};
