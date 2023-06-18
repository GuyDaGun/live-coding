import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../utils/axios';
import { logoutUserAsync } from './logoutUser';
import { useAppDispatch } from '../hooks';


export const getCurrentUserAsync = createAsyncThunk(
  'app/getCurrentUser',
  async () => {
    try {
      const { data } = await axiosInstance.get('auth/getCurrentUser');
      const { user } = data;
      
      if (user) {
        return {user};
      }
    } catch (error: any) {
      if (error.response.status === 401) {
        return null;
      }
    }
  }
);
