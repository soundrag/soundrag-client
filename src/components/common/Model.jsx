import { useEffect } from "react";
import { useThree } from "@react-three/fiber";

import useModelStore from "../../stores/useModelStore";

const Model = ({ modelName }) => {
  const { model, scale, position } = useModelStore((state) => ({
    model: state.models[modelName],
    scale: state.scales[modelName],
    position: state.positions[modelName],
  }));

  const { scene } = useThree();

  useEffect(() => {
    if (model) {
      const clonedScene = model.clone();

      clonedScene.position.set(...position);
      clonedScene.scale.set(scale, scale, scale);

      clonedScene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
        }
      });
      scene.add(clonedScene);

      return () => scene.remove(clonedScene);
    }
  }, [model, modelName, scene, scale, position]);

  return null;
};

export default Model;
