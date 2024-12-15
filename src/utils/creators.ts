import { MeshBasicMaterial, BoxGeometry, Mesh } from "three";

function createCeilingIndicator() {
  const material = new MeshBasicMaterial({
    color: 0x00ff00,
    transparent: true,
    opacity: 0.5,
  });
  const geometry = new BoxGeometry(1, 0.2, 1);

  return new Mesh(geometry, material);
}

export { createCeilingIndicator };
