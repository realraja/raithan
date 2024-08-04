"use client";
import Link from 'next/link';
import React from 'react';

const ForgotPasswordPage = () => {
  const adminPhoneNumber = '800-5760-985'; // Replace with the actual admin phone number

  const handleCallAdmin = () => {
    window.location.href = `tel:${adminPhoneNumber}`;
  };

  return (
    <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8 ">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          className="mx-auto h-32 w-auto"
          src="/Logo_Design_Template-removebg-preview.png"
          alt="Your Company"
        />
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight  text-gray-100">
          Forgot your password?
        </h2>
        <p className="mt-2 text-center text-sm  text-gray-300">
          Please call our admin for assistance.
        </p>
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
          <p className="mt-10 text-center text-sm text-gray-400">
          Already Forgot Password?{' '}
          <Link href="/login" className="font-semibold leading-6 text-indigo-500 hover:text-indigo-400">
            Login
          </Link>
        </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
