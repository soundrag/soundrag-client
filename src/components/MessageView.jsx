import Button from "../components/common/Button";

import { ViewContainer, MessageContainer } from "../style/MessageViewStyle";

const MessageView = ({ message }) => {
  return (
    <ViewContainer>
      <MessageContainer>{message}</MessageContainer>
      <Button text="Back" size="xLarge" />
    </ViewContainer>
  );
};

export default MessageView;
