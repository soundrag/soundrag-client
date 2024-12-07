import type { Object3D } from "three";
import type { Mode } from "../types/common";
import type { ModelName } from "../types/common";
import type { UserData } from "../types/common";
import type { Vector3Values } from "../types/common";

export interface AudioState {
  isPlaying: boolean;
  hasUploaded: boolean;

  duration: number;
  currentTime: number;

  file: File | string;
  fileName: string;
  fileUrl: string;
  showFullFileName: boolean;

  temporaryFile: File | null;
  temporaryFileName: string | null;
  temporaryAudioUrl: string | null;

  togglePlayPause: () => void;
  setDuration: (duration: number) => void;
  setCurrentTime: (currentTime: number) => void;
  setShowFullFileName: () => void;

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
  positionId: string;
  positionIdToDelete: string;

  userData: UserData[];

  currentIndex: number;

  setUserId: (userId: string) => void;
  setPositionIdToDelete: (positionId: string) => void;
  setUserData: (data: UserData[]) => void;
  resetUserData: () => void;
  setCurrentIndex: (index: number) => void;
}

export interface GalleryState {
  isGallery: boolean;
  toggleGallery: () => void;
  closeGallery: () => void;
}

export interface InputState {
  name: string;
  isNameValid: boolean;

  setName: (name: string) => void;
}

export interface ModalState {
  modals: Record<string, boolean>;
  openModal: (id: string) => void;
  closeModal: (id: string) => void;
}

export interface ModelState {
  models: Record<string, Object3D | undefined>;
  scales: Record<string, number>;
  rotations: Record<ModelName, Vector3Values>;
  positions: Record<ModelName, Vector3Values>;
  positionId: string;

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

  toggleMode: () => void;
  switchMode: (newMode: Mode) => void;
}
