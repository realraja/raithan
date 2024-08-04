import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { FiX } from "react-icons/fi";

const ShowPassword = ({ isOpen, setIsOpen, password }) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => setIsOpen(false)}>
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
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-100">
                  Your Password
                </Dialog.Title>
                <div className="mt-4">
                  <p className="text-xl text-gray-300 bg-gray-800 p-3 rounded-lg">
                    {password}
                  </p>
                </div>

                <div className="mt-6">
                  <button
                    type="button"
                    className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-red-500 border border-transparent rounded-md hover:bg-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500"
                    onClick={() => setIsOpen(false)}
                  >
                    Close
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ShowPassword;
