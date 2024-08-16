import { Fragment, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';

export default function ChangeName({ confirmState, setConfirmState, runFunction, buttonText = 'Change',name,setName }) {
    const cancelButtonRef = useRef(null);
    const [isChangeName, setIsChangeName] = useState(name);
  const handleSubmit = async()=>{
    runFunction();
    setConfirmState(false);
  }

  return (
    <Transition.Root show={confirmState} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={() => {setName(isChangeName);setConfirmState(false);}}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-gray-800 text-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md">
                <div className="bg-gray-800 px-4 pb-4 pt-5">
                  <div className="flex justify-center items-center">
                    <div className="text-center sm:text-left w-full flex flex-col justify-center items-center gap-5 my-3">
                      <Dialog.Title as="h3" className="flex items-center text-lg font-medium leading-6 text-purple-400">
                     


                        Change Name
                      </Dialog.Title>
                      <div className="mt-2">
                        <input
                          type="text"
                          placeholder="Name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-600 bg-gray-700 rounded-lg shadow-sm focus:outline-none"
                        />
                      </div>
                     
                    </div>
                  </div>
                </div>
                <div className="bg-gray-700 px-4 py-3 sm:flex sm:flex-row-reverse">
                <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-purple-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 sm:ml-3 sm:w-auto"
                    onClick={handleSubmit}
                  >
                    <div className="flex justify-center items-center"> 
                        buttonText
                    
                    </div>
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-transparent px-4 py-2 text-gray-300 shadow-sm ring-1 ring-inset ring-gray-600 sm:mt-0 sm:w-auto"
                    onClick={() => {setName(isChangeName);setConfirmState(false);}}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
