import useModeStore from "../stores/useModeStore";
import {
  SwitchContainer,
  SwitchButton,
  SwitchSlider,
} from "../style/SwitchStyle";

const Switch = () => {
  const { isViewMode, isDragMode, switchMode } = useModeStore();

  return (
    <SwitchContainer>
      <SwitchButton
        className="view-button"
        $active={isViewMode()}
        onClick={() => switchMode("View")}
      >
        View
      </SwitchButton>
      <SwitchButton
        className="drag-button"
        $active={isDragMode()}
        onClick={() => switchMode("Drag")}
      >
        Drag
      </SwitchButton>
      <SwitchSlider $active={isViewMode()} />
    </SwitchContainer>
  );
};

export default Switch;
