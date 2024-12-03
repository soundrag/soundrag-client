import { useRef, useState } from "react";
import { useThree } from "@react-three/fiber";
import { useGesture } from "@use-gesture/react";
import { Vector3 } from "three";

import useKeyboardEvent from "./useKeyboardEvent";
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
  const [speakerPosition, setSpeakerPosition] = useState(null);
  const meshRef = useRef(null);
  const initialPointerPosition = useRef(new Vector3());
  const initialTargetPosition = useRef(new Vector3());

  const { camera, gl } = useThree();

  const { isShiftPressed } = useKeyboardEvent();

  const {
    model,
    scale,
    position,
    isDraggingModel,
    setIsDraggingModel,
    setModelPositions,
  } = useModelStore((state) => ({
    model: state.models[modelName],
    scale: state.scales[modelName],
    position: state.positions[modelName],
    isDraggingModel: state.getModelDragState(modelName),
    setIsDraggingModel: state.setModelDragState,
    setModelPositions: state.setModelPositions,
  }));
  const { isDragMode } = useModeStore();

  const isSpeaker = modelName.includes("Speaker");
  const size = isSpeaker ? SPEAKER_SIZE : LISTENER_SIZE;
  const plane = getPlane();

  const handlePointerDown = ({ event }) => {
    if (!isDragMode()) return;
    event.stopPropagation();

    if (isShiftPressed && isSpeaker) {
      if (!speakerPosition) {
        position[1] > 0
          ? setSpeakerPosition("floor")
          : setSpeakerPosition("ceiling");
      } else if (speakerPosition === "ceiling") {
        setSpeakerPosition("floor");
      } else {
        setSpeakerPosition("ceiling");
      }
    }
  };

  const handleDragStart = ({ event }) => {
    if (!isDragMode()) return;
    event.stopPropagation();
    setIsDraggingModel(modelName, true);

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

    constrainPosition(newPosition, size, ROOM_SIZE);

    if (isSpeaker) {
      newPosition.y =
        speakerPosition === "ceiling" ? WALL_HEIGHT - size * 4 : -0.05;
    }

    setModelPositions(modelName, newPosition.toArray());
  };

  const handleDragEnd = ({ event }) => {
    if (!isDragMode()) return;
    event.stopPropagation();

    setIsDraggingModel(modelName, false);
  };

  const bind = useGesture({
    onPointerDown: handlePointerDown,
    onDragStart: handleDragStart,
    onDrag: handleDrag,
    onDragEnd: handleDragEnd,
  });

  return {
    meshRef,
    model,
    position,
    scale,
    bind,
    isDraggingModel,
  };
};

export default useDraggableTarget;
