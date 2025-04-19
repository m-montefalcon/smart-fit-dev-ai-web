import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axiosInstance from "../config/axiosInstance";
import { setAuthenticated, setUnauthenticated } from "../redux/auth/authSlice";


export const useAuthCheck = () => {
    const dispatch = useDispatch();
  
    useEffect(() => {
      const checkAuth = async () => {
        try {
          await axiosInstance.get('/auth/me');
          dispatch(setAuthenticated());
        } catch {
          dispatch(setUnauthenticated());
        }
      };
  
      checkAuth();
    }, [dispatch]);
  };