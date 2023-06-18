import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../utils/axios";
import { logoutUserAsync } from "./logoutUser";


export const getAllStudentsAsync = createAsyncThunk(
    'app/getAllStudents',
    async () => {
      try {
        const { data } = await axiosInstance.get('auth/getAllStudents');
        return data;
      } catch (error) {
        logoutUserAsync();
      }
    }
  );