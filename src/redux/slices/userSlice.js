import { checkUser } from "../actions/userActions";

const { createSlice } = require("@reduxjs/toolkit");



const user = createSlice({name: "user",initialState:{isUser:false,loading:true},reducers:{
    getUserQuiz:(state,action)=>{
      // console.log(action.payload.data)
        state.loading = false;
        state.isUser = true;
        state.quizes = action.payload;

    },
    setLoadingFalse:(state,action)=>{
      // console.log(action.payload.data)
        state.loading = false;

    },
    loginAction:(state,action)=>{
      // console.log(action.payload)
        state.loading = false;
        state.isUser = true;
        state.user = action.payload;

    },
    logoutAction:(state)=>{
        state.loading = false;
        state.isUser = false;
        state.user = null;
        state.quizes = null;
    },
},extraReducers(builder){
    builder
    .addCase(checkUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(checkUser.fulfilled, (state, action) => {
        // console.log('success==>',state, action)
        state.loading = false;
        state.isUser = true;
        state.message = action.payload.message;
        state.user = action.payload.user;
      })
      .addCase(checkUser.rejected, (state, action) => {
        // console.log(action)
          state.loading = false;
          state.isUser = false;
          state.user = null;
          state.courses = null;
          state.quizes = null;
          state.error = action.payload;
      })
}})


export const {getUserQuiz,logoutAction,loginAction,setLoadingFalse} =user.actions;

export default user.reducer;