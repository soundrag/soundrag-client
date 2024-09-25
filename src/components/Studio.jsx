import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

import Room from "./targets/Room";
import Listener from "./targets/Listener";
import Speaker from "./targets/Speaker";

import useLoadedModel from "../hooks/useLoadedModel";

import useModeStore from "../stores/useModeStore";

import {
  CAMERA_STARTING_POSITION,
  MEDIUM_LIGHT_INTENSITY,
  HARD_LIGHT_INTENSITY,
  DIRECTIONAL_LIGHT_POSITION,
} from "../constants";

const Studio = () => {
  const { isViewMode } = useModeStore();

  useLoadedModel();

  return (
    <Canvas camera={{ position: CAMERA_STARTING_POSITION }}>
      <OrbitControls enabled={isViewMode()} />
      <ambientLight intensity={MEDIUM_LIGHT_INTENSITY} />
      <directionalLight
        position={DIRECTIONAL_LIGHT_POSITION}
        intensity={HARD_LIGHT_INTENSITY}
      />
      <Room />
      <Speaker modelName="firstSpeaker" />
      <Speaker modelName="secondSpeaker" />
      <Listener modelName="listener" />
    </Canvas>
  );
};

export default Studio;
