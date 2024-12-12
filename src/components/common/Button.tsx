import { ButtonContainer } from "../../style/ButtonStyle";

import type { ButtonProps } from "../../types/components";

const Button = ({
  text,
  size,
  isDisabled,
  handleClick,
  $testId,
}: ButtonProps) => {
  return (
    <ButtonContainer
      size={size}
      disabled={isDisabled}
      onClick={handleClick}
      data-testid={$testId}
    >
      {text}
    </ButtonContainer>
  );
};

export default Button;
