import { IconContainer, IconImage } from "../../style/IconStyle";

import type { IconProps } from "../../types/components";

const Icon = ({ imageSrc, imageAlt, $control }: IconProps) => {
	return (
		<IconContainer $control={$control}>
			<IconImage src={imageSrc} alt={imageAlt} />
		</IconContainer>
	);
};

export default Icon;
