import { useRef } from "react";
import { useThree } from "@react-three/fiber";
import { useGesture } from "@use-gesture/react";
import { Vector3 } from "three";

import {
  SPEAKER_SIZE,
  LISTENER_SIZE,
  ROOM_SIZE,
  WALL_HEIGHT,
} from "../constants";

import useModelStore from "../stores/useModelStore";
import useModeStore from "../stores/useModeStore";
import {
  getPlane,
  calculateIntersectPoint,
  calculateNewPosition,
  constrainPosition,
} from "../utils/calculators";

const useDraggableTarget = ({ modelName }) => {
  const meshRef = useRef();
  const initialPointerPosition = useRef(new Vector3());
  const initialObjectPosition = useRef(new Vector3());

  const { camera, gl } = useThree();

  const { model, scale, position } = useModelStore((state) => ({
    model: state.models[modelName],
    scale: state.scales[modelName],
    position: state.positions[modelName],
  }));
  const { setModelPosition } = useModelStore();
  const { isDragMode } = useModeStore();

  const isSpeaker = modelName.includes("Speaker");
  const size = isSpeaker ? SPEAKER_SIZE : LISTENER_SIZE;
  const plane = getPlane(isSpeaker, camera);

  const onDragStartHandler = ({ event }) => {
    if (!isDragMode()) return;
    event.stopPropagation();

    initialPointerPosition.current = calculateIntersectPoint(
      plane,
      event,
      camera,
      gl,
    );
    initialObjectPosition.current.copy(new Vector3(...position));
  };

  const onDragHandler = ({ event }) => {
    if (!isDragMode()) return;
    event.stopPropagation();

    const currentIntersect = calculateIntersectPoint(plane, event, camera, gl);
    const newPosition = calculateNewPosition(
      initialObjectPosition.current,
      currentIntersect,
      initialPointerPosition.current,
    );

    constrainPosition(newPosition, isSpeaker, size, ROOM_SIZE, WALL_HEIGHT);
    setModelPosition(modelName, newPosition.toArray());
  };

  const bind = useGesture({
    onDragStart: onDragStartHandler,
    onDrag: onDragHandler,
  });

  return { meshRef, model, position, scale, bind };
};

export default useDraggableTarget;
