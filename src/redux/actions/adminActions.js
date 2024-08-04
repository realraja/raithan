import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";





// export const adminLogin = createAsyncThunk('register',async(formData,{rejectWithValue})=>{
//   // console.log('post data===>',postData.email)
//   try {
//     const {data} = await axios.post(`${serverUrl}/register`,formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         })
//         console.log(data)
//         return data;
//   } catch (error) {
//     return rejectWithValue(error.response.data.message);
//   }
// })


export const checkAdmin = createAsyncThunk('checkAdmin',async(args,{rejectWithValue})=>{
    // console.log('post data===>')
    try {
      const {data} = await axios.get(`/api/admin/alldataget`);
      // console.log(data);
          return data.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
})


// export const checkAdmin = createAsyncThunk('checkAdmin',async(args,{rejectWithValue})=>{
//   // console.log('post data===>')
//   try {
//     const {data} = await axios.get(`/api/admin`);
//     // console.log(data);
//         return data.data;
//   } catch (error) {
//     return rejectWithValue(error.response.data.message);
//   }
// })
