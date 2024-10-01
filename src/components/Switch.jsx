import useModeStore from "../stores/useModeStore";
import {
  SwitchContainer,
  SwitchNumber,
  SwitchImage,
  SwitchButton,
} from "../style/SwitchStyle";

import ViewButtonImage from "../assets/images/view-button.svg";
import DragButtonImage from "../assets/images/drag-button.svg";
import RotateButtonImage from "../assets/images/rotate-button.svg";

const Switch = () => {
  const { isViewMode, isDragMode, isRotateMode, switchMode } = useModeStore();

  return (
    <SwitchContainer>
      <SwitchButton $active={isViewMode()} onClick={() => switchMode("View")}>
        <SwitchNumber>1</SwitchNumber>
        <SwitchImage src={ViewButtonImage} />
      </SwitchButton>
      <SwitchButton $active={isDragMode()} onClick={() => switchMode("Drag")}>
        <SwitchNumber>2</SwitchNumber>
        <SwitchImage src={DragButtonImage} />
      </SwitchButton>
      <SwitchButton
        $active={isRotateMode()}
        onClick={() => switchMode("Rotate")}
      >
        <SwitchNumber>3</SwitchNumber>
        <SwitchImage src={RotateButtonImage} />
      </SwitchButton>
    </SwitchContainer>
  );
};

export default Switch;
