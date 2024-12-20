import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import useModeStore from "../stores/useModeStore";
import useVersionStore from "../stores/useVersionStore";

const useKeyboardEvent = () => {
  const { userVersion, versionIndex, setVersionIndex } = useVersionStore();
  const { switchMode } = useModeStore();

  const [isShiftPressed, setIsShiftPressed] = useState(false);
  const userVersionLength = userVersion.length;

  const handleModeSwitch = (key: string) => {
    switch (key) {
      case "1":
        switchMode("View");
        break;
      case "2":
        switchMode("Drag");
        break;
      case "3":
        switchMode("Rotate");
        break;
      default:
        break;
    }
  };

  const handleDataNavigation = (key: string) => {
    const isInitialIndex = versionIndex === 0;
    const isLastIndex = versionIndex === userVersionLength - 1;

    if (key === "z" || key === "ㅋ") {
      if (isInitialIndex) {
        toast.info("처음 버전입니다.");
      } else {
        setVersionIndex(versionIndex - 1);
      }
    } else if (key === "x" || key === "ㅌ") {
      if (isLastIndex) {
        toast.info("마지막 버전입니다.");
      } else {
        setVersionIndex(versionIndex + 1);
      }
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    const target = event.target as HTMLElement;
    const tagName = target.tagName.toUpperCase();

    if (
      target.isContentEditable ||
      ["INPUT", "TEXTAREA", "SELECT"].includes(tagName)
    ) {
      return;
    }

    switch (event.key) {
      case "1":
      case "2":
      case "3":
        handleModeSwitch(event.key);
        break;
      case "z":
      case "ㅋ":
      case "x":
      case "ㅌ":
        handleDataNavigation(event.key);
        break;
      case "Shift":
        setIsShiftPressed(true);
        break;
      default:
        break;
    }
  };

  const handleKeyUp = (event: KeyboardEvent) => {
    if (event.key === "Shift") {
      setIsShiftPressed(false);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [versionIndex, userVersion]);

  return { isShiftPressed };
};

export default useKeyboardEvent;
