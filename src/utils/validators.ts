import type { RefObject } from "react";
import type { Positions } from "../types/utils";

const isEqualVectors = (
  firstVectors: number[],
  secondVectors: number[],
  epsilon = 1e-6,
): boolean => {
  if (firstVectors.length !== secondVectors.length) return false;

  return firstVectors.every(
    (value, index) => Math.abs(value - secondVectors[index]) <= epsilon,
  );
};

const deepEqual = (
  firstPosition: Positions,
  secondPosition: Positions,
  epsilon = 1e-6,
): boolean => {
  const firstPositionInfos = Object.keys(firstPosition);

  if (
    firstPositionInfos.length !== Object.keys(secondPosition).length ||
    !firstPositionInfos.every((info) => info in secondPosition)
  ) {
    return false;
  }

  return firstPositionInfos.every((info) =>
    isEqualVectors(firstPosition[info], secondPosition[info], epsilon),
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
