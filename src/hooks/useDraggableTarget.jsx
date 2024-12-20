import { useState, useRef } from "react";
import { useThree } from "@react-three/fiber";
import { useGesture } from "@use-gesture/react";
import { Vector3 } from "three";

import useModelStore from "../stores/useModelStore";
import useModeStore from "../stores/useModeStore";

import {
  getPlane,
  calculateIntersectPoint,
  calculateNewPosition,
  constrainPosition,
} from "../utils/calculators";

import {
  SPEAKER_SIZE,
  LISTENER_SIZE,
  ROOM_SIZE,
  WALL_HEIGHT,
} from "../constants";

const useDraggableTarget = ({ modelName }) => {
  const meshRef = useRef();
  const initialPointerPosition = useRef(new Vector3());
  const initialTargetPosition = useRef(new Vector3());

  const { camera, gl } = useThree();

  const [isDragging, setIsDragging] = useState(false);

  const { model, scale, position } = useModelStore((state) => ({
    model: state.models[modelName],
    scale: state.scales[modelName],
    position: state.positions[modelName],
  }));
  const { setModelPositions } = useModelStore();
  const { isDragMode } = useModeStore();

  const isSpeaker = modelName.includes("Speaker");
  const size = isSpeaker ? SPEAKER_SIZE : LISTENER_SIZE;
  const plane = getPlane(isSpeaker, camera);

  const handleDragStart = ({ event }) => {
    if (!isDragMode()) return;
    event.stopPropagation();

    setIsDragging(true);

    initialPointerPosition.current = calculateIntersectPoint(
      plane,
      event,
      camera,
      gl,
    );
    initialTargetPosition.current.copy(new Vector3(...position));
  };

  const handleDrag = ({ event }) => {
    if (!isDragMode()) return;
    event.stopPropagation();

    const currentIntersect = calculateIntersectPoint(plane, event, camera, gl);
    const newPosition = calculateNewPosition(
      initialTargetPosition.current,
      currentIntersect,
      initialPointerPosition.current,
    );

    constrainPosition(newPosition, isSpeaker, size, ROOM_SIZE, WALL_HEIGHT);
    setModelPositions(modelName, newPosition.toArray());
  };

  const handleDragEnd = ({ event }) => {
    if (!isDragMode()) return;
    event.stopPropagation();

    setIsDragging(false);
  };

  const bind = useGesture({
    onDragStart: handleDragStart,
    onDrag: handleDrag,
    onDragEnd: handleDragEnd,
  });

  return { meshRef, model, position, scale, bind, isDragging };
};

export default useDraggableTarget;
