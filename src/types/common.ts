export type Mode = "View" | "Drag" | "Rotate";
export type ModelName = "firstSpeaker" | "secondSpeaker" | "listener";
export type Vector3Values = [number, number, number];
export type Transformation = Record<string, Vector3Values>;

export interface UserData {
  userId?: string;
  positionId: string;
  name?: string;
  firstSpeakerPosition: Vector3Values;
  secondSpeakerPosition: Vector3Values;
  listenerPosition: Vector3Values;
  firstSpeakerRotation: Vector3Values;
  secondSpeakerRotation: Vector3Values;
  listenerRotation: Vector3Values;
}

export interface ModelControlHookProps {
  modelName: ModelName;
  isSpeaker: boolean;
}

export interface ModelInformationProps {
  position: Vector3Values;
  rotation: Vector3Values;
}
