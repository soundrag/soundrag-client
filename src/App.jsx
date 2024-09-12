import { ThemeProvider } from "styled-components";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import GlobalStyle from "./style/GlobalStyle";
import Theme from "./style/Theme";

import SplashPage from "./pages/SplashPage";
import StudioPage from "./pages/StudioPage";
import UserDataPage from "./pages/UserDataPage";

const App = () => {
  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyle />
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
