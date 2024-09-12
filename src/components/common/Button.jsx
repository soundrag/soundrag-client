import { ButtonContainer } from "../../style/ButtonStyle";

const Button = ({ text, size, isDisabled, handleClick }) => {
  return (
    <ButtonContainer size={size} disabled={isDisabled} onClick={handleClick}>
      {text}
    </ButtonContainer>
  );
};

export default Button;
