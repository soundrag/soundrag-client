import type { RefObject } from "react";
import type { Transformation, UserData } from "../types/common";

function isEqualVectors(
  firstVectors: number[],
  secondVectors: number[],
  epsilon = 1e-6
): boolean {
  if (!Array.isArray(firstVectors) || !Array.isArray(secondVectors)) {
    return false;
  }

  if (firstVectors.length !== secondVectors.length) return false;

  return firstVectors.every(
    (value, index) => Math.abs(value - secondVectors[index]) <= epsilon
  );
}

function compareTransformation(
  firstTransformation: Transformation,
  secondTransformation: Transformation,
  epsilon = 1e-6
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
      epsilon
    )
  );
}

function isSameData(
  firstData: Partial<UserData>,
  secondData: Partial<UserData>,
  epsilon = 1e-6
): boolean {
  const isPositionSame = compareTransformation(
    {
      firstSpeakerPosition: firstData.firstSpeakerPosition,
      secondSpeakerPosition: firstData.secondSpeakerPosition,
      listenerPosition: firstData.listenerPosition,
    },
    {
      firstSpeakerPosition: secondData.firstSpeakerPosition,
      secondSpeakerPosition: secondData.secondSpeakerPosition,
      listenerPosition: secondData.listenerPosition,
    },
    epsilon
  );

  const isRotationSame = compareTransformation(
    {
      firstSpeakerRotation: firstData.firstSpeakerRotation,
      secondSpeakerRotation: firstData.secondSpeakerRotation,
      listenerRotation: firstData.listenerRotation,
    },
    {
      firstSpeakerRotation: secondData.firstSpeakerRotation,
      secondSpeakerRotation: secondData.secondSpeakerRotation,
      listenerRotation: secondData.listenerRotation,
    },
    epsilon
  );

  return isPositionSame && isRotationSame;
}

function isDuplicateData(
  userData: UserData[],
  positions: Transformation,
  rotations: Transformation
): boolean {
  const targetData = {
    firstSpeakerPosition: positions.firstSpeaker,
    secondSpeakerPosition: positions.secondSpeaker,
    listenerPosition: positions.listener,
    firstSpeakerRotation: rotations.firstSpeaker,
    secondSpeakerRotation: rotations.secondSpeaker,
    listenerRotation: rotations.listener,
  };

  return userData.some((data) => isSameData(data, targetData));
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
  isSameData,
  isDuplicateData,
  isValidateNumber,
  hasCurrentRef,
};
