import { describe, it, expect } from "vitest";
import { MeshBasicMaterial, BoxGeometry, Mesh } from "three";
import { createCeilingIndicator } from "./creators";

describe("createCeilingIndicator", () => {
  it("should return a Mesh object", () => {
    const ceilingIndicator = createCeilingIndicator();

    expect(ceilingIndicator).toBeInstanceOf(Mesh);
  });

  it("should use BoxGeometry with correct dimensions", () => {
    const ceilingIndicator = createCeilingIndicator();

    expect(ceilingIndicator.geometry).toBeInstanceOf(BoxGeometry);

    const { parameters } = ceilingIndicator.geometry;

    expect(parameters.width).toBe(1);
    expect(parameters.height).toBe(0.2);
    expect(parameters.depth).toBe(1);
  });

  it("should use MeshBasicMaterial with correct properties", () => {
    const ceilingIndicator = createCeilingIndicator();

    expect(ceilingIndicator.material).toBeInstanceOf(MeshBasicMaterial);

    const material = ceilingIndicator.material;

    expect(material.color.getHex()).toBe(0x00ff00);
    expect(material.transparent).toBe(true);
    expect(material.opacity).toBe(0.5);
  });
});
