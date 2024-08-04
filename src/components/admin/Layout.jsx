"use client"
import React, { useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { GridLoader } from 'react-spinners';
import Navbar from './Navbar';
import { loginAction } from '@/redux/slices/adminSlice';
import toast from 'react-hot-toast';
import { CheckAdmin } from '@/utils/AdminActions';
import { checkAdmin } from '@/redux/actions/adminActions';

const Layout = ({ children }) => {

  const router = useRouter();

  const dispatch = useDispatch();
  const {loading} = useSelector(state => state.admin);

  useEffect(() => {

    const CheckIsAdmin = async()=>{
      const data = await CheckAdmin();
      // console.log("data",data);
      if(data.success){
        dispatch(loginAction());
        await dispatch(checkAdmin());
        toast.success(data.message);
      }else{
        toast.error(data.message);
       router.push('/raithan-add/login'); 
      }
    }

    CheckIsAdmin();
   
  }, [router,dispatch])

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col max-h-screen">
        <Header />
        <Navbar />
        {<main className=" max-sm:my-4 sm:my-0 sm:p-0 md:p-4 lg:p-0 flex-1 h-full overflow-auto scrollEditclass">{loading?<div  className='h-full flex justify-center items-center'><GridLoader
  color="#a13bda"
  loading
  margin={30}
  size={50}
  speedMultiplier={3}
/> </div>:children}</main>}
      </div>
    </div>
  );
};

export default Layout;
