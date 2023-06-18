import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AppTypeInitialState } from '../../utils/types';
import {
  getAllStudentsAsync,
  getCodeblocksAsync,
  getCurrentUserAsync,
  setParamsAsync,
  loginUserAsync,
  logoutUserAsync,
} from '../reducers';

const initialState: AppTypeInitialState = {
  userLoading: true,
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',
  user: null,
  codeblocks: [],
  students: [],
  params: {
    codeblockId: '',
    studentId: '',
  },
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    displayAlert(state, action: PayloadAction<string>) {
      state.showAlert = true;
      state.alertType = 'danger';
      state.alertText = action.payload;
    },
    clearAlert(state) {
      state.showAlert = false;
      state.alertType = '';
      state.alertText = '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUserAsync.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(loginUserAsync.fulfilled, (state, action: any) => {
      state.isLoading = false;
      state.user = action.payload.user;
      state.showAlert = true;
      state.alertType = 'success';
      state.alertText = action.payload.alertText;
    });
    builder.addCase(loginUserAsync.rejected, (state, action: any) => {
      state.isLoading = false;
      state.showAlert = true;
      state.alertType = 'danger';
      state.alertText = action.payload;
    });
    builder.addCase(logoutUserAsync.fulfilled, (state) => {
      state.userLoading = false;
      state.user = null;
    });
    builder.addCase(getCodeblocksAsync.pending, (state) => {
      state.isLoading = true;
      state.showAlert = false;
    });
    builder.addCase(getCodeblocksAsync.fulfilled, (state, action: any) => {
      state.isLoading = false;
      state.codeblocks = action.payload;
      clearAlert();
    });
    builder.addCase(getAllStudentsAsync.pending, (state) => {
      state.isLoading = true;
      state.showAlert = false;
    });
    builder.addCase(getAllStudentsAsync.fulfilled, (state, action: any) => {
      state.isLoading = false;
      state.students = action.payload;
    });
    builder.addCase(getCurrentUserAsync.pending, (state) => {
      state.isLoading = true;
      state.showAlert = false;
    });
    builder.addCase(getCurrentUserAsync.fulfilled, (state, action: any) => {
      state.userLoading = false;
      state.user = action.payload.user;
    });
    builder.addCase(getCurrentUserAsync.rejected, (state, action: any) => {
      state.userLoading = false;
      state.user = null;
    });
    builder.addCase(setParamsAsync.fulfilled, (state, action: any) => {
      state.params = action.payload.params;
      state.userLoading = false;
      state.isLoading = false;
      state.showAlert = true;
      state.alertType = 'success';
      state.alertText = action.payload.msg;
      clearAlert();
    });
    builder.addCase(setParamsAsync.rejected, (state, action: any) => {
      state.isLoading = false;
      state.showAlert = true;
      state.alertType = 'danger';
      state.alertText = action.payload;
      clearAlert();
    });
  },
});

export const {
  displayAlert,
  clearAlert,
} = appSlice.actions;

export default appSlice.reducer;
