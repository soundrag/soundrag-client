import Icon from "./Icon";

import ViewButtonImage from "../../assets/images/view-button.svg";
import DragButtonImage from "../../assets/images/drag-button.svg";
import RotateButtonImage from "../../assets/images/rotate-button.svg";
import KeyboardImage from "../../assets/images/keyboard.svg";

import useModeStore from "../../stores/useModeStore";

import {
  MessageBoxContainer,
  MessageBoxMode,
  MessageBoxTitle,
  MessageBoxDescription,
} from "../../style/MessageBoxStyle";

import type { MessageBoxProps } from "../../types/components";

const MessageBox = ({ about }: MessageBoxProps) => {
  const isViewMode = useModeStore((state) => state.isViewMode());
  const isDragMode = useModeStore((state) => state.isDragMode());
  const isRotateMode = useModeStore((state) => state.isRotateMode());
  const aboutMode = about === "mode";

  return (
    <>
      {aboutMode ? (
        <MessageBoxContainer data-testid="tutorial">
          {isViewMode && (
            <>
              <MessageBoxMode>
                <Icon imageSrc={ViewButtonImage} imageAlt="View Mode" />
                시점 이동 모드
              </MessageBoxMode>
              <MessageBoxTitle>
                마우스로 드래그하여 시점을 움직입니다.
              </MessageBoxTitle>
              <MessageBoxDescription>
                1. 휠을 사용하면 시점을 멀리/가까이할 수 있습니다.
              </MessageBoxDescription>
              <MessageBoxDescription>
                2. 마우스로 드래그하면 바라보는 시점을 전환할 수 있습니다.
              </MessageBoxDescription>
            </>
          )}
          {isDragMode && (
            <>
              <MessageBoxMode>
                <Icon imageSrc={DragButtonImage} imageAlt="Drag Mode" />
                드래그 모드
              </MessageBoxMode>
              <MessageBoxTitle>
                마우스로 드래그하여 모델을 움직입니다.
              </MessageBoxTitle>
              <MessageBoxDescription>
                1. 마우스로 드래그하면 스피커는 수평으로 이동시킬 수 있습니다.
              </MessageBoxDescription>
              <MessageBoxDescription>
                2. 키보드와 마우스로 스피커를 수직으로 이동시킬 수 있습니다.
              </MessageBoxDescription>
              <MessageBoxDescription>
                3. 마우스로 드래그하면 청취자를 수평으로 이동시킬 수 있습니다.
              </MessageBoxDescription>
            </>
          )}
          {isRotateMode && (
            <>
              <MessageBoxMode>
                <Icon imageSrc={RotateButtonImage} imageAlt="Rotate Mode" />
                회전 모드
              </MessageBoxMode>
              <MessageBoxTitle>
                마우스를 클릭하여 모델을 회전합니다.
              </MessageBoxTitle>
              <MessageBoxDescription>
                1. 마우스를 클릭하면 스피커가 90도 씩 반시계방향으로 회전합니다.
              </MessageBoxDescription>
              <MessageBoxDescription>
                2. 청취자는 회전이 불가능합니다.
              </MessageBoxDescription>
            </>
          )}
        </MessageBoxContainer>
      ) : (
        <>
          <MessageBoxContainer $keyboard data-testid="shortcuts">
            <MessageBoxMode $keyboard>
              <Icon imageSrc={KeyboardImage} imageAlt="Shortcut Image" />
              단축키
            </MessageBoxMode>
            <MessageBoxTitle>[1, 2, 3] = 모드 전환</MessageBoxTitle>
            <MessageBoxTitle>[z] = 이전</MessageBoxTitle>
            <MessageBoxTitle>[x] = 다음</MessageBoxTitle>
            <MessageBoxTitle>
              [Shift] + Click = 스피커 천장 / 바닥 전환
            </MessageBoxTitle>
          </MessageBoxContainer>
        </>
      )}
    </>
  );
};

export default MessageBox;
