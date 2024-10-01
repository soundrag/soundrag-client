import { toast } from "react-toastify";

import Modal from "../components/common/Modal";
import NavHeader from "../components/common/NavHeader";
import Button from "../components/common/Button";
import MessageBox from "../components/common/MessageBox";
import Gallery from "../components/Gallery";
import Studio from "../components/Studio";
import ModeSwitch from "../components/Switch";
import UserInputs from "../components/UserInputs";

import useUserAuth from "../hooks/useUserAuth";

import { saveUserPosition } from "../services/userService";

import useAuthStore from "../stores/useAuthStore";
import useDataStore from "../stores/useDataStore";
import useGalleryStore from "../stores/useGalleryStore";
import useModalStore from "../stores/useModalStore";
import useModelStore from "../stores/useModelStore";
import useInputStore from "../stores/useInputStore";

import {
  GalleryContainer,
  KeyboardTutorialContainer,
  StudioPageContainer,
  StudioContainer,
  GalleryButtonContainer,
  MyGalleryContainer,
  SwitchButtonContainer,
  TutorialContainer,
} from "../style/StudioPageStyle";

const StudioPage = () => {
  const { handleGallery } = useUserAuth();

  const { isLoggedIn } = useAuthStore();
  const { userId, userData, setUserData } = useDataStore();
  const { isGallery, toggleGallery, closeGallery } = useGalleryStore();
  const { modals, openModal, closeModal } = useModalStore();
  const { rotations, positions, positionId } = useModelStore();
  const { name, setName } = useInputStore();

  const handleSaveButton = async () => {
    if (!userId) {
      return;
    }

    const userDataToSave = {
      userId,
      positionId,
      name,
      firstSpeakerPosition: positions.firstSpeaker,
      secondSpeakerPosition: positions.secondSpeaker,
      listenerPosition: positions.listener,
      firstSpeakerRotation: rotations.firstSpeaker,
      secondSpeakerRotation: rotations.secondSpeaker,
      listenerRotation: rotations.listener,
    };

    try {
      await saveUserPosition(userId, userDataToSave);

      const newUserData = [...userData, userDataToSave];

      setUserData(newUserData);
      setName("");
      closeModal("saveModal");

      toast.success("Complete! (Save)");

      if (isGallery) {
        setUserData(newUserData);
      }
    } catch (error) {
      error.response && error.response.status === 409
        ? toast.error("Position ID already exists.")
        : toast.error(error.message);
    }
  };

  const handleCancelButton = () => {
    setName("");
    closeModal("saveModal");
  };

  const handleGalleryButton = (event) => {
    event.stopPropagation();

    handleGallery(toggleGallery);
  };

  const handleCloseGalleryButton = () => {
    closeGallery();
  };

  return (
    <StudioPageContainer>
      <NavHeader />
      <StudioContainer onClick={handleCloseGalleryButton}>
        <Studio />
        <GalleryContainer>
          <GalleryButtonContainer>
            <Button
              text={isGallery ? "뒤로" : "나의 정보"}
              size="large"
              isDisabled={!isLoggedIn}
              handleClick={handleGalleryButton}
            />
            <Button
              text="저장"
              size="large"
              isDisabled={!isLoggedIn}
              handleClick={() => openModal("saveModal")}
            />
          </GalleryButtonContainer>
          {isGallery && (
            <MyGalleryContainer onClick={(e) => e.stopPropagation()}>
              <Gallery />
            </MyGalleryContainer>
          )}
        </GalleryContainer>
      </StudioContainer>
      <KeyboardTutorialContainer>
        <MessageBox about="keyboard" />
      </KeyboardTutorialContainer>
      <SwitchButtonContainer>
        <ModeSwitch />
      </SwitchButtonContainer>
      <TutorialContainer>
        <MessageBox about="mode" />
      </TutorialContainer>
      {modals.saveModal && (
        <Modal
          modalId="saveModal"
          modalTitle="저장"
          content={<UserInputs />}
          firstButtonText="취소"
          secondButtonText="저장"
          handleFirstButton={handleCancelButton}
          handleSecondButton={handleSaveButton}
        />
      )}
    </StudioPageContainer>
  );
};

export default StudioPage;
