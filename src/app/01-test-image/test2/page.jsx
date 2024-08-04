"use client";
import { useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';

// Dynamically import ReactWebcam for client-side rendering
const ReactWebcam = dynamic(() => import('react-webcam'), { ssr: false });

const CropImage = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [webcamReady, setWebcamReady] = useState(false);
  const webcamRef = useRef(null);
  const imageRef = useRef(null);
  const cropperRef = useRef(null);

  const captureImage = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      console.log('Captured image:', imageSrc);
      setImageSrc(imageSrc);
    } else {
      console.log('Webcam is not ready');
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

  const initializeCropper = () => {
    cropperRef.current = new Cropper(imageRef.current, {
      viewMode: 2,
      crop(event) {
        console.log(event.detail.x);
        console.log(event.detail.y);
        console.log(event.detail.width);
        console.log(event.detail.height);
      },
    });
  };

  const handleCrop = () => {
    const canvas = cropperRef.current.getCroppedCanvas();
    setCroppedImage(canvas.toDataURL('image/jpeg'));
  };

  const handleUserMediaError = (error) => {
    console.error('Error accessing the camera:', error);
  };

  const handleUserMedia = () => {
    setWebcamReady(true);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Crop Image</h1>
      <div className="mb-4">
        <input type="file" onChange={handleImageUpload} />
        <button
          onClick={captureImage}
          className="ml-4 p-2 bg-blue-500 text-white rounded"
          disabled={!webcamReady}
        >
          Capture from Camera
        </button>
      </div>
      {imageSrc && (
        <div className="crop-container mb-4">
          <img
            ref={imageRef}
            src={imageSrc}
            alt="Source"
            onLoad={initializeCropper}
            className="max-w-full"
          />
        </div>
      )}
      <button
        onClick={handleCrop}
        className="mt-4 p-2 bg-green-500 text-white rounded"
      >
        Crop Image
      </button>
      {croppedImage && (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-2">Cropped Image</h2>
          <img src={croppedImage} alt="Cropped" className="max-w-full" />
        </div>
      )}
      <div className="mt-4">
        <ReactWebcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          className="w-full"
          onUserMedia={handleUserMedia}
          onUserMediaError={handleUserMediaError}
        />
      </div>
    </div>
  );
};

export default CropImage;
