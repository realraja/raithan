import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";




// export const checkUser = createAsyncThunk('checkUser',async(args,{rejectWithValue})=>{
//     // console.log('post data===>')
//     try {
//       const {data} = await axios.get(`/api/user/user-data-get`);
//       // console.log(data);
//           return data.data;
//     } catch (error) {
//         // console.log(error);
//       return error.response.data.message ?rejectWithValue(error.response.data.message):rejectWithValue(error.message);
//     }
// })



export const checkUser = createAsyncThunk('checkUser',async(args,{rejectWithValue})=>{
  // console.log('post data===>')
  try {
    const {data} = await axios.get(`/api/user/check-user`);
    // console.log(data);
        return data.data;
  } catch (error) {
      // console.log(error);
    return error.response.data.message ?rejectWithValue(error.response.data.message):rejectWithValue(error.message);
  }
})
