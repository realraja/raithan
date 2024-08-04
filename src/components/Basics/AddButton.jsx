import React from 'react'

const AddButton = ({icon,runFunction,text}) => {
  return (
    
      <button onClick={runFunction} className="active:scale-105 duration-75 inline-flex items-center justify-center p-0.5  overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-r from-rose-600 to-violet-500 group-hover:from-rose-600 group-hover:to-violet-500 hover:text-white dark:text-white  focus:outline-none ">
            <span className="flex justify-center items-center px-5 py-2 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            {icon && <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 mr-2 sm:hidden md:block"
              >
              {icon}
              </svg>}
              <p className='text-lg font-normal'>{text}</p>
              
            </span>
          </button>
    
  )
}

export default AddButton
