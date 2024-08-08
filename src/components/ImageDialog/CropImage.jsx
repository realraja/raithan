import { useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { Cropper } from 'react-cropper';
import 'cropperjs/dist/cropper.css';

export default function CropperDialog({ ratio,imageSrc, onCrop, onClose, isOpen }) {
  const cropperRef = useRef(null);

  const handleCrop = () => {
    const cropper = cropperRef.current.cropper;
    const croppedImageSrc = cropper.getCroppedCanvas().toDataURL();
    onCrop(croppedImageSrc);
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-50" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-full p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className=" transform overflow-hidden rounded-2xl w-[90vw] h-[80vh] bg-gray-900 p-6 text-left align-middle shadow-xl transition-all">
                <Cropper
                aspectRatio={ratio}
                  src={imageSrc}
                  style={{ width: '95%',height: '60vh' }}
                  initialAspectRatio={1}
                  guides={false}
                  ref={cropperRef}
                />
                <div className="flex justify-end mt-4">
                  <button
                    onClick={handleCrop}
                    className="bg-purple-500 text-white px-4 py-2 rounded mr-2"
                  >
                    Crop
                  </button>
                  <button
                    onClick={onClose}
                    className="bg-gray-500 text-white px-4 py-2 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
