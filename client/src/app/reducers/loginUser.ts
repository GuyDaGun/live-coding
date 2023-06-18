import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../utils/axios';

type userLogin = {
  username: string;
  password: string;
};

export const loginUserAsync = createAsyncThunk(
  'app/loginUser',
  async ({
    currentUser,
    alertText,
  }: {
    currentUser: userLogin;
    alertText: string;
  }) => {
    try {
      const { data } = await axiosInstance.post('auth/login', currentUser);
      const { user } = data;
      return {user, alertText};
    } catch (error) {
      throw new Error('User nor Authorized')
    }
  }
);
