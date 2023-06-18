import axios from "axios";
import { logoutUserAsync } from "../app/reducers";
import { useAppDispatch } from "../app/hooks";


export const axiosInstance = axios.create({
    baseURL: '/api/',
    withCredentials: true,
});

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      const dispatch = useAppDispatch();
      if (error.response.status === 401) {
        dispatch(logoutUserAsync());
      }
      return Promise.reject(error);
    }
);
