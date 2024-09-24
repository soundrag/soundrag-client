import { ThemeProvider } from "styled-components";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import useAutoSavedPosition from "./hooks/useAutoSavedPosition";
import useKeyboardEvent from "./hooks/useKeyboardEvent";

import useModeStore from "./stores/useModeStore";
import useModelStore from "./stores/useModelStore";

import GlobalStyle from "./style/GlobalStyle";
import Theme from "./style/Theme";

import SplashPage from "./pages/SplashPage";
import StudioPage from "./pages/StudioPage";
import UserDataPage from "./pages/UserDataPage";

const App = () => {
  const { toggleMode } = useModeStore();
  const { restorePositions } = useModelStore();

  const handleKeyDownEvent = (event) => {
    if (event.key === "m" || event.key === "M") {
      toggleMode();
    } else if (event.key === "Backspace") {
      restorePositions();
    }
  };

  useAutoSavedPosition();
  useKeyboardEvent(handleKeyDownEvent);

  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyle />
      <ToastContainer
        position="bottom-right"
        theme="dark"
        autoClose={1000}
        limit={2}
      />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SplashPage />} />
          <Route path="/studio" element={<StudioPage />} />
          <Route path="/user" element={<UserDataPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
