import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../utils/axios";
import { logoutUserAsync } from "./logoutUser";


export const getCodeblocksAsync = createAsyncThunk(
    'app/getCodeblocks',
    async () => {
      try {
        const { data } = await axiosInstance.get('codeblocks');
        return data;
      } catch (error) {
        logoutUserAsync();
      }
    }
  );