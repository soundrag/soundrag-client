import Modal from "../components/common/Modal";
import NavHeader from "../components/common/NavHeader";
import Button from "../components/common/Button";

import useModalStore from "../stores/useModalStore";

import { StudioContainer, SaveButtonContainer } from "../style/StudioPageStyle";

const StudioPage = () => {
  const { modals, openModal, closeModal } = useModalStore();

  return (
    <>
      {modals.saveModal && (
        <Modal
          modalId="saveModal"
          content="Save?"
          firstButtonText="Back"
          handleFirstButton={() => closeModal("saveModal")}
        />
      )}
      <NavHeader />
      <StudioContainer></StudioContainer>
      <SaveButtonContainer>
        <Button
          text="Save"
          size="xLarge"
          handleClick={() => openModal("saveModal")}
        />
      </SaveButtonContainer>
    </>
  );
};

export default StudioPage;
