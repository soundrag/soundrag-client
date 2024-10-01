import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${reset};

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
`;

export default GlobalStyle;
