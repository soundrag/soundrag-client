import { toast } from "react-toastify";

import DeleteButtonImage from "../assets/images/delete-button.svg";

import Button from "./common/Button";
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
  DeleteButton,
} from "../style/GalleryStyle";

import type { UserData } from "../types/common";
import type { GalleryProps } from "../types/components";
import { useState } from "react";

const Gallery = ({ data }: GalleryProps) => {
  const [positionIdToDelete, setPositionIdToDelete] = useState(null);

  const { userData, setUserData } = useDataStore();
  const { modals, openModal, closeModal } = useModalStore();
  const { setModelPositions, setModelRotations } = useModelStore();

  const filteredUserData = userData.filter((item) => item.name);

  const handleOpenDeleteModal = (item: UserData) => {
    setPositionIdToDelete(item.positionId);
    openModal("deleteModal");
  };

  const handleCloseDeleteModal = () => {
    closeModal("deleteModal");
  };

  const handleDetailButton = (item: UserData) => {
    setModelPositions("firstSpeaker", item.firstSpeakerPosition);
    setModelPositions("secondSpeaker", item.secondSpeakerPosition);
    setModelPositions("listener", item.listenerPosition);
    setModelRotations("firstSpeaker", item.firstSpeakerRotation);
    setModelRotations("secondSpeaker", item.secondSpeakerRotation);
    setModelRotations("listener", item.listenerRotation);
  };

  const handleDeleteButton = async (positionId: string) => {
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
        {filteredUserData.length !== 0 && (
          <thead>
            <tr>
              <th>이름</th>
              <th>버튼</th>
            </tr>
          </thead>
        )}
        <tbody>
          {filteredUserData.map((item) => (
            <DataListRow key={item.positionId}>
              <DataListCell>{item.name}</DataListCell>
              <DataListCell className="button-container">
                <Button
                  text="보기"
                  size="small"
                  handleClick={() => handleDetailButton(item)}
                />
                <DeleteButton onClick={() => handleOpenDeleteModal(item)}>
                  <img src={DeleteButtonImage} alt="Delete" />
                </DeleteButton>
              </DataListCell>
            </DataListRow>
          ))}
        </tbody>
      </DataList>
      {modals.deleteModal && (
        <Modal
          modalName="deleteModal"
          modalTitle="삭제"
          content={
            <div>
              <p className="delete-rule">
                정말 <span>삭제</span> 하시겠습니까?
              </p>
            </div>
          }
          firstButtonText="뒤로"
          secondButtonText="삭제"
          handleFirstButton={handleCloseDeleteModal}
          handleSecondButton={() => handleDeleteButton(positionIdToDelete)}
        />
      )}
    </DataListContainer>
  );
};

export default Gallery;
