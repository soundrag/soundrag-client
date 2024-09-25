import { useNavigate } from "react-router-dom";

import Button from "../components/common/Button";

import { ViewContainer, MessageContainer } from "../style/MessageViewStyle";

const MessageView = ({ message }) => {
  const navigate = useNavigate();

  const handleBackButton = () => {
    navigate("/studio");
  };

  return (
    <ViewContainer>
      <MessageContainer>{message}</MessageContainer>
      <Button text="Back" size="xLarge" handleClick={handleBackButton} />
    </ViewContainer>
  );
};

export default MessageView;
