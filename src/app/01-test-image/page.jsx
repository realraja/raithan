"use client"
import { useRouter } from 'next/navigation';
import { useState, useRef } from 'react';

export default function Camera() {
  const [imageSrc, setImageSrc] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null); // To store the video stream

  const router = useRouter();

  const startCamera = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    videoRef.current.srcObject = stream;
    streamRef.current = stream; // Store the stream
    videoRef.current.play();
  };

  const captureImage = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/png');
    setImageSrc(dataUrl);
    
    // Stop all video tracks to turn off the camera
    const tracks = streamRef.current.getTracks();
    tracks.forEach(track => track.stop());
  };

  return (
    <div>
      <div className='flex justify-center items-center p-5 m-5 gap-5'>
      <button onClick={()=> router.push('/01-test-image/test2')} className="active:scale-105 h-14 duration-75 inline-flex items-center justify-center p-0.5  overflow-hidden text-sm font-medium rounded-lg group bg-gradient-to-r from-rose-600 to-violet-500 group-hover:from-rose-600 group-hover:to-violet-500 hover:text-white dark:text-white  focus:outline-none ">
            <span className="flex justify-center w-full h-full items-center px-5 py-2 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            
              <p className='text-lg font-normal'>test choose and camara</p>
              
            </span>
          </button>
      <button onClick={()=> router.push('/01-test-image/test3')} className="active:scale-105 h-14 duration-75 inline-flex items-center justify-center p-0.5  overflow-hidden text-sm font-medium rounded-lg group bg-gradient-to-r from-rose-600 to-violet-500 group-hover:from-rose-600 group-hover:to-violet-500 hover:text-white dark:text-white  focus:outline-none ">
            <span className="flex justify-center w-full h-full items-center px-5 py-2 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            
              <p className='text-lg font-normal'>test capture and camara</p>
              
            </span>
          </button>
      <button onClick={()=> router.push('/01-test-image/test4')} className="active:scale-105 h-14 duration-75 inline-flex items-center justify-center p-0.5  overflow-hidden text-sm font-medium rounded-lg group bg-gradient-to-r from-rose-600 to-violet-500 group-hover:from-rose-600 group-hover:to-violet-500 hover:text-white dark:text-white  focus:outline-none ">
            <span className="flex justify-center w-full h-full items-center px-5 py-2 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            
              <p className='text-lg font-normal'>test capture and camara</p>
              
            </span>
          </button>
      <button onClick={()=> router.push('/01-test-image/test5')} className="active:scale-105 h-14 duration-75 inline-flex items-center justify-center p-0.5  overflow-hidden text-sm font-medium rounded-lg group bg-gradient-to-r from-rose-600 to-violet-500 group-hover:from-rose-600 group-hover:to-violet-500 hover:text-white dark:text-white  focus:outline-none ">
            <span className="flex justify-center w-full h-full items-center px-5 py-2 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            
              <p className='text-lg font-normal'>test upload and camara</p>
              
            </span>
          </button>
      <button onClick={()=> router.push('/01-test-image/test6')} className="active:scale-105 h-14 duration-75 inline-flex items-center justify-center p-0.5  overflow-hidden text-sm font-medium rounded-lg group bg-gradient-to-r from-rose-600 to-violet-500 group-hover:from-rose-600 group-hover:to-violet-500 hover:text-white dark:text-white  focus:outline-none ">
            <span className="flex justify-center w-full h-full items-center px-5 py-2 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            
              <p className='text-lg font-normal'>image test</p>
              
            </span>
          </button>
      </div>
      <h1>Camera App</h1>
      <div>
        <video ref={videoRef} style={{ display: imageSrc ? 'none' : 'block' }} width="400" height="300"></video>
        <canvas ref={canvasRef} style={{ display: 'none' }} width="400" height="300"></canvas>
      </div>
      <div>
        <button onClick={startCamera} disabled={imageSrc !== null}>Start Camera</button>
        <button onClick={captureImage} style={{ display: imageSrc ? 'none' : 'block' }}>Capture Image</button>
        {imageSrc && (
          <>
            <h2>Captured Image:</h2>
            <img src={imageSrc} alt="Captured" />
          </>
        )}
      </div>
    </div>
  );
}
