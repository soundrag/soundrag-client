import { useState } from "react";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

import { AUTO_SAVE_DELAY } from "../constants";

import Modal from "../components/common/Modal";
import NavHeader from "../components/common/NavHeader";
import Button from "../components/common/Button";
import MessageBox from "../components/common/MessageBox";
import Gallery from "../components/Gallery";
import Studio from "../components/Studio";
import ModeSwitch from "../components/Switch";
import UserInput from "../components/UserInput";

import useAutoSavePosition from "../hooks/useAutoSavePosition";
import useNavigateData from "../hooks/useNavigateData";
import useKeyboardEvent from "../hooks/useKeyboardEvent";

import { saveUserPosition, deleteUserPosition } from "../services/userService";

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
  GalleryButtons,
  MyGalleryContainer,
  SwitchButtonContainer,
  TutorialContainer,
  VersionContainer,
  VersionShortCut,
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

    const isDuplicate = userData.some((item) => {
      if (!item.name) {
        return false;
      }

      return (
        item.firstSpeakerPosition === positions.firstSpeaker &&
        item.secondSpeakerPosition === positions.secondSpeaker &&
        item.listenerPosition === positions.listener &&
        item.firstSpeakerRotation === rotations.firstSpeaker &&
        item.secondSpeakerRotation === rotations.secondSpeaker &&
        item.listenerRotation === rotations.listener
      );
    });

    if (isDuplicate) {
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

      toast.success("저장되었습니다!");
    } catch (saveError) {
      console.error(saveError);
      toast.error("서버에 저장에 실패하였습니다.", saveError);
    }
  };

  const handleResetButton = async () => {
    if (isLoggedIn) {
      const dataWithoutName = userData.filter((item) => !item.name);
      const dataWithName = userData.filter((item) => item.name);

      try {
        setUserData(dataWithName);

        await Promise.all(
          dataWithoutName.map((data) => {
            deleteUserPosition(data.positionId);
          }),
        );

        toast.success("버전을 초기화하였습니다.");
      } catch (resetError) {
        setUserData(userData);

        toast.error("초기화에 실패하였습니다.");
        console.error(
          "서버에 저장된 버전을 초기화하는데 실패하였습니다.",
          resetError,
        );
      }
    } else {
      try {
        localStorage.removeItem("savedUserData");

        setUserData([]);

        toast.success("버전을 초기화하였습니다.");
      } catch (resetError) {
        setUserData(userData);

        toast.error("초기화에 실패하였습니다.");
        console.error(
          "로컬 스토리지에 저장된 버전을 초기화하는데 실패하였습니다.",
          resetError,
        );
      }
    }
  };

  const handleCancelButton = () => {
    setName("");
    closeModal("saveModal");
  };

  const handleGalleryButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    setOpenGallery(!openGallery);
  };

  const handleCloseGalleryButton = () => {
    setName("");
    setOpenGallery(false);
  };

  const isEmptyVersion = () => {
    if (isLoggedIn) {
      const dataWithoutName = userData.filter((item) => !item.name);

      if (dataWithoutName.length === 0) return true;
    } else {
      const localVersion = localStorage.getItem("savedUserData");

      if (!localVersion) return true;
    }

    return false;
  };

  useAutoSavePosition(AUTO_SAVE_DELAY);
  useNavigateData();
  useKeyboardEvent();

  return (
    <StudioPageContainer>
      <NavHeader />
      <StudioContainer onClick={handleCloseGalleryButton}>
        <Studio />
        <GalleryContainer>
          <GalleryButtonContainer>
            <Button
              text="버전 초기화"
              size="large"
              handleClick={handleResetButton}
              isDisabled={isEmptyVersion()}
              $testId="reset-button"
            />
            <VersionContainer data-testid="version-text">
              <VersionShortCut>
                <div>이전 버전 (Z)</div>
                <div>/</div>
                <div>다음 버전 (X)</div>
              </VersionShortCut>
              버전: {isLastIndex ? "최신" : currentIndex + 1}
            </VersionContainer>
            <GalleryButtons>
              <Button
                text={openGallery ? "뒤로" : "나만의 공간"}
                size="large"
                isDisabled={!isLoggedIn}
                handleClick={handleGalleryButton}
                $testId="show-button"
              />
              <Button
                text="현재 공간 저장"
                size="large"
                isDisabled={!isLoggedIn}
                handleClick={() => openModal("saveModal")}
                $testId="save-button"
              />
            </GalleryButtons>
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
