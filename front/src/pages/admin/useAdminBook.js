import { useQuery } from "react-query";
import { adminGetBookApi } from "../../apis/bookApi";

const useAdminBook = (id) => {
    const queryFn = () => adminGetBookApi();
    const { isLoading, isError, data } = useQuery("adminBookInfo", queryFn);

    return {
        isLoading,
        isError,
        data: data?.data?.data,
    };
};

export default useAdminBook;
