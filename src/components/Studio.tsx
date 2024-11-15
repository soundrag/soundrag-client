import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

import Room from "./targets/Room";
import Listener from "./targets/Listener";
import Speaker from "./targets/Speaker";

import useLoadedModel from "../hooks/useLoadedModel";
import useModelStore from "../stores/useModelStore";

import useModeStore from "../stores/useModeStore";

import {
	CAMERA_STARTING_POSITION,
	MEDIUM_LIGHT_INTENSITY,
	HARD_LIGHT_INTENSITY,
	DIRECTIONAL_LIGHT_POSITION,
} from "../constants";

const Studio = () => {
	const { isViewMode } = useModeStore();
	const { speakers } = useModelStore();

	useLoadedModel();

	return (
		<>
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
				{speakers.map((speakerName) => (
					<Speaker key={speakerName} modelName={speakerName} />
				))}
				<Listener modelName="listener" />
			</Canvas>
		</>
	);
};

export default Studio;
