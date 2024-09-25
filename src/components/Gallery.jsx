import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Button from "../components/common/Button";
import MessageView from "../components/MessageView";
import Modal from "./common/Modal";

import { deleteUserPosition } from "../services/userService";

import useAuthStore from "../stores/useAuthStore";
import useModalStore from "../stores/useModalStore";
import useModelStore from "../stores/useModelStore";

import { formatDate } from "../utils/formatters";

import {
  DataListContainer,
  DataList,
  DataListRow,
  DataListCell,
} from "../style/GalleryStyle";

const Gallery = ({ data }) => {
  const { userData, setUserData } = useAuthStore();
  const { modals, openModal, closeModal } = useModalStore();
  const { setUserPositions } = useModelStore();

  const navigate = useNavigate();

  const handleOpenDeleteModal = () => {
    openModal("deleteModal");
  };

  const handleCloseDeleteModal = () => {
    closeModal("deleteModal");
  };

  const handleDetailButton = (item) => {
    setUserPositions(
      item.firstSpeakerPosition,
      item.secondSpeakerPosition,
      item.listenerPosition,
    );
    navigate("/studio");
  };

  const handleBackButton = () => {
    navigate("/studio");
  };

  const handleDeleteButton = async (positionId) => {
    const updatedData = userData.filter(
      (item) => item.positionId !== positionId,
    );

    setUserData(updatedData);

    try {
      await deleteUserPosition(positionId);

      closeModal("deleteModal");

      toast.success("Complete! (Delete)");
    } catch (error) {
      setUserData(data);

      throw error;
    }
  };

  if (userData.length === 0) {
    return <MessageView message="Empty" />;
  }

  return (
    <DataListContainer>
      <DataList>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((item, index) => (
            <DataListRow key={index}>
              <DataListCell>{item.name}</DataListCell>
              <DataListCell>{item.description}</DataListCell>
              <DataListCell>{formatDate(item.createdAt)}</DataListCell>
              <DataListCell className="button-container">
                <Button
                  text="Detail"
                  size="small"
                  handleClick={() => handleDetailButton(item)}
                />
                <Button
                  text="Del"
                  size="small"
                  handleClick={handleOpenDeleteModal}
                />
              </DataListCell>
              {modals.deleteModal && (
                <Modal
                  modalId="deleteModal"
                  content="Delete it?"
                  firstButtonText="Back"
                  secondButtonText="Del"
                  handleFirstButton={handleCloseDeleteModal}
                  handleSecondButton={() => handleDeleteButton(item.positionId)}
                />
              )}
            </DataListRow>
          ))}
        </tbody>
      </DataList>
      <Button text="Back" size="xLarge" handleClick={handleBackButton} />
    </DataListContainer>
  );
};

export default Gallery;
