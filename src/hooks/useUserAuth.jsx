import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import auth from "../../firebase";

import { loginUser, logoutUser } from "../services/authService";
import { getUserPosition } from "../services/userService";

import useAuthStore from "../stores/useAuthStore";
import useModalStore from "../stores/useModalStore";

const useUserAuth = () => {
  const navigate = useNavigate();

  const {
    setUserId,
    setUserData,
    resetUserData,
    isLoggedIn,
    setIsLoggedIn,
    setErrorMessage,
  } = useAuthStore();
  const { openModal } = useModalStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserId(user.uid);
      } else {
        setIsLoggedIn(false);
        resetUserData();
      }
    });
    return () => unsubscribe();
  }, [setIsLoggedIn, setUserId, resetUserData]);

  const handleError = (error) => {
    setErrorMessage(error.response);
    openModal("errorModal");
    setIsLoggedIn(false);
  };

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();

      await loginUser(idToken);

      setIsLoggedIn(true);
      navigate("/studio");
    } catch (error) {
      handleError(error);
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();

      setIsLoggedIn(false);
      resetUserData();
    } catch (error) {
      handleError(error);
    }
  };

  const handleGallery = async () => {
    const response = await getUserPosition();

    setUserData(response.data.user);

    navigate("/user");
  };

  return {
    isLoggedIn,
    handleLogin,
    handleLogout,
    handleGallery,
  };
};

export default useUserAuth;
