import axiosInstance from "./index";

export const allBookApi = () => axiosInstance.get("/"); // clear

export const detailApi = (bookId) => axiosInstance.get(`/book/${bookId}`);

export const adminGetBookApi = () => axiosInstance.get("/admin/book");

export const adminDeleteBookApi = (bookId) => axiosInstance.delete(`/admin/book/${bookId}`);

export const adminUpdateBookApi = (data) => {
    axiosInstance.put(`/admin/book/${data.pid}`, data.editFormData);
}

export const addBookApi = (data) => {
    const config = {
        headers: {
            "Content-Type": "multipart/form-data",
        },
        withCredentials: true
    };
    return axiosInstance.post("/admin/book", data, config);
};
