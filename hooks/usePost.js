import { useState, useEffect, useContext, useCallback } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const usePost = (url, body) => {
  const { resetState } = useContext(AuthContext);
  const [postedData, setPostedData] = useState({
    data: [],
    isLoading: true,
    error: false,
  });

  const cancelTokenSource = axios.CancelToken.source();

  const postData = useCallback(async () => {
    try {
      const response = await axios.post(url, body, {
        cancelToken: cancelTokenSource.token,
      });
      const data = await response.data;
      if (data) {
        setPostedData({
          data,
          isLoading: false,
          error: false,
        });
      }
    } catch (error) {
      if (axios.isCancel(error)) console.log("Data fetching was cancelled");
      console.log("an error occured", error);
      resetState(postedData);
    }
  }, [url, body]);

  useEffect(() => {
    postData();

    return () => {
      cancelTokenSource.cancel();
    };
  }, [url, body, postData]);

  const { data, isLoading, error } = postedData;

  return { data, isLoading, error };
};
export default usePost;
