const { createSlice } = require("@reduxjs/toolkit");
const { checkAdmin } = require("../actions/adminActions");



const admin = createSlice({name: "admin",initialState:{isAdmin:false},reducers:{
    loginAction:(state)=>{
        state.loading = false;
        state.isAdmin = true;
    },
    logoutAction:(state)=>{
        state.loading = false;
        state.isAdmin = false;
    },
},extraReducers(builder){
    builder
          .addCase(checkAdmin.pending, (state, action) => {
            // console.log('pending==>',state, action)
            state.loading = true;
          })
          .addCase(checkAdmin.fulfilled, (state, action) => {
            // console.log('success==>',state, action)
            state.loading = false;
            state.isAdmin = true;
            state.message = action.payload.message;
            state.users = action.payload.users;
            state.courses = action.payload.courses;
            state.subjects = action.payload.subjects;
            state.quizes = action.payload.quizes;
            state.questions = action.payload.questions;
          })
          .addCase(checkAdmin.rejected, (state, action) => {
              state.loading = false;
              state.isAdmin = false;
              state.users = null;
            state.courses = null;
            state.subjects =null;
            state.quizes = null;
            state.questions =null;
            state.error = action.payload;
          })
}})


export const {loginAction,logoutAction} =admin.actions;

export default admin.reducer;









// const { createSlice } = require("@reduxjs/toolkit");
// const { checkAdmin } = require("../actions/adminActions");



// const admin = createSlice({name: "admin",initialState:{isAdmin:false},reducers:{
//     loginAction:(state)=>{
//         state.loading = false;
//         state.isAdmin = true;
        
//         state.message = action.payload.message;
//         state.users = action.payload.users;
//         state.courses = action.payload.courses;
//         state.subjects = action.payload.subjects;
//         state.quizes = action.payload.quizes;
//         state.questions = action.payload.questions;
//     },
//     logoutAction:(state)=>{
//         state.loading = false;
//         state.isAdmin = false;
//     },
// },extraReducers(builder){
//     builder
//           .addCase(checkAdmin.pending, (state, action) => {
//             // console.log('pending==>',state, action)
//             state.loading = true;
//           })
//           .addCase(checkAdmin.fulfilled, (state, action) => {
//             // console.log('success==>',state, action)
//             state.loading = false;
//             state.isAdmin = true;
//           })
//           .addCase(checkAdmin.rejected, (state, action) => {
//               state.loading = false;
//               state.isAdmin = false;
//               state.users = null;
//             state.courses = null;
//             state.subjects =null;
//             state.quizes = null;
//             state.questions =null;
//             state.error = action.payload;
//           })
// }})


// export const {loginAction,logoutAction} =admin.actions;

// export default admin.reducer;