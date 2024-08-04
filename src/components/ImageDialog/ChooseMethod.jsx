import { XIcon } from "@heroicons/react/solid";
import { Dialog, Transition } from "@headlessui/react"; // Import missing components
import React, { Fragment, useState } from "react"; // Import Fragment
import CropperDialog from "./CropImage";

const ChooseMethod = ({
  isOpen,
  setIsOpen,
  setImgUrl,
}) => {
  // Ensure required props are included
  const [imageSrc, setImageSrc] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCapture = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageSrc(e.target.result);
        setIsDialogOpen(true);
      };
      reader.readAsDataURL(file);
    }
  };

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
      setImgUrl(compressedDataUrl);
      setIsDialogOpen(false);
      setIsOpen(false);
    };
  };
  
  

  // const handleImageUpload = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setImageSrc(e.target.result);
  //       setIsDialogOpen(true); // Ensure this function is passed as a prop or defined
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

 

  return (<>
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => setIsOpen(false)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex h-full items-end sm:items-center justify-center min-h-full p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md p-6 bg-gray-900 text-white rounded-lg shadow-xl">
                <div className="flex justify-between items-center">
                  <Dialog.Title className="text-lg font-medium leading-6 text-purple-400">
                    Upload Image
                  </Dialog.Title>
                  <button
                    className="text-gray-400 hover:text-gray-200"
                    onClick={() => {
                      setIsOpen(false);
                    }}
                  >
                    <XIcon className="w-5 h-5" />
                  </button>
                </div>

                <div className="mt-4 flex flex-col space-y-4 mx-5">
                <label className="flex justify-center items-center gap-3 text-purple-300 py-2 rounded-lg border-2 border-purple-600 cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleCapture}
                      />
                       <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Choose Image
                    </label>
                  {/* <button
                    onClick={handleImageUpload}
                    className="flex justify-center items-center gap-3 text-purple-300 py-2 rounded-lg border-2 border-purple-600"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Choose Image
                  </button>{" "} */}
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
                    className="flex justify-center items-center gap-3 text-purple-300 py-2 rounded-lg border-2 border-purple-600 cursor-pointer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-6"
                    >
                      <path d="M12 9a3.75 3.75 0 1 0 0 7.5A3.75 3.75 0 0 0 12 9Z" />
                      <path
                        fillRule="evenodd"
                        d="M9.344 3.071a49.52 49.52 0 0 1 5.312 0c.967.052 1.83.585 2.332 1.39l.821 1.317c.24.383.645.643 1.11.71.386.054.77.113 1.152.177 1.432.239 2.429 1.493 2.429 2.909V18a3 3 0 0 1-3 3h-15a3 3 0 0 1-3-3V9.574c0-1.416.997-2.67 2.429-2.909.382-.064.766-.123 1.151-.178a1.56 1.56 0 0 0 1.11-.71l.822-1.315a2.942 2.942 0 0 1 2.332-1.39ZM6.75 12.75a5.25 5.25 0 1 1 10.5 0 5.25 5.25 0 0 1-10.5 0Zm12-1.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Open Camera
                  </label>

                
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
    <CropperDialog
        imageSrc={imageSrc}
        onCrop={handleCrop}
        onClose={()=> setIsDialogOpen(false)}
        isOpen={isDialogOpen}
      />
    </>
  );
};

export default ChooseMethod;
