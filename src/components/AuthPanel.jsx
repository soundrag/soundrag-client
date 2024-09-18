import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import auth from "../../firebase";

import Modal from "./common/Modal";

import googleLogo from "../assets/images/google-logo.svg";

import { loginUser, logoutUser, verifyUserAuth } from "../services/authService";

import useAuthStore from "../stores/useAuthStore";
import useModalStore from "../stores/useModalStore";

import {
  AuthContainer,
  GalleryButton,
  LogoutButton,
  UnAuthContainer,
  GoogleImage,
} from "../style/AuthPanelStyle";

const AuthPanel = () => {
  const navigate = useNavigate();
  const { isLoggedIn, errorMessage, setIsLoggedIn, setErrorMessage } =
    useAuthStore();
  const { modals, openModal, closeModal } = useModalStore();

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await verifyUserAuth();
        const userAccount = response.data.user;

        if (userAccount) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        handleError(error);
      }
    };

    checkAuthStatus();
  }, [setIsLoggedIn]);

  const handleError = (error) => {
    setErrorMessage(error.response.data.message);
    openModal("errorModal");
    setIsLoggedIn(false);
  };

  const handleGoogleLogin = async () => {
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
    } catch (error) {
      handleError(error);
    }
  };

  if (isLoggedIn === undefined) {
    return null;
  }

  return (
    <>
      {isLoggedIn ? (
        <AuthContainer>
          <Link to="/user">
            <GalleryButton>My Gallery</GalleryButton>
          </Link>
          <LogoutButton onClick={handleLogout}>Log out</LogoutButton>
        </AuthContainer>
      ) : (
        <UnAuthContainer onClick={handleGoogleLogin}>
          <GoogleImage src={googleLogo} alt="google logo" />
          Log in
        </UnAuthContainer>
      )}
      {modals.errorModal && (
        <Modal
          modalId="errorModal"
          content={errorMessage}
          firstButtonText="Back"
          handleFirstButton={() => closeModal("errorModal")}
        />
      )}
    </>
  );
};

export default AuthPanel;
