import { useRef, useState, useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { useGesture } from "@use-gesture/react";
import { Vector3 } from "three";

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

const useDraggableTarget = ({ modelName }) => {
	const [keyPressed, setKeyPressed] = useState(false);
	const meshRef = useRef();
	const initialPointerPosition = useRef(new Vector3());
	const initialTargetPosition = useRef(new Vector3());

	const { camera, gl } = useThree();
	const {
		model,
		scale,
		position,
		isDraggingModel,
		setIsDraggingModel,

		setModelPositions,
	} = useModelStore((state) => ({
		model: state.models[modelName],
		scale: state.scales[modelName],
		position: state.positions[modelName],
		isDraggingModel: state.getModelDragState(modelName),
		setIsDraggingModel: state.setModelDragState,

		setModelPositions: state.setModelPositions,
	}));
	const { isDragMode } = useModeStore();

	const isSpeaker = modelName.includes("Speaker");
	const size = isSpeaker ? SPEAKER_SIZE : LISTENER_SIZE;
	const plane = getPlane();

	useEffect(() => {
		const handleKeyDown = (event) => {
			if (event.key === "Shift" && isDragMode()) setKeyPressed(true);
		};

		window.addEventListener("keydown", handleKeyDown);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [isDragMode]);

	const handlePointerDown = ({ event }) => {
		if (!isDragMode()) return;
		event.stopPropagation();
		if (event.shiftKey && isSpeaker && isDragMode()) {
			const newPosition = new Vector3(...position);
			if (keyPressed === "ceiling") {
				newPosition.y = WALL_HEIGHT - size * 4;
				setKeyPressed("floor");
			} else {
				newPosition.y = -0.05;
				setKeyPressed("ceiling");
			}

			setModelPositions(modelName, newPosition.toArray());
		}
	};

	const handleDragStart = ({ event }) => {
		if (!isDragMode()) return;
		event.stopPropagation();
		if (!keyPressed) {
			setIsDraggingModel(modelName, true);
		}

		initialPointerPosition.current = calculateIntersectPoint(
			plane,
			event,
			camera,
			gl,
		);
		initialTargetPosition.current.copy(new Vector3(...position));
	};

	const handleDrag = ({ event }) => {
		if (!isDragMode()) return;
		event.stopPropagation();

		const currentIntersect = calculateIntersectPoint(plane, event, camera, gl);
		const newPosition = calculateNewPosition(
			initialTargetPosition.current,
			currentIntersect,
			initialPointerPosition.current,
		);

		constrainPosition(newPosition, size, ROOM_SIZE);

		if (isSpeaker) {
			if (keyPressed === "ceiling") {
				newPosition.y = WALL_HEIGHT - size * 4;
			} else if (keyPressed === "floor") {
				newPosition.y = -0.05;
			}
		}

		setModelPositions(modelName, newPosition.toArray());
	};

	const handleDragEnd = ({ event }) => {
		if (!isDragMode()) return;
		event.stopPropagation();

		setIsDraggingModel(modelName, false);
	};

	const bind = useGesture({
		onPointerDown: handlePointerDown,
		onDragStart: handleDragStart,
		onDrag: handleDrag,
		onDragEnd: handleDragEnd,
	});

	return {
		meshRef,
		model,
		position,
		scale,
		bind,
		isDraggingModel,
	};
};

export default useDraggableTarget;
