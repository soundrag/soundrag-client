export type Vector3Values = [number, number, number];

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
