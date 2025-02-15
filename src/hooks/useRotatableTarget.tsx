import { useRef } from "react";
import type { ThreeEvent } from "@react-three/fiber";

import useModelStore from "../stores/useModelStore";

import { DEFAULT_ROTATION, LISTENER_STARTING_ROTATION } from "../constants";

import type { ModelControlHookProps, Vector3Values } from "../types/common";

const useRotatableTarget = ({
	modelName,
	isSpeaker,
}: ModelControlHookProps) => {
	const meshRef = useRef(null);

	const { rotations, setModelRotations } = useModelStore();
	const initialRotation = isSpeaker
		? DEFAULT_ROTATION
		: LISTENER_STARTING_ROTATION;

	const handleClick = (e: ThreeEvent<MouseEvent>) => {
		if (!isSpeaker) return;
		e.stopPropagation();

		const currentRotation = rotations[modelName] || initialRotation;
		const newAngleY = (currentRotation[1] + Math.PI / 2) % (2 * Math.PI);
		const newRotation: Vector3Values = [
			currentRotation[0],
			newAngleY,
			currentRotation[2],
		];

		setModelRotations(modelName, newRotation);
	};

	return {
		meshRef,
		rotation: rotations[modelName] || initialRotation,
		handleClick,
	};
};

export default useRotatableTarget;
