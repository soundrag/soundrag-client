import Modal from "../components/common/Modal";
import NavBar from "../components/common/NavBar";
import Button from "../components/common/Button";

import useModalStore from "../stores/useModalStore";

import { StudioContainer, SaveButtonContainer } from "../style/StudioPageStyle";

const StudioPage = () => {
  const { isModalOpen, openModal } = useModalStore();

  return (
    <>
      {isModalOpen && <Modal />}
      <NavBar />
      <StudioContainer></StudioContainer>
      <SaveButtonContainer>
        <Button text="Save" size="xLarge" handleClick={openModal} />
      </SaveButtonContainer>
    </>
  );
};

export default StudioPage;
