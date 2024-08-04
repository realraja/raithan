import React from 'react';
import { HomeIcon, UserGroupIcon, BookOpenIcon, CurrencyDollarIcon, CogIcon } from '@heroicons/react/solid';
import Link from 'next/link';

const Sidebar = () => {
  return (
    <div className="bg-gray-900 text-white h-full w-1/6 max-sm:hidden md:block">
      <div className="p-4 text-xl font-bold flex justify-center items-center gap-3">
        <img className='h-16' src="/Logo_Design_Template-removebg-preview.png" alt="logo" />
        <span className='sm:hidden lg:block'>Raithan Classes</span></div>
      <nav className="mt-4">
        <Link href="/raithan-add" className="flex items-center p-4 hover:bg-purple-800">
          <HomeIcon className="h-6 w-6 mr-2 sm:hidden md:block" /> Dashboard
        </Link>
        <Link href="/raithan-add/students" className="flex items-center p-4 hover:bg-purple-800">
          <UserGroupIcon className="h-6 w-6 mr-2 sm:hidden md:block" /> Students
        </Link>
        <Link href="/raithan-add/quizes" className="flex items-center p-4 hover:bg-purple-800">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 mr-2 sm:hidden md:block">
  <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
</svg>
 Quizes
        </Link>
        <Link href="/raithan-add/fees" className="flex items-center p-4 hover:bg-purple-800">
          <CurrencyDollarIcon className="h-6 w-6 mr-2 sm:hidden md:block" /> Fees
        </Link>
        <Link href="/raithan-add/subjects" className="flex items-center p-4 hover:bg-purple-800">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 mr-2 sm:hidden md:block">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z" />
</svg>
 Subjects
        </Link>
        
        <Link href="/raithan-add/courses" className="flex items-center p-4 hover:bg-purple-800">
          <BookOpenIcon className="h-6 w-6 mr-2 sm:hidden md:block" /> Courses
        </Link>
        <Link href="/raithan-add/settings" className="flex items-center p-4 hover:bg-purple-800">
          <CogIcon className="h-6 w-6 mr-2 sm:hidden md:block" /> Settings
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
