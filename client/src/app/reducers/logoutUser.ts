import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../utils/axios";


export const logoutUserAsync = createAsyncThunk('app/logoutUser', async () => {
    await axiosInstance.get('auth/logout');
});