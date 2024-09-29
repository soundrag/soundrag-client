import { IconContainer, IconImage } from "../../style/IconStyle";

const Icon = ({ imageSrc, $control }) => {
  return (
    <IconContainer $control={$control}>
      <IconImage src={imageSrc} />
    </IconContainer>
  );
};

export default Icon;
