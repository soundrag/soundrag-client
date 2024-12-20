import { toast } from "react-toastify";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import auth from "../../firebase";

import googleLogo from "../assets/images/google-logo.svg";

import Modal from "./common/Modal";

import useUpdateData from "../hooks/useUpdateData";

import { loginUser, logoutUser } from "../services/authService";

import useAuthStore from "../stores/useAuthStore";
import useModalStore from "../stores/useModalStore";
import useDataStore from "../stores/useDataStore";
import useVersionStore from "../stores/useVersionStore";

import {
  AuthPanelContainer,
  AuthContainer,
  AuthButton,
  GoogleImage,
} from "../style/AuthPanelStyle";

const AuthPanel = () => {
  const { isLoggedIn, setIsLoggedIn } = useAuthStore();
  const { setUserId, setUserData } = useDataStore();
  const { setUserVersion, setVersionIndex } = useVersionStore();
  const { modals, closeModal } = useModalStore();

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();

      await loginUser(idToken);

      setIsLoggedIn(true);
    } catch (loginError) {
      setIsLoggedIn(false);

      toast.error("로그인을 다시 시도해주세요.");
      console.error("로그인 에러가 발생하였습니다:", loginError);
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      await auth.signOut();

      setIsLoggedIn(false);
      setUserId(null);
      setUserData([]);
      setUserVersion([]);
      setVersionIndex(0);
    } catch (logoutError) {
      toast.error("로그아웃을 다시 시도해주세요.");
      console.error("로그아웃 에러가 발생하였습니다:", logoutError);
    }
  };

  useUpdateData();

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
          firstButtonText="뒤로"
          handleFirstButton={() => closeModal("errorModal")}
          $modalTestId="error-modal"
          $firstButtonTestId="cancel-button"
        />
      )}
    </AuthPanelContainer>
  );
};

export default AuthPanel;
