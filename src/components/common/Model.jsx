/* eslint-disable no-unused-vars */
import { forwardRef } from "react";

import useDraggableTarget from "../../hooks/useDraggableTarget";

const Model = forwardRef(function Model({ modelName }, ref) {
  const { meshRef, model, position, scale, bind } = useDraggableTarget({
    modelName,
  });

  if (!model) return null;

  return (
    <primitive
      ref={meshRef}
      object={model}
      position={position}
      scale={scale}
      {...bind()}
    />
  );
});

export default Model;
