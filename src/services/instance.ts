import axios from "axios";
import auth from "../../firebase";

import type {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import type { ExtendedAxiosRequestConfig } from "../types/services";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL as string,
});

axiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const user = auth.currentUser;

    if (user) {
      const idToken = await user.getIdToken();

      config.headers.Authorization = `Bearer ${idToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError): Promise<never> => {
    const originalRequest = error.config as ExtendedAxiosRequestConfig;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      const user = auth.currentUser;

      if (!user) {
        console.error("인증되지 않은 사용자입니다.");

        return Promise.reject(error);
      }

      try {
        await user.getIdToken(true);

        const newIdToken = await user.getIdToken();

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newIdToken}`;
        }

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);

        await auth.signOut();

        return Promise.reject(refreshError);
      }
    } else if (!error.response) {
      console.error("No response from server");
    } else {
      console.error("An error occurred:", error.response.status);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
