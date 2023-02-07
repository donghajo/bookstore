import { useQuery } from "react-query";
import { adminDeleteBookApi } from "../../apis/bookApi";

const useDeleteBook = (id) => {
    const queryFn = () => adminDeleteBookApi(id);
    const { isLoading, isError, data } = useQuery("adminBookDelete", queryFn);

    return {
        isLoading,
        isError,
        data: data?.data?.data,
    };
};

export default useDeleteBook;
