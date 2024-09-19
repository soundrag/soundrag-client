import { forwardRef, useImperativeHandle } from "react";

import useDraggableTarget from "../../hooks/useDraggableTarget";

const Model = forwardRef(function Model({ modelName }, ref) {
  const { meshRef, model, position, scale, bind } = useDraggableTarget({
    modelName,
  });

  useImperativeHandle(ref, () => {
    meshRef.current;
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
