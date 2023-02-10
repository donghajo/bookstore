import { useCookies } from "react-cookie";
import axiosInstance from "./index";


export const signUpApi = (data) => {
    console.log(data)
    return axiosInstance.post("/user/signup", data);
};

export const logInApi = (data) => {
    console.log(data)
    return axiosInstance.post("/user/login", data);
};

export const userInfoApi = (token) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    config.headers["authorization"] = token;
    return axiosInstance.get("/user/mypage", config)
}
