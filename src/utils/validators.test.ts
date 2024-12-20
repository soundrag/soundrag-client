import { describe, it, expect } from "vitest";

import {
  comparePositions,
  isDuplicateData,
  isValidateNumber,
  hasCurrentRef,
} from "../utils/validators";
import type { Positions, Rotations, UserData } from "../types/common";

const position1: Positions = {
  firstSpeakerPosition: [1.0, 2.0, 3.0],
  secondSpeakerPosition: [4.0, 5.0, 6.0],
  listenerPosition: [7.0, 8.0, 9.0],
};

const position2: Positions = {
  firstSpeakerPosition: [1.0, 2.0, 3.0],
  secondSpeakerPosition: [4.0, 5.0, 6.0],
  listenerPosition: [7.0, 8.0, 9.0],
};

const position3: Positions = {
  firstSpeakerPosition: [1.0, 2.1, 3.0],
  secondSpeakerPosition: [4.0, 5.0, 6.0],
  listenerPosition: [7.0, 8.0, 9.0],
};

const userData1: UserData[] = [
  {
    name: "front",
    userId: "soundrag",
    positionId: "soundrag4710",
    firstSpeakerPosition: [1.0, 2.1, 3.0],
    secondSpeakerPosition: [4.0, 5.0, 6.0],
    listenerPosition: [7.0, 8.0, 9.0],
    firstSpeakerRotation: [1.0, 2.1, 3.0],
    secondSpeakerRotation: [4.0, 5.0, 6.0],
    listenerRotation: [7.0, 8.0, 9.0],
  },
];

describe("comparePositions function", () => {
  it("should return true for identical positions", () => {
    expect(comparePositions(position1, position2)).toBe(true);
  });

  it("should return false for different positions", () => {
    expect(comparePositions(position1, position3)).toBe(false);
  });

  it("should handle empty positions", () => {
    expect(comparePositions({}, {})).toBe(true);
    expect(comparePositions({}, position1)).toBe(false);
  });
});

describe("isDuplicateData function", () => {
  it("should return true for identical positions and rotations", () => {
    const rotation1: Rotations = {
      firstSpeakerRotation: [1.0, 2.1, 3.0],
      secondSpeakerRotation: [4.0, 5.0, 6.0],
      listenerRotation: [7.0, 8.0, 9.0],
    };

    expect(isDuplicateData(userData1, position3, rotation1)).toBe(true);
  });

  it("should return false for different positions or rotations", () => {
    const rotation2: Rotations = {
      firstSpeakerRotation: [0.0, 0.0, 0.0],
      secondSpeakerRotation: [4.0, 5.0, 6.0],
      listenerRotation: [7.0, 8.0, 9.0],
    };

    expect(isDuplicateData(userData1, position3, rotation2)).toBe(false);
  });
});

describe("isValidateNumber function", () => {
  it("should return true for valid numbers", () => {
    expect(isValidateNumber(1.0, 2.0, 3.0)).toBe(true);
  });

  it("should return false for invalid numbers", () => {
    expect(isValidateNumber(NaN, 2.0, 3.0)).toBe(false);
    expect(isValidateNumber(1.0, Infinity, 3.0)).toBe(false);
    expect(isValidateNumber(1.0, 2.0, -Infinity)).toBe(false);
  });
});

describe("hasCurrentRef", () => {
  it("should return the current value if ref has a value", () => {
    const ref: { current: number | null } = { current: 42 };

    expect(hasCurrentRef(ref)).toBe(42);
  });

  it("should return null if ref is null", () => {
    const ref: { current: number | null } = { current: null };

    expect(hasCurrentRef(ref)).toBe(null);
  });
});
