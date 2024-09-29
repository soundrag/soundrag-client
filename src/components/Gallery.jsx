import { toast } from "react-toastify";

import Button from "../components/common/Button";
import Modal from "./common/Modal";

import { deleteUserPosition } from "../services/userService";

import useDataStore from "../stores/useDataStore";
import useModalStore from "../stores/useModalStore";
import useModelStore from "../stores/useModelStore";

import {
  DataListContainer,
  DataList,
  DataListRow,
  DataListCell,
} from "../style/GalleryStyle";

const Gallery = ({ data }) => {
  const { userData, setUserData, positionIdToDelete, setPositionIdToDelete } =
    useDataStore();
  const { modals, openModal, closeModal } = useModalStore();
  const { setUserPositions } = useModelStore();

  const handleOpenDeleteModal = (item) => {
    setPositionIdToDelete(item.positionId);
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

  return (
    <DataListContainer>
      <DataList>
        {userData.length !== 0 && (
          <thead>
            <tr>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
        )}
        <tbody>
          {userData.length !== 0 &&
            userData.map((item, index) => (
              <DataListRow key={index}>
                <DataListCell>{item.name}</DataListCell>
                <DataListCell className="button-container">
                  <Button
                    text="Detail"
                    size="xSmall"
                    handleClick={() => handleDetailButton(item)}
                  />
                  <Button
                    text="Del"
                    size="xSmall"
                    handleClick={() => handleOpenDeleteModal(item)}
                  />
                </DataListCell>
              </DataListRow>
            ))}
        </tbody>
      </DataList>
      {modals.deleteModal && (
        <Modal
          modalId="deleteModal"
          modalTitle="Delete"
          content={
            <div>
              <p className="delete-rule">
                This action is <span>permanent</span>
              </p>
            </div>
          }
          firstButtonText="Back"
          secondButtonText="Del"
          handleFirstButton={handleCloseDeleteModal}
          handleSecondButton={() => handleDeleteButton(positionIdToDelete)}
        />
      )}
    </DataListContainer>
  );
};

export default Gallery;
