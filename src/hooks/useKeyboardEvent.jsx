import { useEffect } from "react";

const useKeyboardEvent = (callback) => {
  useEffect(() => {
    const handleCallback = (event) => {
      callback(event);
    };

    window.addEventListener("keydown", handleCallback);

    return () => {
      window.removeEventListener("keydown", handleCallback);
    };
  }, [callback]);
};

export default useKeyboardEvent;
