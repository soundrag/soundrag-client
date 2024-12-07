import { useGLTF } from "@react-three/drei";

import { CEILING_OFFSET } from "../../constants";

import useDraggableTarget from "../../hooks/useDraggableTarget";
import useRotatableTarget from "../../hooks/useRotatableTarget";
import useSpeakerLight from "../../hooks/useSpeakerLight";

import useModeStore from "../../stores/useModeStore";
import useModelStore from "../../stores/useModelStore";

import { createCeilingIndicator } from "../../utils/creator";

import type { ModelProps } from "../../types/components";

const Model = ({ modelName }: ModelProps) => {
  const path =
    modelName === "listener" ? "/models/listener.gltf" : "/models/speaker.gltf";
  const { scene } = useGLTF(path);

  const isRotateMode = useModeStore((state) => state.isRotateMode());
  const scale = useModelStore((state) => state.scales[modelName]);

  const isSpeaker = modelName.includes("Speaker");

  const {
    meshRef: draggableRef,
    bind: draggableBind,
    position,
  } = useDraggableTarget({ modelName, isSpeaker });
  const {
    meshRef: rotatableRef,
    bind: rotatableBind,
    rotation,
  } = useRotatableTarget({
    modelName,
    isSpeaker,
  });

  const lightRef = useSpeakerLight({ position, rotation });

  const isOnCeiling = position[1] >= CEILING_OFFSET;
  const ceilingIndicatorMesh = createCeilingIndicator();

  const meshRef = isRotateMode ? rotatableRef : draggableRef;
  const bind = isRotateMode ? rotatableBind : draggableBind;

  return (
    <group ref={meshRef} {...bind()}>
      <primitive
        object={scene.clone()}
        position={position}
        scale={scale}
        rotation={rotation}
      />
      {isOnCeiling && (
        <primitive
          object={ceilingIndicatorMesh}
          position={[position[0], position[1] + 2, position[2]]}
        />
      )}
      {isSpeaker && (
        <pointLight
          ref={lightRef}
          distance={10}
          intensity={50}
          color={0xffffff}
        />
      )}
    </group>
  );
};

export default Model;
