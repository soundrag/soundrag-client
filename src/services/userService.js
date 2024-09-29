import axiosInstance from "./instance";

const getUserPosition = async () => {
  const response = await axiosInstance.get("/studio");

  return response;
};

const saveUserPosition = async (userId, userData) => {
  const response = await axiosInstance.post(`/studio/${userId}`, userData);

  return response;
};

const deleteUserPosition = async (positionId) => {
  const response = await axiosInstance.delete(`/studio/${positionId}`);

  return response;
};

export { getUserPosition, saveUserPosition, deleteUserPosition };
