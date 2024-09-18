import Modal from "../components/common/Modal";
import NavHeader from "../components/common/NavHeader";
import Button from "../components/common/Button";

import Studio from "../components/Studio";

import useModalStore from "../stores/useModalStore";

import { StudioContainer, SaveButtonContainer } from "../style/StudioPageStyle";

const StudioPage = () => {
  const { modals, openModal, closeModal } = useModalStore();

  return (
    <>
      <NavHeader />
      <StudioContainer>
        <Studio />
      </StudioContainer>
      <SaveButtonContainer>
        <Button
          text="Save"
          size="xLarge"
          handleClick={() => openModal("saveModal")}
        />
      </SaveButtonContainer>
      {modals.saveModal && (
        <Modal
          modalId="saveModal"
          content="Save?"
          firstButtonText="Back"
          handleFirstButton={() => closeModal("saveModal")}
        />
      )}
    </>
  );
};

export default StudioPage;
