import { Fragment, useEffect, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { BeatLoader } from 'react-spinners';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { checkAdmin } from '@/redux/actions/adminActions';

export default function AddSubject({ confirmState, setConfirmState, runFunction, buttonText = 'Create' }) {
  const cancelButtonRef = useRef(null);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
 
 
   const coursesData = useSelector(state => state.admin.courses);
   const dispatch = useDispatch();
  const toggleDropdown = () => {
     setIsDropdownOpen(!isDropdownOpen);
   };
 
  const handleCheckboxChange = (option) => {
     if (courses.includes(option)) {
       setCourses(courses.filter((item) => item !== option));
     } else {
       setCourses([...courses, option]);
     }
   };
  if(courses.length === 0) coursesData && setCourses([coursesData[0]._id])
   useEffect(() => {
   coursesData && setCourses([coursesData[0]._id])
   }, [coursesData])

  const handleSubmit = async()=>{
    setLoading(true);
    try {
        const {data} = await axios.post('/api/admin/subject',{name,courses});
        // console.log(data);
        toast.success(data.message);
        setLoading(false);
        await dispatch(checkAdmin());
        setConfirmState(false);
    } catch (error) {
        toast.error(error.response.data.message);
        setLoading(false);
    }
  }

  return (
    <Transition.Root show={confirmState} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={() => setConfirmState(false)}>
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
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 mr-2">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z" />
</svg>


                        New Subject
                      </Dialog.Title>
                      <div className="m-3 text-sm text-white flex justify-center items-center">
                        <div className="relative inline-block text-left w-56">
                          <button
                            type="button"
                            className=" inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-gray-700 text-sm font-medium text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                            id="options-menu"
                            aria-expanded="true"
                            aria-haspopup="true"
                            onClick={toggleDropdown}
                          >
                            Select Courses
                            <svg
                              className="-mr-1 ml-2 h-5 w-5"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                fillRule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                          {isDropdownOpen && (
                            <div
                              className="origin-top-right absolute overflow-auto mt-2 w-56 h-36 scrollEditclass rounded-md shadow-lg bg-gray-700 ring-1 ring-black ring-opacity-5"
                              role="menu"
                              aria-orientation="vertical"
                              aria-labelledby="options-menu"
                            >
                              <div className="py-1" role="none">
                                {coursesData.map((i) => {
                                  return(
                                  <div key={i._id} onClick={() => handleCheckboxChange(i._id)} className="flex items-center px-4 py-2 cursor-pointer">
                                    <input
                                      type="checkbox"
                                      checked={courses.includes(i._id)}
                                      onChange={() => handleCheckboxChange(i._id)}
                                      className="mr-2 size-5"
                                    />
                                    <span className="text-white">{i.name}</span>
                                  </div>
                                )})}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      <div>
                        <input
                          type="text"
                          placeholder="Subject Name"
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
                      {loading ? (
                        <BeatLoader className=" self-center" color="white" />
                      ) : (
                        buttonText
                      )}
                    </div>
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-transparent px-4 py-2 text-gray-300 shadow-sm ring-1 ring-inset ring-gray-600 sm:mt-0 sm:w-auto"
                    onClick={() => setConfirmState(false)}
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
