import Modal from "./common/Modal";

import googleLogo from "../assets/images/google-logo.svg";

import useUserAuth from "../hooks/useUserAuth";

import useModalStore from "../stores/useModalStore";

import {
	AuthPanelContainer,
	AuthContainer,
	AuthButton,
	GoogleImage,
} from "../style/AuthPanelStyle";

const AuthPanel = () => {
	const { handleLogin, handleLogout, isLoggedIn } = useUserAuth();
	const { modals, closeModal } = useModalStore();

	if (isLoggedIn === undefined) {
		return null;
	}

	return (
		<AuthPanelContainer>
			<AuthContainer>
				{isLoggedIn ? (
					<AuthButton onClick={handleLogout}>로그아웃</AuthButton>
				) : (
					<AuthButton onClick={handleLogin}>
						<GoogleImage src={googleLogo} alt="google logo" />
						로그인
					</AuthButton>
				)}
			</AuthContainer>

			{modals.errorModal && (
				<Modal
					modalId="errorModal"
					firstButtonText="Back"
					handleFirstButton={() => closeModal("errorModal")}
				/>
			)}
		</AuthPanelContainer>
	);
};

export default AuthPanel;
