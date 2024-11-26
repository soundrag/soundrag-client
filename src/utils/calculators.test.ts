import { describe, it, expect } from "vitest";
import { Vector3, Plane, Camera, WebGLRenderer } from "three";

import {
  calculateSliderValue,
  calculateIntersectPoint,
  calculateNewPosition,
  constrainPosition,
  calculatePan,
} from "./calculators";

describe("calculateSliderValue function", () => {
  it("should format the slider value to percentage", () => {
    expect(calculateSliderValue(0, 120)).toBe(0);
    expect(calculateSliderValue(30, 120)).toBe(25);
    expect(calculateSliderValue(120, 120)).toBe(100);
  });
});

describe("calculateIntersectPoint function", () => {
  it("should return a point on the plane", () => {
    const plane = new Plane(new Vector3(0, 1, 0), 0);
    const camera = new Camera();
    const gl = {
      domElement: { clientWidth: 1920, clientHeight: 1080 },
    } as WebGLRenderer;
    const event = { clientX: 960, clientY: 540 } as MouseEvent;

    const intersectPoint = calculateIntersectPoint(plane, event, camera, gl);

    expect(intersectPoint.y).toBeCloseTo(0, 5);
    expect(intersectPoint.x).toBeLessThan(1);
    expect(intersectPoint.z).toBeLessThan(1);
  });
});

describe("calculateNewPosition function", () => {
  it("should return the correct new position", () => {
    const initialPosition = new Vector3(0, 0, 0);
    const initialIntersect = new Vector3(1, 0, 1);
    const currentIntersect = new Vector3(2, 0, 2);

    const newPosition = calculateNewPosition(
      initialPosition,
      currentIntersect,
      initialIntersect,
    );
    expect(newPosition.equals(new Vector3(1, 0, 1))).toBe(true);
  });
});

describe("constrainPosition function", () => {
  it("should constrain the position within ROOM_SIZE", () => {
    const position = new Vector3(20, 0, 20);
    const size = 0.5;
    const ROOM_SIZE = 30;

    constrainPosition(position, size, ROOM_SIZE);
    expect(position.x).toBe(14.5);
    expect(position.z).toBe(14.5);
    expect(position.y).toBe(0);
  });
});

describe("calculatePan function", () => {
  it("should calculate the pan value correctly", () => {
    const listenerPosition: [number, number, number] = [0, 0, 0];
    const speakerPosition: [number, number, number] = [1, 0, 1];
    const pan = calculatePan(listenerPosition, speakerPosition);

    expect(pan).toBeCloseTo(Math.cos(Math.atan2(-1, -1)), -1);
  });
});
