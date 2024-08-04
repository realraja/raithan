"use client"
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { SyncLoader } from 'react-spinners';
import toast from 'react-hot-toast';
import { checkAdmin } from '@/redux/actions/adminActions';
const LoginPage = () => {

  const router = useRouter();
  const {isAdmin} = useSelector(state => state.admin);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [buttonLoading, setButtonLoading] = useState(false);

  const dispatch = useDispatch();

  const AdminLoginHandler = async(e) =>{
    e.preventDefault();
    try {
      setButtonLoading(true);
      const {data} = await axios.post('/api/admin/login',{
        username,password
      })
      setButtonLoading(false);
      // console.log(data);
      await dispatch(checkAdmin());
      toast.success(data.message);
    } catch (error) {
      setButtonLoading(false);
      // console.log(error.response.data.message);
      toast.error(error.response.data.message);
    }
  }

  useEffect(() => {
  if(isAdmin) return router.push('/raithan-add');
  }, [router,isAdmin]);
  return (
    <div className="flex items-center justify-center min-h-screen relative">
     

      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 text-white p-8 rounded-lg shadow-lg relative z-10"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
        <form onSubmit={AdminLoginHandler}>
          <div className="mb-4">
            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="Enter your username"
              className="w-full px-3 py-2 bg-gray-900 border rounded-lg focus:outline-none"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Enter your password"
              className="w-full px-3 py-2 bg-gray-900 border rounded-lg focus:outline-none"
              required
              autoComplete={username}
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none"
          >
           {buttonLoading? <SyncLoader />: 'Login'}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default LoginPage;
