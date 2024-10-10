import { IconContainer, IconImage } from "../../style/IconStyle";

const Icon = ({ imageSrc, imageAlt, $control }) => {
  return (
    <IconContainer $control={$control}>
      <IconImage src={imageSrc} alt={imageAlt} />
    </IconContainer>
  );
};

export default Icon;
