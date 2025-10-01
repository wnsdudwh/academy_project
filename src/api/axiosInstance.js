import axios from "axios";

// localStorage에서 토큰을 가져오는 함수
const getAuthToken = () => 
{
  return localStorage.getItem("token");
};

// Axios 인스턴스 생성
const axiosInstance = axios.create({
  // baseURL: process.env.REACT_APP_BACKEND_URL, // 백엔드 서버 주소 (환경변수)
  baseURL: "/",
});

// 요청 인터셉터 추가
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;