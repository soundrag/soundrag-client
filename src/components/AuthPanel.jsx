import Modal from "./common/Modal";

import googleLogo from "../assets/images/google-logo.svg";

import useUserAuth from "../hooks/useUserAuth";

import useAuthStore from "../stores/useAuthStore";
import useModalStore from "../stores/useModalStore";

import {
  AuthPanelContainer,
  AuthContainer,
  AuthButton,
  GoogleImage,
} from "../style/AuthPanelStyle";

const AuthPanel = () => {
  const { handleLogin, handleLogout, isLoggedIn } = useUserAuth();

  const { errorMessage } = useAuthStore();
  const { modals, closeModal } = useModalStore();

  if (isLoggedIn === undefined) {
    return null;
  }

  return (
    <AuthPanelContainer>
      <AuthContainer>
        {isLoggedIn ? (
          <AuthButton onClick={handleLogout}>Log out</AuthButton>
        ) : (
          <AuthButton onClick={handleLogin}>
            <GoogleImage src={googleLogo} alt="google logo" />
            Log In
          </AuthButton>
        )}
      </AuthContainer>

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
