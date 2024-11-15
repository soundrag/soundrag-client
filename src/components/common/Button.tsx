import { ButtonContainer } from "../../style/ButtonStyle";

import type { ButtonProps } from "../../types/components";

const Button = ({ text, size, isDisabled, handleClick }: ButtonProps) => {
	return (
		<ButtonContainer size={size} disabled={isDisabled} onClick={handleClick}>
			{text}
		</ButtonContainer>
	);
};

export default Button;
