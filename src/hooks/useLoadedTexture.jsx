import { useTexture } from "@react-three/drei";
import { RepeatWrapping } from "three";

const useLoadedTexture = (texturePath, repeatX = 4, repeatY = 4) => {
  const texture = useTexture(texturePath);

  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  texture.repeat.set(repeatX, repeatY);

  return texture;
};

export default useLoadedTexture;
