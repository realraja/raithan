import React, { useState, Fragment, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";

const courses = [
    { id: 1, name: 'React Course' },
    { id: 2, name: 'Next.js Course' },
    { id: 3, name: 'Node.js Course' },
    // Add more courses here
  ];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const SelectCourse = ({data = courses,setSelectedData}) => {
  const [selected, setSelected] = useState(data[0]);
 
useEffect(()=>{
    setSelectedData(selected);
},[selected,setSelected,setSelectedData]);
  return (
      <Listbox value={selected} onChange={setSelected}>
        {({ open }) => (
          <>
            <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900">
              Select Course
            </Listbox.Label>
            <div className="relative mt-2">
              <Listbox.Button className="relative w-full cursor-default rounded-md bg-gray-800 py-1.5 pl-3 pr-10 text-left shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 sm:text-sm sm:leading-6">
                <span className="block truncate text-gray-100">
                  {selected.name}
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                    />
                  </svg>
                </span>
              </Listbox.Button>

              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-gray-800 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {data.map((i) => (
                    <Listbox.Option
                      key={i?.id || i._id}
                      className={({ active }) =>
                        classNames(
                          active ? "bg-indigo-600" : "text-gray-100",
                          "relative cursor-default select-none py-2 pl-3 pr-9"
                        )
                      }
                      value={i}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={classNames(
                              selected ? "font-semibold" : "font-normal",
                              "block truncate"
                            )}
                          >
                            {i.name}
                          </span>

                          {selected ? (
                            <span
                              className={classNames(
                                active ? "text-white" : "text-indigo-600",
                                "absolute inset-y-0 right-0 flex items-center pr-4"
                              )}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="size-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="m4.5 12.75 6 6 9-13.5"
                                />
                              </svg>
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
    );
};

export default SelectCourse;
