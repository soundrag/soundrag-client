import useModeStore from "../stores/useModeStore";
import {
  SwitchContainer,
  SwitchNumber,
  SwitchButton,
} from "../style/SwitchStyle";

import ViewButtonImage from "../assets/images/view-button.svg";
import DragButtonImage from "../assets/images/drag-button.svg";
import RotateButtonImage from "../assets/images/rotate-button.svg";
import Icon from "./common/Icon";

const Switch = () => {
  const { isViewMode, isDragMode, isRotateMode, switchMode } = useModeStore();

  return (
    <SwitchContainer>
      <SwitchButton $active={isViewMode()} onClick={() => switchMode("View")}>
        <SwitchNumber>1</SwitchNumber>
        <Icon imageSrc={ViewButtonImage} imageAlt="View Mode Button" />
      </SwitchButton>
      <SwitchButton $active={isDragMode()} onClick={() => switchMode("Drag")}>
        <SwitchNumber>2</SwitchNumber>
        <Icon imageSrc={DragButtonImage} imageAlt="Drag Mode Button" />
      </SwitchButton>
      <SwitchButton
        $active={isRotateMode()}
        onClick={() => switchMode("Rotate")}
      >
        <SwitchNumber>3</SwitchNumber>
        <Icon imageSrc={RotateButtonImage} imageAlt="Rotate Mode Button" />
      </SwitchButton>
    </SwitchContainer>
  );
};

export default Switch;
