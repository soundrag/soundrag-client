import axiosInstance from "./instance";

const loginUser = async (idToken) => {
  const response = await axiosInstance.post("/auth/login", { idToken });

  return response;
};

const logoutUser = async () => {
  const response = await axiosInstance.post("/auth/logout");

  return response;
};

const verifyUserAuth = async () => {
  const response = await axiosInstance.get("/auth/verify-token");

  return response;
};

export { loginUser, logoutUser, verifyUserAuth };
