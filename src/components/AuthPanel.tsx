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
  const { handleLogin, handleLogout } = useUserAuth();

  const { isLoggedIn } = useAuthStore();
  const { modals, closeModal } = useModalStore();

  if (isLoggedIn === undefined) {
    return null;
  }

  return (
    <AuthPanelContainer data-testid="auth-panel">
      <AuthContainer>
        {isLoggedIn ? (
          <AuthButton onClick={handleLogout} data-testid="logout-button">
            로그아웃
          </AuthButton>
        ) : (
          <AuthButton onClick={handleLogin} data-testid="login-button">
            <GoogleImage src={googleLogo} alt="google logo" />
            로그인
          </AuthButton>
        )}
      </AuthContainer>

      {modals.errorModal && (
        <Modal
          modalName="errorModal"
          firstButtonText="Back"
          handleFirstButton={() => closeModal("errorModal")}
          $modalTestId="error-modal"
          $firstButtonTestId="cancel-button"
        />
      )}
    </AuthPanelContainer>
  );
};

export default AuthPanel;
