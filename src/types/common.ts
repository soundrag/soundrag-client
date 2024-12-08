export type Mode = "View" | "Drag" | "Rotate";
export type ModelName = "firstSpeaker" | "secondSpeaker" | "listener";
export type Vector3Values = [number, number, number];
export type Positions = Record<string, Vector3Values>;

export interface UserData {
  name?: string;
  userId?: string;
  positionId: string;
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
