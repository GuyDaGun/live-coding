import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../utils/axios";



export const setParamsAsync = createAsyncThunk(
    'app/setParams',
    async (
      { studentId, codeblockId }: { studentId: string; codeblockId: string },
    ) => {
      try {

        await axiosInstance.post('codeblocks/validate', { codeblockId });
        await axiosInstance.post('auth/validate', { studentId });
        
        const params = {
          studentId,
          codeblockId
        }

        return {params, msg: 'Valid details, please login to continue'};
      } catch (error) {
        throw new Error('No valid params');
      }
    }
  ); 