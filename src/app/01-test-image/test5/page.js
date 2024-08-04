"use client";
import { useState, useRef } from 'react';
import axios from 'axios';

export default function Camera() {
  const [imageSrc, setImageSrc] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadUrl, setUploadUrl] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  const startCamera = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    videoRef.current.srcObject = stream;
    streamRef.current = stream;
    videoRef.current.play();
  };

  const captureImage = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/png');
    setImageSrc(dataUrl);

    const tracks = streamRef.current.getTracks();
    tracks.forEach(track => track.stop());
  };

  const uploadImage = async () => {
    setUploading(true);
    try {
      const {data} = await axios.post('/api/upload', { image: imageSrc });
      setUploadUrl(data.url);
      console.log(data);
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
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
            <button onClick={uploadImage} disabled={uploading}>
              {uploading ? 'Uploading...' : 'Upload Image'}
            </button>
            {uploadUrl && (
              <>
                <h2>Uploaded Image:</h2>
                <img src={uploadUrl} alt="Uploaded" />
                <p>{uploadUrl}</p>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
