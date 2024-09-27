/* eslint-disable no-unused-vars */
import { forwardRef } from "react";

import useDraggableTarget from "../../hooks/useDraggableTarget";

import { DEFAULT_POSITION, ROTATE_Y_MINUS_90_DEGREES } from "../../constants";

const Model = forwardRef(function Model({ modelName }, ref) {
  const { meshRef, model, position, scale, bind, isDragging } =
    useDraggableTarget({
      modelName,
    });
  const isListener = modelName === "listener";

  if (!model) return null;

  return (
    <group ref={meshRef} {...bind()}>
      <primitive
        object={model}
        position={position}
        scale={scale}
        rotation={isListener ? ROTATE_Y_MINUS_90_DEGREES : DEFAULT_POSITION}
      />
      {isDragging && (
        <mesh position={position}>
          <boxGeometry args={[4, 4, 4]} />
          <meshBasicMaterial
            color={isListener ? "blue" : "red"}
            opacity={0.5}
            transparent
          />
        </mesh>
      )}
    </group>
  );
});

export default Model;
