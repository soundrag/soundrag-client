import axiosInstance from "./instance";

import type { UserData } from "../types/common";
import type {
  InquirePosition,
  SavePosition,
  DeletePosition,
} from "../types/services";

const getUserPosition = async (): Promise<InquirePosition> => {
  const response = await axiosInstance.get("/studio");

  return response.data;
};

const saveUserPosition = async (
  userId: string,
  userData: UserData,
): Promise<SavePosition> => {
  const response = await axiosInstance.post(`/studio/${userId}`, userData);

  return response.data;
};

const deleteUserPosition = async (
  positionId: string,
): Promise<DeletePosition> => {
  const response = await axiosInstance.delete(`/studio/${positionId}`);

  return response.data;
};

export { getUserPosition, saveUserPosition, deleteUserPosition };
