"use client"
import axios from "axios"

export const userTryCatch = (passedFunction) => async(data) => {
    try {
        return await passedFunction(data);
    } catch (error) {
        console.log(error,error.message);
        return {success:false,message:error.response.data.message ?error.response.data.message:error.message};
    }
}

export const CheckUser = userTryCatch(async()=>{
    const {data} = await axios.get(`/api/user/check-user`);
    return data;
})
export const LoginUser = userTryCatch(async(userData)=>{
    const {data} = await axios.post('/api/login',userData);
    return data;
})
export const GetQuizesData = userTryCatch(async(formData)=>{
    const {data} = await axios.post('/api/user/get-quiz-data',formData);
    return data;
})

export const UpdateQuestion = async(Detail)=>{
    try {
        // console.log(Detail)
        const {data} = await axios.put('/api/user/question', Detail);
        console.log(data);
    } catch (error) {
        console.log(error,error.message);
    }
}

export const UpdateQuiz = async(Detail)=>{
    try {
        const {data} = await axios.put('/api/user/quiz', Detail);
        console.log(data);
    } catch (error) {
        console.log(error,error.message);
    }
}