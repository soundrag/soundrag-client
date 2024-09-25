import { toast } from "react-toastify";

import Modal from "../components/common/Modal";
import NavHeader from "../components/common/NavHeader";
import Button from "../components/common/Button";
import Studio from "../components/Studio";
import UserInputs from "../components/UserInputs";

import { saveUserPosition } from "../services/userService";

import useAuthStore from "../stores/useAuthStore";
import useModalStore from "../stores/useModalStore";
import useModelStore from "../stores/useModelStore";
import useInputStore from "../stores/useInputStore";

import {
  StudioPageContainer,
  StudioContainer,
  SaveButtonContainer,
} from "../style/StudioPageStyle";

const StudioPage = () => {
  const { userId, isLoggedIn } = useAuthStore();
  const { modals, openModal, closeModal } = useModalStore();
  const { positions, positionId } = useModelStore();
  const { name, description, setName, setDescription } = useInputStore();

  const handleSaveButton = async () => {
    if (!userId) {
      return;
    }

    const userData = {
      userId,
      positionId,
      name,
      description,
      firstSpeakerPosition: positions.firstSpeaker,
      secondSpeakerPosition: positions.secondSpeaker,
      listenerPosition: positions.listener,
    };

    await saveUserPosition(userId, userData);

    closeModal("saveModal");

    toast.success("Complete! (Save)");

    setName("");
    setDescription("");
  };

  const handleCancelButton = () => {
    closeModal("saveModal");

    setName("");
    setDescription("");
  };

  return (
    <StudioPageContainer>
      <NavHeader />
      <StudioContainer>
        <Studio />
      </StudioContainer>
      <SaveButtonContainer>
        <Button
          text="Save"
          size="xLarge"
          isDisabled={!isLoggedIn}
          handleClick={() => openModal("saveModal")}
        />
      </SaveButtonContainer>
      {modals.saveModal && (
        <Modal
          modalId="saveModal"
          content={<UserInputs />}
          firstButtonText="Cancel"
          secondButtonText="Save"
          handleFirstButton={handleCancelButton}
          handleSecondButton={handleSaveButton}
        />
      )}
    </StudioPageContainer>
  );
};

export default StudioPage;
