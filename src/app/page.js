"use client";
import SelectCourse from '@/components/user/SelectCourse';
import { getUserQuiz } from '@/redux/slices/userSlice';
import { GetQuizesData } from '@/utils/UserActions';
import axios from 'axios';
import moment from 'moment';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

export default function Home() {
  const dispatch = useDispatch();
  const {quizes,user} = useSelector(state => state.user);
  const [selectedCourse, setSelectedCourse ] = useState({})
  // console.log(user);

  // const getQuizes = async()=>{
  //   try {
  //     const {data} = await axios.post('/api/user/get-quiz-data',{courseId:selectedCourse._id});
  //     await dispatch(getUserQuiz(data));
  //     // console.log(data);

  //   } catch (error) {
  //     console.log(error);
  //     error.response ?toast.error(error.response.data.message):toast.error(error.message);
  //   }
  // }
  
  
  useEffect(()=>{
    const GetSetQuiz = async()=>{
      const data = await GetQuizesData({courseId:selectedCourse._id || user?.courses[0]._id});
      // console.log(data);
      if(data.success){
        dispatch(getUserQuiz(data.data));
        // toast.success(data.message);
      }else{
        toast.error(data.message);
      }
    }
    GetSetQuiz();
  },[selectedCourse,setSelectedCourse,user,dispatch])
  return (<div className='App'>
    <div className='items-center mx-20'>
{ user?.courses && <SelectCourse data={user.courses} setSelectedData={setSelectedCourse} />}
  {/* {courses && courses[0].subjects.length>0 && <SelectCourse data={courses[0].subjects} setSelectedData={(data)=>{console.log(data)}}  />} */}

    </div>
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Quizzes</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {quizes && [...quizes].reverse().map((i) => (
          <QuizCard key={i._id} quiz={i} user={user} />
        ))}
      </div>
    </div>
    </div>
  );
}


const QuizCard = ({ quiz,user }) => {
  return (
    <Link href={`/start-quiz/${quiz._id}`}>
    <div className="border p-4 rounded-lg shadow-md bg-gray-800/75">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold text-white">{quiz.name}</h3>
        <p className="text-gray-300 hover:text-gray-500">
          {moment(quiz.createdAt).fromNow()}
        </p>
      </div>
      <p className="text-sm text-gray-400">{quiz?.questions.length} question(s)</p>
      <div className="flex justify-between items-center mt-4">
        <span className="text-sm text-gray-300">Students Done: {quiz.usersDone.length}</span>
        <button className="bg-green-500 text-white rounded-full p-2 hover:bg-green-600">
          {quiz.usersDone.find(i => i.id === user._id)?<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
  <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
  <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z" clipRule="evenodd" />
</svg>:<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
  <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
</svg>

}
        </button>
      </div>
    </div>
    </Link>
  );
};

