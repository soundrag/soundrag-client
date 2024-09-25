import { useEffect } from "react";

const useKeyboardEvent = (callback) => {
  useEffect(() => {
    const handleCallback = (event) => {
      const target = event.target;
      const tagName = target.tagName.toUpperCase();

      if (
        target.isContentEditable ||
        tagName === "INPUT" ||
        tagName === "TEXTAREA" ||
        tagName === "SELECT"
      ) {
        return;
      }

      callback(event);
    };

    window.addEventListener("keydown", handleCallback);

    return () => {
      window.removeEventListener("keydown", handleCallback);
    };
  }, [callback]);
};

export default useKeyboardEvent;
