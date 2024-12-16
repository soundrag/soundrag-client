import type { Object3D } from "three";
import type { Mode } from "../types/common";
import type { ModelName } from "../types/common";
import type { UserData } from "../types/common";
import type { Vector3Values } from "../types/common";

export interface FileState {
  fileName: string;
  fileUrl: string;
  showFullFileName: boolean;
  temporaryFileName: string | null;
  temporaryAudioUrl: string | null;

  setShowFullFileName: (showFullFileName: boolean) => void;
  setTemporaryFile: (file: File) => void;
  resetTemporaryFile: () => void;
  setUploadedFile: () => void;
  resetUploadedFile: () => void;
}

export interface AuthState {
  isLoggedIn: boolean;

  setIsLoggedIn: (loggedIn: boolean) => void;
}

export interface DataState {
  userId: string;
  userData: UserData[];
  currentIndex: number;

  setUserId: (userId: string) => void;
  setUserData: (data: UserData[]) => void;
  setCurrentIndex: (index: number) => void;
}

export interface ModalState {
  modals: Record<string, boolean>;
  openModal: (id: string) => void;
  closeModal: (id: string) => void;
}

export interface ModelState {
  scales: Record<string, number>;
  rotations: Record<ModelName, Vector3Values>;
  positions: Record<ModelName, Vector3Values>;

  setModelName: (modelName: string, scene: Object3D) => void;
  setModelRotations: (modelName: string, rotation: Vector3Values) => void;
  setModelPositions: (modelName: string, position: Vector3Values) => void;
}

export interface ModeState {
  mode: Mode;
  modes: Mode[];

  isViewMode: () => boolean;
  isDragMode: () => boolean;
  isRotateMode: () => boolean;
  switchMode: (newMode: Mode) => void;
}
