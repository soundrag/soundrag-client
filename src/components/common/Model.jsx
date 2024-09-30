/* eslint-disable no-unused-vars */
import { forwardRef } from "react";

import useDraggableTarget from "../../hooks/useDraggableTarget";
import useRotatableTarget from "../../hooks/useRotatableTarget";
import useTargetArrow from "../../hooks/useTargetArrow";

import useModeStore from "../../stores/useModeStore";
import useModelStore from "../../stores/useModelStore";

import { MODEL_HEIGHT, FLOOR_THICKNESS, CEILING_OFFSET } from "../../constants";

const Model = forwardRef(function Model({ modelName }, ref) {
  const isRotateMode = useModeStore((state) => state.isRotateMode());
  const isDragging = useModelStore((state) =>
    state.getModelDragState(modelName),
  );
  const isListener = modelName === "listener";

  const {
    meshRef: draggableMeshRef,
    model,
    position: draggablePosition,
    scale,
    bind: draggableBind,
  } = useDraggableTarget({
    modelName,
  });

  const isOnCeiling =
    Array.isArray(draggablePosition) && draggablePosition[1] >= CEILING_OFFSET;

  const {
    meshRef: rotatableMeshRef,
    rotation,
    bind: rotatableBind,
  } = useRotatableTarget([0, 0, 0], isListener, isOnCeiling);

  const meshRef = isRotateMode ? rotatableMeshRef : draggableMeshRef;
  const position = draggablePosition;
  const bind = isRotateMode ? rotatableBind : draggableBind;

  const arrows = useTargetArrow(
    position,
    isDragging,
    modelName === "listener",
    Math.abs(position[1] + FLOOR_THICKNESS) < 0.001,
    isOnCeiling,
    MODEL_HEIGHT,
    draggablePosition,
  );

  if (!model) return null;

  return (
    <group ref={meshRef} {...bind()}>
      <primitive
        object={model}
        position={position}
        scale={scale}
        rotation={rotation}
      />
      {isDragging &&
        arrows.map((arrow, index) => <primitive key={index} object={arrow} />)}
    </group>
  );
});

export default Model;
