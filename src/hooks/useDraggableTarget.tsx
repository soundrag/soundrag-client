import { useRef, useState } from "react";
import { Vector3 } from "three";
import { useThree } from "@react-three/fiber";
import { useGesture } from "@use-gesture/react";

import useKeyboardEvent from "./useKeyboardEvent";

import useModelStore from "../stores/useModelStore";
import useModeStore from "../stores/useModeStore";

import {
	getPlane,
	calculateIntersectPoint,
	calculateNewPosition,
	constrainPosition,
} from "../utils/calculators";

import {
	SPEAKER_SIZE,
	LISTENER_SIZE,
	ROOM_SIZE,
	WALL_HEIGHT,
} from "../constants";

import type { SharedGestureState, FullGestureState } from "@use-gesture/react";
import type { ModelControlHookProps } from "../types/common";

const useDraggableTarget = ({
	modelName,
	isSpeaker,
}: ModelControlHookProps) => {
	const [speakerPosition, setSpeakerPosition] = useState<
		"ceiling" | "floor" | null
	>(null);
	const meshRef = useRef(null);
	const initialPointerPosition = useRef(new Vector3());
	const initialTargetPosition = useRef(new Vector3());

	const { camera, gl } = useThree();

	const { isShiftPressed } = useKeyboardEvent();

	const { position, setModelPositions } = useModelStore((state) => ({
		scale: state.scales[modelName],
		position: state.positions[modelName],
		setModelPositions: state.setModelPositions,
	}));
	const { isDragMode } = useModeStore();

	const size = isSpeaker ? SPEAKER_SIZE : LISTENER_SIZE;
	const plane = getPlane();

	const handlePointerDown = (
		state: SharedGestureState & { event: PointerEvent },
	): void => {
		const { event } = state;
		if (!isDragMode()) return;
		event.stopPropagation();

		if (isShiftPressed && isSpeaker) {
			if (!speakerPosition) {
				position[1] > 0
					? setSpeakerPosition("floor")
					: setSpeakerPosition("ceiling");
			} else if (speakerPosition === "ceiling") {
				setSpeakerPosition("floor");
			} else {
				setSpeakerPosition("ceiling");
			}
		}
	};

	const handleDragStart = ({ event }: FullGestureState<"drag">): void => {
		if (!isDragMode()) return;
		event.stopPropagation();

		initialPointerPosition.current = calculateIntersectPoint(
			plane,
			event as MouseEvent,
			camera,
			gl,
		);
		initialTargetPosition.current.copy(new Vector3(...position));
	};

	const handleDrag = ({ event }: FullGestureState<"drag">): void => {
		if (!isDragMode()) return;
		event.stopPropagation();

		const currentIntersect = calculateIntersectPoint(
			plane,
			event as MouseEvent,
			camera,
			gl,
		);
		const newPosition = calculateNewPosition(
			initialTargetPosition.current,
			currentIntersect,
			initialPointerPosition.current,
		);

		constrainPosition(newPosition, size, ROOM_SIZE);

		if (isSpeaker) {
			newPosition.y =
				speakerPosition === "ceiling" ? WALL_HEIGHT - size * 4 : -0.05;
		}

		setModelPositions(modelName, newPosition.toArray());
	};

	const handleDragEnd = ({ event }: FullGestureState<"drag">): void => {
		if (!isDragMode()) return;
		event.stopPropagation();
	};

	const bind = useGesture({
		onPointerDown: handlePointerDown,
		onDragStart: handleDragStart,
		onDrag: handleDrag,
		onDragEnd: handleDragEnd,
	});

	return {
		meshRef,
		bind,
		position,
	};
};

export default useDraggableTarget;
