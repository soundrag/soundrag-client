import styled from "styled-components";

interface IconStyleProps {
	$control?: boolean;
}

const IconContainer = styled.div<IconStyleProps>`
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    &::before,
    &::after {
      content: "";
      position: absolute;
      width: 0.4rem;
      height: 0.4rem;
      border: 0.2rem solid
        ${({ theme, $control }) =>
					$control
						? theme.color.buttonHoverSubColor
						: theme.color.buttonHoverFontColor};
    }

    &::before {
      top: -0.1rem;
      left: -0.1rem;
      border-bottom: none;
      border-right: none;
      border-top-left-radius: 1rem;
    }

    &::after {
      bottom: -0.1rem;
      right: -0.1rem;
      border-top: none;
      border-left: none;
      border-bottom-right-radius: 1rem;
    }
  }
`;

const IconImage = styled.img`
  width: 80%;
  height: 80%;
`;

export { IconContainer, IconImage };
