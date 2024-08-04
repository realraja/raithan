"use client"
import { useRef, useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import ReactWebcam for client-side rendering
const ReactWebcam = dynamic(() => import('react-webcam'), { ssr: false });

const CaptureImage = () => {
  const webcamRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);

  const captureImage = () => {
    const screenshot = webcamRef.current.getScreenshot();
    if (screenshot) {
      setImageSrc(screenshot);
    } else {
      console.error('Failed to capture image');
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImageSrc(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Capture Image</h1>
      <div className="mb-4">
        <label className="block mb-2">
          Upload or Capture Image:
        </label>
        <input
          type="file"
          accept="image/*"
          capture="camera"
          onChange={handleImageUpload}
          className="block w-full text-sm text-gray-500
                     file:mr-4 file:py-2 file:px-4
                     file:rounded-full file:border-0
                     file:text-sm file:font-semibold
                     file:bg-blue-50 file:text-blue-700
                     hover:file:bg-blue-100"
        />
      </div>
      {typeof window !== 'undefined' && (
        <div className="mb-4">
          <ReactWebcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="w-full"
          />
          <button
            onClick={captureImage}
            className="mt-2 p-2 bg-green-500 text-white rounded"
          >
            Capture Image
          </button>
        </div>
      )}
      {imageSrc && (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-2">Captured Image</h2>
          <img src={imageSrc} alt="Captured" className="max-w-full" />
        </div>
      )}
    </div>
  );
};

export default CaptureImage;
