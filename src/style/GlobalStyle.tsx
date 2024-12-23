import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${reset};

  @font-face {
    font-family: "Jura";
    src: url("/fonts/Jura-VariableFont.woff") format("woff2");
    font-weight: 300 700;
    font-style: normal;
    font-display: swap;
  }

  html {
    font-family: "Jura", sans-serif;
    background-color: ${({ theme }) => theme.color.menuBackgroundColor};
  }

  * {
    font-family: inherit;
  }

  body {
    display: flex;
    justify-content: center;
    user-select: none;
  }

  button {
    outline: none;
  }
`;

export default GlobalStyle;
