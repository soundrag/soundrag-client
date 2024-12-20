import useLoadedTexture from "../../hooks/useLoadedTexture";

import {
	DEFAULT_POSITION,
	WALL_POSITIONS,
	ROOM_SIZE,
	WALL_HEIGHT,
	WALL_DEPTH,
	ROTATE_X_MINUS_90_DEGREES,
} from "../../constants";
import { DoubleSide } from "three";

import type { WallProps } from "../../types/components";

const Floor = () => {
	const floorTexture = useLoadedTexture("/textures/carpet.jpg");

	return (
		<mesh position={DEFAULT_POSITION} rotation={ROTATE_X_MINUS_90_DEGREES}>
			<planeGeometry args={[ROOM_SIZE, ROOM_SIZE]} />
			<meshStandardMaterial map={floorTexture} side={DoubleSide} />
		</mesh>
	);
};

const Wall = ({ position, rotation }: WallProps) => {
	const wallTexture = useLoadedTexture("/textures/foam.jpg");

	return (
		<mesh position={position} rotation={rotation}>
			<boxGeometry args={[ROOM_SIZE, WALL_HEIGHT, WALL_DEPTH]} />
			<meshStandardMaterial map={wallTexture} />
		</mesh>
	);
};

const Room = () => {
	return (
		<>
			<Floor />
			{WALL_POSITIONS.map(({ direction, position, rotation }) => (
				<Wall key={direction} position={position} rotation={rotation} />
			))}
		</>
	);
};

export default Room;
