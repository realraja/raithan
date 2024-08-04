"use client"
import { checkUser } from '@/redux/actions/userActions';
import { loginAction } from '@/redux/slices/userSlice';
import { LoginUser } from '@/utils/UserActions';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { SyncLoader } from 'react-spinners';

const LoginPage = () => {
  const router = useRouter();
  const {isUser} = useSelector(state => state.user);
  const dispatch = useDispatch();


  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [buttonLoading, setButtonLoading] = useState(false);

  const LoginHandler = async(e) =>{
    e.preventDefault();

    setButtonLoading(true);
    const data = await LoginUser({phone,password});
    console.log(data);
    if(data.success){
      toast.success(data.message);
      await dispatch(loginAction(data.data.user));
      router.push('/')
    }else{
      toast.error(data.message);
    }    
    setButtonLoading(false);
    
  }

  useEffect(()=>{
    if(isUser) return router.push('/');
  },[router,isUser])


  return (
    <div className={`flex min-h-screen flex-col justify-center items-center px-6 py-12 lg:px-8 `}>
      <div className='w-fit py-5 px-16 bg-gray-600/50 rounded-lg'>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm  ">
        <img
          className="mx-auto h-32 w-auto"
          src="/Logo_Design_Template-removebg-preview.png"
          alt="Your Company"
        />
        <h2 className="mt-3 text-center text-2xl font-bold leading-9 tracking-tight text-gray-100">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={LoginHandler} method="POST">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium leading-6  text-gray-100">
              Phone number
            </label>
            <div className="mt-2">
              <input
              value={phone}
              onChange={(e)=> setPhone(e.target.value.replace(/[abcdefghijklmnopqrstuvwxyz]/gi, ""))}
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 bg-gray-700 placeholder:text-gray-500 focus:outline-none sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6  text-gray-100">
                Password
              </label>
              <div className="text-sm">
                <Link href="/forget-password" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Forgot password?
                </Link>
              </div>
            </div>
            <div className="mt-2">
              <input
              value={password}
              onChange={(e)=> setPassword(e.target.value)}
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 py-1.5 bg-gray-700 text-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
             {buttonLoading? <SyncLoader />: 'Login'}
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-400">
          Not a User?{' '}
          <Link href="/admin-login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            Admin Login
          </Link>
        </p>
      </div>
      </div>
    </div>
  );
};

export default LoginPage;
