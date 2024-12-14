import type { RefObject } from "react";
import type { Transformation, UserData } from "../types/common";

function isEqualVectors(
  firstVectors: number[],
  secondVectors: number[],
  epsilon = 1e-6,
): boolean {
  if (!Array.isArray(firstVectors) || !Array.isArray(secondVectors)) {
    return false;
  }

  if (firstVectors.length !== secondVectors.length) return false;

  return firstVectors.every(
    (value, index) => Math.abs(value - secondVectors[index]) <= epsilon,
  );
}

function compareTransformation(
  firstTransformation: Transformation,
  secondTransformation: Transformation,
  epsilon = 1e-6,
): boolean {
  const firstDetails = Object.keys(firstTransformation);

  if (
    firstDetails.length !== Object.keys(secondTransformation).length ||
    !firstDetails.every((info) => info in secondTransformation)
  ) {
    return false;
  }

  return firstDetails.every((info) =>
    isEqualVectors(
      firstTransformation[info],
      secondTransformation[info],
      epsilon,
    ),
  );
}

function isDuplicateData(
  userData: UserData[],
  positions: Transformation,
  rotations: Transformation,
): boolean {
  return userData.some((data) => {
    const isPositionSame = compareTransformation(
      {
        firstSpeakerPosition: data.firstSpeakerPosition,
        secondSpeakerPosition: data.secondSpeakerPosition,
        listenerPosition: data.listenerPosition,
      },
      {
        firstSpeakerPosition: positions.firstSpeaker,
        secondSpeakerPosition: positions.secondSpeaker,
        listenerPosition: positions.listener,
      },
    );

    const isRotationSame = compareTransformation(
      {
        firstSpeakerRotation: data.firstSpeakerRotation,
        secondSpeakerRotation: data.secondSpeakerRotation,
        listenerRotation: data.listenerRotation,
      },
      {
        firstSpeakerRotation: rotations.firstSpeaker,
        secondSpeakerRotation: rotations.secondSpeaker,
        listenerRotation: rotations.listener,
      },
    );

    return isPositionSame && isRotationSame;
  });
}

function isFiniteNumber(value: number): boolean {
  return typeof value === "number" && Number.isFinite(value);
}

function isValidateNumber(x: number, y: number, z: number): boolean {
  return isFiniteNumber(x) && isFiniteNumber(y) && isFiniteNumber(z);
}

function hasCurrentRef<T>(ref: RefObject<T>): T | null {
  return ref.current ?? null;
}

export {
  compareTransformation,
  isDuplicateData,
  isValidateNumber,
  hasCurrentRef,
};
