import { useEffect } from "react";
import { toast } from "react-toastify";
import { onAuthStateChanged } from "firebase/auth";

import auth from "../../firebase";

import { getUserPosition, saveUserPosition } from "../services/userService";

import useAuthStore from "../stores/useAuthStore";
import useDataStore from "../stores/useDataStore";
import useVersionStore from "../stores/useVersionStore";

import { isSameData } from "../utils/validators";

import type { User } from "firebase/auth";
import type { UserData } from "../types/common";

const useUpdateData = (): null => {
	const { setIsLoggedIn, setIsAuthChecked } = useAuthStore();
	const { setUserId, setUserData } = useDataStore();
	const { setUserVersion, setVersionIndex } = useVersionStore();

	const getLocalData = () => {
		const savedData = localStorage.getItem("localData");
		return savedData ? JSON.parse(savedData) : [];
	};

	const updateLocalData = () => {
		const localVersion = getLocalData();

		if (localVersion.length > 0) {
			setUserVersion(localVersion);
		} else {
			setUserVersion([]);
			setVersionIndex(0);
		}
	};

	const filterUniqueData = (userData: UserData[], localData: UserData[]) => {
		return localData.filter(
			(local) => !userData.some((user) => isSameData(user, local)),
		);
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				setIsLoggedIn(true);
				setUserId(user.uid);
				updateUserData(user);
			} else {
				setIsLoggedIn(false);
				updateLocalData();
			}
			setIsAuthChecked(true);
		});

		return () => unsubscribe();
	}, []);

	const updateUserData = async (user: User) => {
		try {
			const response = await getUserPosition();
			const savedUserData = response.user.filter((item) => item.name);
			const savedUserVersion = response.user.filter((item) => !item.name);

			const localVersion = getLocalData();

			const previousVersion = [...savedUserVersion];

			const uniqueVersion = filterUniqueData(
				savedUserVersion,
				localVersion,
			).map((data) => ({
				...data,
				userId: user.uid,
			}));
			const mergedVersion = [...savedUserVersion, ...uniqueVersion];
			setUserVersion(mergedVersion);
			setUserData(savedUserData);

			try {
				await Promise.all(
					uniqueVersion.map((data) => saveUserPosition(user.uid, data)),
				);

				if (uniqueVersion.length > 0) {
					toast.success("동기화에 성공하였습니다.");
				}

				localStorage.removeItem("localData");
			} catch (updateError) {
				setUserVersion(previousVersion);

				toast.error("동기화에 실패하였습니다.");
				console.error("동기화에 실패하였습니다: ", updateError);
			}
		} catch (fetchError) {
			setIsLoggedIn(false);

			if (auth.currentUser) {
				toast.error("로그인을 다시 시도해주세요.");
				console.error("데이터를 가져오는데 실패하였습니다:", fetchError);
			}
		}
	};

	return null;
};

export default useUpdateData;
