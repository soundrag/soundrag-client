import type { RefObject } from "react";
import type { Positions } from "../types/utils";

const isEqualVectors = (
  firstVectors: number[],
  secondVectors: number[],
  epsilon = 1e-6,
): boolean => {
  if (firstVectors.length !== secondVectors.length) return false;

  for (let i = 0; i < firstVectors.length; i++) {
    if (Math.abs(firstVectors[i] - secondVectors[i]) > epsilon) return false;
  }

  return true;
};

const deepEqual = (
  firstPosition: Positions,
  secondPosition: Positions,
  epsilon = 1e-6,
): boolean => {
  return (
    isEqualVectors(
      firstPosition.firstSpeaker,
      secondPosition.firstSpeaker,
      epsilon,
    ) &&
    isEqualVectors(
      firstPosition.secondSpeaker,
      secondPosition.secondSpeaker,
      epsilon,
    ) &&
    isEqualVectors(firstPosition.listener, secondPosition.listener, epsilon)
  );
};

const isFiniteNumber = (value: number): boolean => {
  return typeof value === "number" && Number.isFinite(value);
};

const isValidateNumber = (x: number, y: number, z: number): boolean => {
  return isFiniteNumber(x) && isFiniteNumber(y) && isFiniteNumber(z);
};

const hasCurrentRef = <T>(ref: RefObject<T>): T | null => {
  return ref.current;
};

export { deepEqual, isValidateNumber, hasCurrentRef };
