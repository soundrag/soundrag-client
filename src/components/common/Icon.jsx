import { IconContainer, IconImage } from "../../style/IconStyle";

const Icon = ({ imageSrc }) => {
  return (
    <IconContainer>
      <IconImage src={imageSrc} />
    </IconContainer>
  );
};

export default Icon;
