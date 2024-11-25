import { toast } from "react-toastify";

import Modal from "../components/common/Modal";
import NavHeader from "../components/common/NavHeader";
import Button from "../components/common/Button";
import MessageBox from "../components/common/MessageBox";
import Gallery from "../components/Gallery";
import Studio from "../components/Studio";
import ModeSwitch from "../components/Switch";
import UserInputs from "../components/UserInputs";

import useAutoSavedPosition from "../hooks/useAutoSavedPosition";

import { saveUserPosition } from "../services/userService";

import useAuthStore from "../stores/useAuthStore";
import useDataStore from "../stores/useDataStore";
import useGalleryStore from "../stores/useGalleryStore";
import useModalStore from "../stores/useModalStore";
import useModelStore from "../stores/useModelStore";
import useInputStore from "../stores/useInputStore";

import {
	GalleryContainer,
	KeyboardTutorialContainer,
	StudioPageContainer,
	StudioContainer,
	GalleryButtonContainer,
	MyGalleryContainer,
	SwitchButtonContainer,
	TutorialContainer,
	VersionContainer,
} from "../style/StudioPageStyle";

const StudioPage = () => {
	const { isLoggedIn } = useAuthStore();
	const { userId, userData, setUserData, currentIndex } = useDataStore();
	const { isGallery, toggleGallery, closeGallery } = useGalleryStore();
	const { modals, openModal, closeModal } = useModalStore();
	const { rotations, positions, positionId } = useModelStore();
	const { name, setName } = useInputStore();

	const lastIndex = userData.length - 1;
	const isLastIndex = currentIndex === lastIndex;

	const handleSaveButton = async () => {
		if (!userId) {
			toast.error("로그인이 필요합니다.");

			return;
		}

		const isDuplicate = userData.some(
			(item) =>
				item.firstSpeakerPosition === positions.firstSpeaker &&
				item.secondSpeakerPosition === positions.secondSpeaker &&
				item.listenerPosition === positions.listener &&
				item.firstSpeakerRotation === rotations.firstSpeaker &&
				item.secondSpeakerRotation === rotations.secondSpeaker &&
				item.listenerRotation === rotations.listener,
		);

		const nameExists = userData.some((item) => item.name !== "");

		if (isDuplicate && nameExists) {
			toast.error("이미 존재하는 위치입니다.");

			setName("");

			return;
		}

		const userDataToSave = {
			userId,
			positionId,
			name,
			firstSpeakerPosition: positions.firstSpeaker,
			secondSpeakerPosition: positions.secondSpeaker,
			listenerPosition: positions.listener,
			firstSpeakerRotation: rotations.firstSpeaker,
			secondSpeakerRotation: rotations.secondSpeaker,
			listenerRotation: rotations.listener,
		};

		try {
			await saveUserPosition(userId, userDataToSave);

			const newUserData = [...userData, userDataToSave];

			setUserData(newUserData);
			setName("");

			closeModal("saveModal");

			toast.success("Complete! (Save)");
		} catch (error) {
			toast.error(`Error saving data: + ${error.message}`);
		}
	};

	const handleCancelButton = () => {
		setName("");

		closeModal("saveModal");
	};

	const handleGalleryButton = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.stopPropagation();

		toggleGallery();
	};

	const handleCloseGalleryButton = () => {
		closeGallery();
	};

	useAutoSavedPosition();

	return (
		<StudioPageContainer>
			<NavHeader />
			<StudioContainer onClick={handleCloseGalleryButton}>
				<Studio />
				<GalleryContainer>
					<GalleryButtonContainer>
						<VersionContainer>
							버전: {isLastIndex ? "최신" : currentIndex + 1}
						</VersionContainer>
						<Button
							text={isGallery ? "뒤로" : "프리셋 보기"}
							size="large"
							isDisabled={!isLoggedIn}
							handleClick={handleGalleryButton}
						/>
						<Button
							text="프리셋 저장"
							size="large"
							isDisabled={!isLoggedIn}
							handleClick={() => openModal("saveModal")}
						/>
					</GalleryButtonContainer>
					{isGallery && (
						<MyGalleryContainer
							onClick={(event: React.MouseEvent<HTMLDivElement>) =>
								event.stopPropagation()
							}
						>
							<Gallery data={userData} />
						</MyGalleryContainer>
					)}
				</GalleryContainer>
			</StudioContainer>
			<KeyboardTutorialContainer>
				<MessageBox about="keyboard" />
			</KeyboardTutorialContainer>
			<SwitchButtonContainer>
				<ModeSwitch />
			</SwitchButtonContainer>
			<TutorialContainer>
				<MessageBox about="mode" />
			</TutorialContainer>
			{modals.saveModal && (
				<Modal
					modalId="saveModal"
					modalTitle="저장"
					content={<UserInputs />}
					firstButtonText="취소"
					secondButtonText="저장"
					handleFirstButton={handleCancelButton}
					handleSecondButton={handleSaveButton}
				/>
			)}
		</StudioPageContainer>
	);
};

export default StudioPage;
