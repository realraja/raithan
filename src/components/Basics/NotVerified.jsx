"use client";
import Link from 'next/link';
import React from 'react';
import { ClockLoader, PacmanLoader } from 'react-spinners';

const NotVerifiedPage = () => {
  const adminPhoneNumber = '800-5760-985'; // Replace with the actual admin phone number

  const handleCallAdmin = () => {
    window.location.href = `tel:${adminPhoneNumber}`;
  };

  return (
    <div className="flex flex-col justify-center px-6 py-12 lg:px-8 ">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
      <div className=" flex flex-col justify-center items-center text-center text-3xl text-rose-500 space-y-5">
      <PacmanLoader size={50} color="#F43F5E" />
      <h1>Sorry You are Not Verified!</h1>
        <p className="mt-2 text-center text-sm  text-gray-300">
          Please call our admin for assistance.
        </p>
    </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className=" bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="text-center">
            <p className="text-sm  text-gray-300">
              For further assistance, please call our admin:
            </p>
            <p className="mt-1 text-lg font-medium  text-gray-100">
              {adminPhoneNumber}
            </p>
            <button
              onClick={handleCallAdmin}
              className="mt-3 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Call Admin
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default NotVerifiedPage;
