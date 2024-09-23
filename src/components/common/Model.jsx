/* eslint-disable no-unused-vars */
import { forwardRef } from "react";

import useDraggableTarget from "../../hooks/useDraggableTarget";

import { DEFAULT_POSITION, ROTATE_Y_MINUS_90_DEGREES } from "../../constants";

const Model = forwardRef(function Model({ modelName }, ref) {
  const { meshRef, model, position, scale, bind } = useDraggableTarget({
    modelName,
  });
  const isListener = modelName === "listener";

  if (!model) return null;

  return (
    <primitive
      ref={meshRef}
      object={model}
      position={position}
      scale={scale}
      rotation={isListener ? ROTATE_Y_MINUS_90_DEGREES : DEFAULT_POSITION}
      {...bind()}
    />
  );
});

export default Model;
