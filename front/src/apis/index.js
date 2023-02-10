import axios from "axios";

axios.defaults.withCredentials = true; // withCredentials 전역 설정

const axiosInstance = axios.create({
  baseURL: "http://localhost:3001",
});


export default axiosInstance;
