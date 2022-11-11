import { useEffect, useState, useCallback, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const useFetch = (url) => {
  const { resetState } = useContext(AuthContext);
  const [fetchedData, setFetchedData] = useState({
    data: [],
    isLoading: true,
    error: false,
  });

  const cancelTokenSource = axios.CancelToken.source();

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(url, {
        cancelToken: cancelTokenSource.token,
      });
      const data = await response.data;
      if (data) {
        setFetchedData({
          data,
          isLoading: false,
          error: false,
        });
      }
    } catch (error) {
      if (axios.isCancel(error)) console.log("Data fetching was cancelled");
      console.log("an error occured", error);
      resetState(fetchedData);
    }
  }, [url]);

  useEffect(() => {
    fetchData();

    return () => {
      cancelTokenSource.cancel();
    };
  }, [url, fetchData]);

  const { data, isLoading, error } = fetchedData;

  return { data, isLoading, error };
};

export default useFetch;
