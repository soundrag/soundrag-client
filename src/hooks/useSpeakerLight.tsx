import { useRef, useEffect } from "react";
import { Vector3, Euler } from "three";

import type { RefObject } from "react";
import type { PointLight } from "three";
import type { ModelInformationProps } from "../types/common";

const useSpeakerLight = ({
	position,
	rotation,
}: ModelInformationProps): RefObject<PointLight> => {
	const lightRef = useRef<PointLight>(null);

	useEffect(() => {
		if (lightRef.current) {
			const frontDirection = new Vector3(5, 4, 1).applyEuler(
				new Euler(...rotation),
			);
			const lightPosition = new Vector3(...position).add(
				frontDirection.multiplyScalar(0.5),
			);

			lightRef.current.position.copy(lightPosition);
		}
	}, [position, rotation]);

	return lightRef;
};

export default useSpeakerLight;
