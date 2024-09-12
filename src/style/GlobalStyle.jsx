import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${reset};

  html {
    font-family: "Jura", sans-serif;
  }

  * {
    font-family: inherit;
  }

  body {
    display: flex;
    justify-content: center;
  }
`;

export default GlobalStyle;
