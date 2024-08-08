"use client"
import CropperDialog from '@/components/ImageDialog/CropImage';
import { loginAction } from '@/redux/slices/userSlice';
import { RegisterUser } from '@/utils/UserActions';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import ModalImage from 'react-modal-image';
import { useDispatch, useSelector } from 'react-redux';
import { SyncLoader } from 'react-spinners';

const RegisterPage = () => {
  const router = useRouter();
  const {isUser} = useSelector(state => state.user);
  const dispatch = useDispatch();


  const [avatar, setAvatar] = useState('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVYUbi-Jf5QxIW-koSAO97ZmKrOXadXeJ3xQ&s');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [buttonLoading, setButtonLoading] = useState(false);

  const [isDialogOpen,setIsDialogOpen] = useState(false);

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatar(e.target.result);
        setIsDialogOpen(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const LoginHandler = async(e) =>{
    e.preventDefault();

    setButtonLoading(true);
    const data = await RegisterUser({phone,password,avatar,name});
    if(data.success){
      toast.success(data.message);
      await dispatch(loginAction(data.data.user));
      router.push('/')
    }else{
      toast.error(data.message);
    }    
    setButtonLoading(false);
    
  }


  const handleCrop = (croppedSrc) => {
    const img = new Image();
    img.src = croppedSrc;
  
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
  
      canvas.width = img.width;
      canvas.height = img.height;
  
      // Draw the image onto the canvas
      ctx.drawImage(img, 0, 0);
  
      // Function to convert canvas to a data URL with specified quality
      const getCompressedDataUrl = (quality) => {
        return canvas.toDataURL('image/jpeg', quality);
      };
  
      // Function to get the size of the data URL in bytes
      const getDataUrlSize = (dataUrl) => {
        const head = 'data:image/jpeg;base64,';
        return (dataUrl.length - head.length) * 0.75;
      };
  
      // Desired file size in bytes (e.g., 2MB)
      const desiredSizeInBytes = 5 * 1024 * 1024;
  
      let quality = 1.0;
      let compressedDataUrl = getCompressedDataUrl(quality);
      let dataSize = getDataUrlSize(compressedDataUrl);
      // Reduce quality until the data URL size is within the desired limit
      while (dataSize > desiredSizeInBytes && quality > 0.1) {
        quality -= 0.1;
        compressedDataUrl = getCompressedDataUrl(quality);
        dataSize = getDataUrlSize(compressedDataUrl);
      }
  
      // Update the state with the compressed image
      setAvatar(compressedDataUrl);
      setIsDialogOpen(false);
    };
  };

  useEffect(()=>{
    if(isUser) return router.push('/');
  },[router,isUser])


    return (
    <>
    <div className={`flex h-[calc(95dvh)] flex-col justify-center items-center px-6 py-12 lg:px-8 `}>
      <div className='w-fit py-5 px-16 bg-gray-600/50 rounded-lg'>
        <h2 className="mt-3 text-center text-2xl font-bold leading-9 tracking-tight text-gray-100">
          Create Account
        </h2>
        <div className="flex justify-center mb-4 relative w-40 mt-5 m-auto ">
            {/* <img
              id="profile-pic"
              className="w-24 h-24 rounded-full object-cover"
              src={photo}
              alt="Profile"
            /> */}
            <ModalImage
        small={avatar}
        large={avatar} // Replace with your actual image URL
        alt="Preview Image"
        className="w-40 h-40 rounded-full object-cover"
      />
            <input
              type="file"
              id="photo-upload"
              className="hidden"
              accept="image/*"
              onChange={handlePhotoChange}
            />
            <label
              htmlFor="photo-upload"
              className="absolute bottom-0 right-0 cursor-pointer bg-gray-700 bg-opacity-80 p-2 rounded-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-8"
              >
                <path d="M12 9a3.75 3.75 0 1 0 0 7.5A3.75 3.75 0 0 0 12 9Z" />
                <path
                  fillRule="evenodd"
                  d="M9.344 3.071a49.52 49.52 0 0 1 5.312 0c.967.052 1.83.585 2.332 1.39l.821 1.317c.24.383.645.643 1.11.71.386.054.77.113 1.152.177 1.432.239 2.429 1.493 2.429 2.909V18a3 3 0 0 1-3 3h-15a3 3 0 0 1-3-3V9.574c0-1.416.997-2.67 2.429-2.909.382-.064.766-.123 1.151-.178a1.56 1.56 0 0 0 1.11-.71l.822-1.315a2.942 2.942 0 0 1 2.332-1.39ZM6.75 12.75a5.25 5.25 0 1 1 10.5 0 5.25 5.25 0 0 1-10.5 0Zm12-1.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                  clipRule="evenodd"
                />
              </svg>
            </label>
          </div>

      <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={LoginHandler} method="POST">
          
          <div>
            <label htmlFor="name" className="block text-sm font-medium leading-6  text-gray-100">
              Name
            </label>
            <div className="mt-2">
              <input
              value={name}
              onChange={(e)=> setName(e.target.value)}
                id="name"
                name="name"
                type="text"
                required
                className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 bg-gray-700 placeholder:text-gray-500 focus:outline-none sm:text-sm sm:leading-6"
              />
            </div>
          </div>
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
                className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 bg-gray-700 placeholder:text-gray-500 focus:outline-none sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6  text-gray-100">
                Password
              </label>
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
                className="block w-full px-2 rounded-md border-0 py-1.5 bg-gray-700 text-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
            disabled={avatar === 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVYUbi-Jf5QxIW-koSAO97ZmKrOXadXeJ3xQ&s' || !avatar || !phone || !password}
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-45"
            >
             {buttonLoading? <SyncLoader />: 'Register'}
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-400">
          Already a User?{' '}
          <Link href="/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            Login
          </Link>
        </p>
      </div>
      </div>
      
    </div>
    <CropperDialog
    ratio={1}
        imageSrc={avatar}
        onCrop={handleCrop}
        onClose={()=> setIsDialogOpen(false)}
        isOpen={isDialogOpen}
      />
 </>
  );
};

export default RegisterPage;
