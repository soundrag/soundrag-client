import useModeStore from "../stores/useModeStore";

import { SwitchContainer, SwitchButton } from "../style/SwitchStyle";

const Switch = () => {
  const { isViewMode, isDragMode, switchMode } = useModeStore();

  return (
    <SwitchContainer>
      <SwitchButton $active={isViewMode()} onClick={() => switchMode("View")}>
        View
      </SwitchButton>
      <SwitchButton $active={isDragMode()} onClick={() => switchMode("Drag")}>
        Drag
      </SwitchButton>
    </SwitchContainer>
  );
};

export default Switch;
