import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3001",
});
// axios.defaults.withCredentials = true; // withCredentials 전역 설정

export default axiosInstance;
