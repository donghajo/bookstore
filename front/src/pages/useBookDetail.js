import { useQuery } from "react-query";
import { detailApi } from "../apis/bookApi";

const useBookDetail = (id) => {
  const queryFn = () => detailApi(id);
  const { isLoading, isError, data } = useQuery(["bookDetail", id], queryFn);

  return {
    isLoading,
    isError,
    data: data?.data,
  };
};

export default useBookDetail;
