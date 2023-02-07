import axiosInstance from "./index";


export const signUpApi = (data) => {
    return axiosInstance.post("/signup", data);
};

export const logInApi = (data) => {
    return axiosInstance.post("/login", data, { withCredentials: true });
};
