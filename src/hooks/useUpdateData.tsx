import { useEffect } from "react";
import { toast } from "react-toastify";
import { onAuthStateChanged, User } from "firebase/auth";
import auth from "../../firebase";

import { getUserPosition, saveUserPosition } from "../services/userService";

import useAuthStore from "../stores/useAuthStore";
import useDataStore from "../stores/useDataStore";

import { isSameData } from "../utils/validators";

import { UserData } from "../types/common";

const useUpdateData = (): null => {
  const { setIsLoggedIn } = useAuthStore();
  const { setUserId, setUserData, setCurrentIndex } = useDataStore();

  const getLocalData = () => {
    const savedData = localStorage.getItem("savedUserData");
    return savedData ? JSON.parse(savedData) : [];
  };

  const updateLocalData = () => {
    const savedLocalData = getLocalData();

    if (savedLocalData.length > 0) {
      setUserData(savedLocalData);
    } else {
      setUserData([]);
      setCurrentIndex(0);
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
        updateLocalData();
      }
    });

    return () => unsubscribe();
  }, []);

  const updateUserData = async (user: User) => {
    try {
      const response = await getUserPosition();
      const savedUserData = response.user;

      const savedLocalData = getLocalData();

      const previousData = [...savedUserData];

      const uniqueData = filterUniqueData(savedUserData, savedLocalData).map(
        (data) => ({
          ...data,
          userId: user.uid,
        }),
      );
      const mergedData = [...savedUserData, ...uniqueData];

      setUserData(mergedData);

      try {
        await Promise.all(
          uniqueData.map((data) => saveUserPosition(user.uid, data)),
        );

        if (uniqueData.length > 0) {
          toast.success("동기화에 성공하였습니다.");
        }

        localStorage.removeItem("savedUserData");
      } catch (updateError) {
        setUserData(previousData);

        toast.error("동기화에 실패하였습니다.");
        console.error("동기화에 실패하였습니다: ", updateError);
      }
    } catch (fetchError) {
      setIsLoggedIn(false);

      toast.error("로그인을 다시 시도해주세요.");
      console.error("데이터를 가져오는데 실패하였습니다:", fetchError);
    }
  };

  return null;
};

export default useUpdateData;
