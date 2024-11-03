import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";

import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import auth from "../../firebase";

import { loginUser, logoutUser } from "../services/authService";
import { getUserPosition } from "../services/userService";

import useAuthStore from "../stores/useAuthStore";
import useDataStore from "../stores/useDataStore";

const useUserAuth = () => {
  const { isLoggedIn, setIsLoggedIn } = useAuthStore();
  const { setUserId, setUserData, resetUserData } = useDataStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const response = await getUserPosition();

        setUserId(user.uid);
        setIsLoggedIn(true);

        setUserData(response.data.user);

        localStorage.removeItem("savedUserData");
      } else {
        setIsLoggedIn(false);
        setUserId(uuidv4());

        const savedData = localStorage.getItem("savedUserData");
        if (savedData) {
          const parsedData = JSON.parse(savedData);

          setUserData([...parsedData]);
        } else {
          resetUserData();
        }
      }
    });

    return () => unsubscribe();
  }, [setIsLoggedIn, setUserId, resetUserData, setUserData]);

  const handleError = (error) => {
    toast.error(error.message || "알 수 없는 에러가 발생했습니다.");

    setIsLoggedIn(false);
  };

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();

      await loginUser(idToken);

      const response = await getUserPosition();

      setUserData(response.data.user);
      setUserId(result.user.uid);

      setIsLoggedIn(true);

      localStorage.removeItem("savedUserData");
    } catch (error) {
      handleError(error);
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      await auth.signOut();

      setIsLoggedIn(false);
      setUserId(null);

      resetUserData();
    } catch (error) {
      handleError(error);
    }
  };

  return {
    isLoggedIn,
    handleLogin,
    handleLogout,
  };
};

export default useUserAuth;
