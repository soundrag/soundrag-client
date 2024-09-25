import { Link } from "react-router-dom";

import Modal from "./common/Modal";

import googleLogo from "../assets/images/google-logo.svg";

import useUserAuth from "../hooks/useUserAuth";

import useAuthStore from "../stores/useAuthStore";
import useModalStore from "../stores/useModalStore";

import {
  AuthPanelContainer,
  AuthContainer,
  GalleryButton,
  LogoutButton,
  UnAuthContainer,
  GoogleImage,
} from "../style/AuthPanelStyle";

const AuthPanel = () => {
  const { handleLogin, handleLogout, isLoggedIn, handleGallery } =
    useUserAuth();

  const { errorMessage } = useAuthStore();
  const { modals, closeModal } = useModalStore();

  if (isLoggedIn === undefined) {
    return null;
  }

  return (
    <AuthPanelContainer>
      {isLoggedIn ? (
        <AuthContainer>
          <Link to="/user">
            <GalleryButton onClick={handleGallery}>My Gallery</GalleryButton>
          </Link>
          <LogoutButton onClick={handleLogout}>Log out</LogoutButton>
        </AuthContainer>
      ) : (
        <UnAuthContainer onClick={handleLogin}>
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
    </AuthPanelContainer>
  );
};

export default AuthPanel;
