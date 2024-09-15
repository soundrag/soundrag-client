import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          console.error("로그인이 필요합니다.");
          break;
        case 403:
          console.error("접근 권한이 없습니다.");
          break;
        case 404:
          console.error("요청하신 페이지를 찾을 수 없습니다. ");
          break;
        case 500:
          console.error("서버 처리 중 오류가 발생했습니다.");
          break;
        default:
          console.error("네트워크 오류가 발생했습니다.");
      }
    } else {
      console.error("인터넷 연결이 불안정합니다.");
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
