import axiosInstance from "./index";


export const signUpApi = (data) => {
    return axiosInstance.post("/user/signup", data);
};

export const logInApi = (data) => {
    return axiosInstance.post("/user/login", data, { withCredentials: true });
};

export const userInfoApi = () => {
    return axiosInstance.get("/user/mypage")
}
