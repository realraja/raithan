"use client"
import axios from 'axios';
import { useState } from 'react';

export default function CameraPage() {
  const [imageSrc, setImageSrc] = useState(null);
  const [uploadUrl, setUploadUrl] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleCapture = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageSrc(e.target.result);
      };
      reader.readAsDataURL(file);
    }
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
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <h1 className="text-3xl font-bold mb-4">Capture an Image</h1>
      <input
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleCapture}
        className="hidden"
        id="cameraInput"
      />
      <label
        htmlFor="cameraInput"
        className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-700"
      >
        Open Camera
      </label>
      {/* {imageSrc && (
        <div className="mt-4">
          <img src={imageSrc} alt="Captured" className="rounded shadow-lg" />
        </div>
      )} */}

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
  );
} 
