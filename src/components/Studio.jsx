import { useEffect } from "react";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

import Room from "./targets/Room";
import Listener from "./targets/Listener";
import Speaker from "./targets/Speaker";

import useModelStore from "../stores/useModelStore";
import useModeStore from "../stores/useModeStore";

import {
  STANDARD_SPEAKER_SCALE,
  STANDARD_LISTENER_SCALE,
  FIRST_SPEAKER_STARTING_POSITION,
  SECOND_SPEAKER_STARTING_POSITION,
  LISTENER_STARTING_POSITION,
  CAMERA_STARTING_POSITION,
  MEDIUM_LIGHT_INTENSITY,
  HARD_LIGHT_INTENSITY,
  DIRECTIONAL_LIGHT_POSITION,
} from "../constants";

const Studio = () => {
  const { loadModel, setModelScale, setModelPosition } = useModelStore();
  const { isViewMode } = useModeStore();

  useEffect(() => {
    loadModel("firstSpeaker", "/models/speaker.gltf");
    setModelScale("firstSpeaker", STANDARD_SPEAKER_SCALE);
    setModelPosition("firstSpeaker", FIRST_SPEAKER_STARTING_POSITION);

    loadModel("secondSpeaker", "/models/speaker.gltf");
    setModelScale("secondSpeaker", STANDARD_SPEAKER_SCALE);
    setModelPosition("secondSpeaker", SECOND_SPEAKER_STARTING_POSITION);

    loadModel("listener", "/models/listener.gltf");
    setModelScale("listener", STANDARD_LISTENER_SCALE);
    setModelPosition("listener", LISTENER_STARTING_POSITION);
  }, [loadModel]);

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
