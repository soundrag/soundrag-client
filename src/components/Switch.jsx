import useModeStore from "../stores/useModeStore";
import { SwitchContainer, SwitchButton } from "../style/SwitchStyle";

import ViewButtonImage from "../assets/images/view-button.svg";
import DragButtonImage from "../assets/images/drag-button.svg";
import RotateButtonImage from "../assets/images/rotate-button.svg";

const Switch = () => {
  const { isViewMode, isDragMode, isRotateMode, switchMode } = useModeStore();

  return (
    <SwitchContainer>
      <SwitchButton $active={isViewMode()} onClick={() => switchMode("View")}>
        <img src={ViewButtonImage} />
      </SwitchButton>
      <SwitchButton $active={isDragMode()} onClick={() => switchMode("Drag")}>
        <img src={DragButtonImage} />
      </SwitchButton>
      <SwitchButton
        $active={isRotateMode()}
        onClick={() => switchMode("Rotate")}
      >
        <img src={RotateButtonImage} />
      </SwitchButton>
    </SwitchContainer>
  );
};

export default Switch;
