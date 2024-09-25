import axiosInstance from "./instance";
import auth from "../../firebase";

const loginUser = async (idToken) => {
  const response = await axiosInstance.post("/auth/login", { idToken });

  return response;
};

const logoutUser = async () => {
  const response = await axiosInstance.post("/auth/logout");

  return response;
};

const verifyUserAuth = async () => {
  const idToken = await auth.currentUser.getIdToken();

  if (!idToken) {
    throw new Error("User is not authenticated");
  }

  const response = await axiosInstance.get("/auth/verify-token", {
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  });

  return response;
};

export { loginUser, logoutUser, verifyUserAuth };
