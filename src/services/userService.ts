import axiosInstance from "./instance";
import type { AxiosResponse } from "axios";
import type { UserData } from "../types/common";

const getUserPosition = async (): Promise<AxiosResponse> => {
  const response = await axiosInstance.get("/studio");

  return response;
};

const saveUserPosition = async (
  userId: string,
  userData: UserData,
): Promise<AxiosResponse> => {
  const response = await axiosInstance.post(`/studio/${userId}`, userData);

  return response;
};

const deleteUserPosition = async (
  positionId: string,
): Promise<AxiosResponse> => {
  const response = await axiosInstance.delete(`/studio/${positionId}`);

  return response;
};

export { getUserPosition, saveUserPosition, deleteUserPosition };
