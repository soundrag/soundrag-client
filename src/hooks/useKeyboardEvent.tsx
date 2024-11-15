import { useEffect } from "react";

import { toast } from "react-toastify";

import useDataStore from "../stores/useDataStore";
import useModeStore from "../stores/useModeStore";

const useKeyboardEvent = () => {
	const { userData, currentIndex, setCurrentIndex } = useDataStore();
	const { switchMode } = useModeStore();

	const userDataLength = userData.length;

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			const target = event.target as HTMLElement;
			const tagName = target.tagName.toUpperCase();
			const isInitialIndex = currentIndex === 0;
			const isLastIndex = currentIndex === userDataLength - 1;

			if (
				target.isContentEditable ||
				tagName === "INPUT" ||
				tagName === "TEXTAREA" ||
				tagName === "SELECT"
			) {
				return;
			}

			switch (event.key) {
				case "1":
					switchMode("View");
					break;
				case "2":
					switchMode("Drag");
					break;
				case "3":
					switchMode("Rotate");
					break;
				case "z":
				case "ㅋ":
					if (isInitialIndex) {
						toast.info("처음입니다.");
					} else {
						setCurrentIndex(currentIndex - 1);
					}
					break;
				case "x":
				case "ㅌ":
					if (isLastIndex) {
						toast.info("마지막입니다.");
					} else {
						setCurrentIndex(currentIndex + 1);
					}
					break;
				default:
					break;
			}
		};

		window.addEventListener("keydown", handleKeyDown);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [switchMode, setCurrentIndex, currentIndex, userDataLength]);
};

export default useKeyboardEvent;
