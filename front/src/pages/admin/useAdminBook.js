import { useQuery } from "react-query";
import { adminGetBookApi, allBookApi } from "../../apis/bookApi";

const useAdminBook = (id) => {
    const queryFn = () => allBookApi();
    const { isLoading, isError, data } = useQuery("adminBookInfo", queryFn);

    return {
        isLoading,
        isError,
        data: data?.data?.data,
    };
};

export default useAdminBook;
