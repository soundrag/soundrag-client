import { useState } from "react";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

import Modal from "../components/common/Modal";
import NavHeader from "../components/common/NavHeader";
import Button from "../components/common/Button";
import MessageBox from "../components/common/MessageBox";
import Gallery from "../components/Gallery";
import Studio from "../components/Studio";
import ModeSwitch from "../components/Switch";
import UserInput from "../components/UserInput";

import useAutoSavedPosition from "../hooks/useAutoSavedPosition";
import useNavigateData from "../hooks/useNavigateData";
import useKeyboardEvent from "../hooks/useKeyboardEvent";

import { saveUserPosition } from "../services/userService";

import useAuthStore from "../stores/useAuthStore";
import useDataStore from "../stores/useDataStore";
import useModalStore from "../stores/useModalStore";
import useModelStore from "../stores/useModelStore";

import {
  GalleryContainer,
  KeyboardTutorialContainer,
  StudioPageContainer,
  StudioContainer,
  GalleryButtonContainer,
  MyGalleryContainer,
  SwitchButtonContainer,
  TutorialContainer,
  VersionContainer,
} from "../style/StudioPageStyle";

const StudioPage = () => {
  const [openGallery, setOpenGallery] = useState(false);
  const [name, setName] = useState("");

  const { isLoggedIn } = useAuthStore();
  const { userId, userData, setUserData, currentIndex } = useDataStore();
  const { modals, openModal, closeModal } = useModalStore();
  const { rotations, positions } = useModelStore();

  const lastIndex = userData.length - 1;
  const isLastIndex = currentIndex === lastIndex;

  const handleSaveButton = async () => {
    if (!userId) {
      toast.error("로그인이 필요합니다.");
      return;
    }

    const isDuplicate = userData.some(
      (item) =>
        item.firstSpeakerPosition === positions.firstSpeaker &&
        item.secondSpeakerPosition === positions.secondSpeaker &&
        item.listenerPosition === positions.listener &&
        item.firstSpeakerRotation === rotations.firstSpeaker &&
        item.secondSpeakerRotation === rotations.secondSpeaker &&
        item.listenerRotation === rotations.listener,
    );

    const nameExists = userData.some((item) => item.name !== "");

    if (isDuplicate && nameExists) {
      toast.error("이미 존재하는 위치입니다.");

      setName("");
      return;
    }

    const positionId = uuidv4();

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
      const newUserData = [...userData, userDataToSave];

      setUserData([...newUserData]);

      await saveUserPosition(userId, userDataToSave);

      setName("");
      closeModal("saveModal");

      toast.success("Complete! (Save)");
    } catch (error) {
      toast.error(`Error saving data: + ${error.message}`);
    }
  };

  const handleCancelButton = () => {
    setName("");
    closeModal("saveModal");
  };

  const handleGalleryButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    setOpenGallery(true);
  };

  const handleCloseGalleryButton = () => {
    setName("");
    setOpenGallery(false);
  };

  useAutoSavedPosition();
  useNavigateData();
  useKeyboardEvent();

  return (
    <StudioPageContainer>
      <NavHeader />
      <StudioContainer onClick={handleCloseGalleryButton}>
        <Studio />
        <GalleryContainer>
          <GalleryButtonContainer>
            <VersionContainer data-testid="version-text">
              버전: {isLastIndex ? "최신" : currentIndex + 1}
            </VersionContainer>
            <Button
              text={openGallery ? "뒤로" : "프리셋 보기"}
              size="large"
              isDisabled={!isLoggedIn}
              handleClick={handleGalleryButton}
              $testId="show-button"
            />
            <Button
              text="프리셋 저장"
              size="large"
              isDisabled={!isLoggedIn}
              handleClick={() => openModal("saveModal")}
              $testId="save-button"
            />
          </GalleryButtonContainer>
          {openGallery && (
            <MyGalleryContainer
              onClick={(event: React.MouseEvent<HTMLDivElement>) =>
                event.stopPropagation()
              }
            >
              <Gallery data={userData} />
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
          modalName="saveModal"
          modalTitle="저장"
          content={<UserInput value={name} setValue={setName} />}
          firstButtonText="취소"
          secondButtonText="저장"
          handleFirstButton={handleCancelButton}
          handleSecondButton={handleSaveButton}
          isEnabled={name.length > 0 && name.length < 20}
        />
      )}
    </StudioPageContainer>
  );
};

export default StudioPage;
