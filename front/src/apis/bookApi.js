import axiosInstance from "./index";

export const allBookApi = () => axiosInstance.get("/"); // clear

export const detailApi = (bookId) => axiosInstance.get(`/book/${bookId}`);

export const adminDeleteBookApi = (bookId) => axiosInstance.delete(`/admin/book/${bookId}`);

export const adminUpdateBookApi = (data) => {
    console.log(data.editFormData)
    axiosInstance.put(`/admin/book/${data.pid}`, data.editFormData);
}

export const addBookApi = (data) => {
    console.log(data.accessToken)
    const config = {
        headers: {
            "Content-Type": "multipart/form-data",
        },
        withCredentials: true
    };
    config.headers["authorization"] = data.accessToken;
    return axiosInstance.post("/admin/book", data.formData, config);
};

export const getOrderApi = (token) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    config.headers["authorization"] = token;
    return axiosInstance.get("/cart", config)
}