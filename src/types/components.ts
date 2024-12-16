import type { ModelName } from "./common";
import type { UserData } from "./common";
import type { Vector3, Euler } from "three";

export interface ButtonProps {
  text: string;
  size?: "small" | "medium" | "large" | "xLarge";
  isDisabled?: boolean;
  handleClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  $testId: string;
}

export interface IconProps {
  imageSrc: string;
  imageAlt: string;
  $control?: boolean;
}

export interface MessageBoxProps {
  about: "mode" | "keyboard";
}

export interface ModalProps {
  modalName: string;
  modalTitle?: string;
  content?: string | React.ReactNode;
  firstButtonText: string;
  secondButtonText?: string;
  handleFirstButton: () => void;
  handleSecondButton?: () => void;
  $modalTestId?: string;
  $firstButtonTestId?: string;
  $secondButtonTestId?: string;
  isEnabled?: boolean;
}

export interface ModelProps {
  modelName: ModelName;
}

export interface WallProps {
  position: Vector3;
  rotation: Euler;
}

export interface GalleryProps {
  data: UserData[];
}

export interface UserInputProps {
  value: string;
  setValue: (value: string) => void;
}

export interface UploadFileProps {
  hasUploadFile: boolean;
  setHasUploadFile: (hasUploadFile: boolean) => void;
}
