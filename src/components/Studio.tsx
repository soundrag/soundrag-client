import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

import Model from "./common/Model";
import Room from "./Room";

import {
  CAMERA_STARTING_POSITION,
  MEDIUM_LIGHT_INTENSITY,
  HARD_LIGHT_INTENSITY,
  DIRECTIONAL_LIGHT_POSITION,
} from "../constants";

import useModeStore from "../stores/useModeStore";

const Studio = () => {
  const { isViewMode } = useModeStore();

  return (
    <Canvas camera={{ position: CAMERA_STARTING_POSITION }}>
      <OrbitControls
        enabled={isViewMode()}
        enableDamping={false}
        enablePan={false}
        minDistance={20}
        maxDistance={40}
      />
      <ambientLight intensity={MEDIUM_LIGHT_INTENSITY} />
      <directionalLight
        position={DIRECTIONAL_LIGHT_POSITION}
        intensity={HARD_LIGHT_INTENSITY}
      />
      <Room />
      <Model modelName="firstSpeaker" />
      <Model modelName="secondSpeaker" />
      <Model modelName="listener" />
    </Canvas>
  );
};

export default Studio;
