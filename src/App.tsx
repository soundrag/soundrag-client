import { useGLTF, useTexture } from "@react-three/drei";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import SplashPage from "./pages/SplashPage";
import StudioPage from "./pages/StudioPage";
import GalleryPage from "./pages/GalleryPage";

import GlobalStyle from "./style/GlobalStyle";
import Theme from "./style/Theme";

useGLTF.preload("/models/speaker.gltf");
useGLTF.preload("/models/listener.gltf");
useTexture.preload("/textures/carpet.jpg");
useTexture.preload("/textures/foam.jpg");

const App = () => {
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
          <Route path="/user" element={<GalleryPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
