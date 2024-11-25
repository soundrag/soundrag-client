import { createRef } from "react";
import { describe, it, expect } from "vitest";

import {
  deepEqual,
  isValidateNumber,
  hasCurrentRef,
} from "../utils/validators";
import type { Positions } from "../types/utils";

const position1: Positions = {
  firstSpeaker: [1.0, 2.0, 3.0],
  secondSpeaker: [4.0, 5.0, 6.0],
  listener: [7.0, 8.0, 9.0],
};

const position2: Positions = {
  firstSpeaker: [1.0, 2.0, 3.0],
  secondSpeaker: [4.0, 5.0, 6.0],
  listener: [7.0, 8.0, 9.0],
};

const position3: Positions = {
  firstSpeaker: [1.0, 2.1, 3.0],
  secondSpeaker: [4.0, 5.0, 6.0],
  listener: [7.0, 8.0, 9.0],
};

describe("deepEqual function", () => {
  it("should return true for identical positions", () => {
    expect(deepEqual(position1, position2)).toBe(true);
  });

  it("should return false for different positions", () => {
    expect(deepEqual(position1, position3)).toBe(false);
  });

  it("should handle empty positions", () => {
    expect(deepEqual({}, {})).toBe(true);
    expect(deepEqual({}, position1)).toBe(false);
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
    const ref = createRef<number>();
    ref.current = 42;

    expect(hasCurrentRef(ref)).toBe(42);
  });

  it("should return null if ref is null", () => {
    const ref = createRef<number>();

    expect(hasCurrentRef(ref)).toBe(null);
  });
});
