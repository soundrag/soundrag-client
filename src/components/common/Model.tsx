/* eslint-disable no-unused-vars */
import { forwardRef, useRef, useEffect } from "react";
import { MeshBasicMaterial, Mesh, BoxGeometry, Vector3, Euler } from "three";

import useDraggableTarget from "../../hooks/useDraggableTarget";
import useRotatableTarget from "../../hooks/useRotatableTarget";

import useModeStore from "../../stores/useModeStore";
import useModelStore from "../../stores/useModelStore";

import { CEILING_OFFSET } from "../../constants";

import type { Object3D, PointLight, Object3DEventMap } from "three";
import type { ModelProps } from "../../types/components";

const Model = forwardRef<Object3D, ModelProps>(function Model(
	{ modelName },
	ref: React.ForwardedRef<Object3D<Object3DEventMap>>,
) {
	const isRotateMode = useModeStore((state) => state.isRotateMode());

	const rotation = useModelStore((state) => state.rotations[modelName]);

	const isListener = modelName === "listener";
	const isSpeaker = modelName.includes("Speaker");

	const lightRef = useRef<PointLight | null>(null);

	const {
		meshRef: draggableMeshRef,
		model,
		position: draggablePosition,
		scale,
		bind: draggableBind,
	} = useDraggableTarget({ modelName });

	const { meshRef: rotatableMeshRef, bind: rotatableBind } = useRotatableTarget(
		modelName,
		isListener,
		isSpeaker,
	);

	const isOnCeiling =
		Array.isArray(draggablePosition) && draggablePosition[1] >= CEILING_OFFSET;
	const meshRef = isRotateMode ? rotatableMeshRef : draggableMeshRef;
	const position = draggablePosition;
	const bind = isRotateMode ? rotatableBind : draggableBind;

	useEffect(() => {
		if (isSpeaker && lightRef.current) {
			const frontDirection = new Vector3(5, 4, 1);

			frontDirection.applyEuler(new Euler(...rotation));

			const lightPosition = new Vector3(...position).add(
				frontDirection.multiplyScalar(0.5),
			);

			lightRef.current.position.copy(lightPosition);
		}
	}, [isSpeaker, position, rotation]);

	if (!model) return null;

	const ceilingIndicatorMaterial = new MeshBasicMaterial({
		color: 0x00ff00,
		transparent: true,
		opacity: 0.5,
	});

	const ceilingIndicatorGeometry = new BoxGeometry(1, 0.2, 1);

	const ceilingIndicatorMesh = new Mesh(
		ceilingIndicatorGeometry,
		ceilingIndicatorMaterial,
	);

	return (
		<group ref={meshRef} {...bind()}>
			<primitive
				object={model}
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
});

export default Model;
