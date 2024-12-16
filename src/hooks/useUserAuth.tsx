import { useEffect } from "react";
import { toast } from "react-toastify";

import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import auth from "../../firebase";

import { loginUser, logoutUser } from "../services/authService";
import { getUserPosition, saveUserPosition } from "../services/userService";

import useAuthStore from "../stores/useAuthStore";
import useDataStore from "../stores/useDataStore";

import { isSameData } from "../utils/validators";

import { UserData } from "../types/common";

const useUserAuth = () => {
  const { setIsLoggedIn } = useAuthStore();
  const { setUserId, setUserData, setCurrentIndex } = useDataStore();

  const getLocalData = () => {
    const savedData = localStorage.getItem("savedUserData");
    return savedData ? JSON.parse(savedData) : [];
  };

  const filterUniqueData = (userData: UserData[], localData: UserData[]) => {
    return localData.filter(
      (local) => !userData.some((user) => isSameData(user, local)),
    );
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        updateUserData(user);
      } else {
        updateLocalData();
      }
    });

    return () => unsubscribe();
  }, []);

  const updateUserData = async (user: any) => {
    try {
      const userId = user.uid;

      const response = await getUserPosition();
      const savedUserData = response.user;

      setUserId(userId);
      setIsLoggedIn(true);

      const savedLocalData = getLocalData();

      const uniqueData = filterUniqueData(savedUserData, savedLocalData).map(
        (data) => ({
          ...data,
          userId,
        }),
      );
      const mergedData = [...savedUserData, ...uniqueData];

      setUserData(mergedData);

      await Promise.all(
        uniqueData.map((data) => saveUserPosition(userId, data)),
      );

      localStorage.removeItem("savedUserData");
    } catch (error) {
      setIsLoggedIn(false);

      console.error(error);
    }
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

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();

      await loginUser(idToken);

      setIsLoggedIn(true);
    } catch (error) {
      toast.error(
        (error && error.message) || "알 수 없는 에러가 발생했습니다.",
      );
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      await auth.signOut();

      setIsLoggedIn(false);
      setUserId(null);
      setUserData([]);
      setCurrentIndex(0);
    } catch (error) {
      toast.error(
        (error && error.message) || "알 수 없는 에러가 발생했습니다.",
      );
    }
  };

  return {
    handleLogin,
    handleLogout,
  };
};

export default useUserAuth;
