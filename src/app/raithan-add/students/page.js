"use client"
import UserTable from '@/components/admin/UserTable'
import React from 'react'
import { useSelector } from 'react-redux'

const Page = () => {
  const {users} = useSelector(state => state.admin)
  return (
    <div className='max-sm:w-screen overflow-auto'>
      <h1 className="text-center text-2xl font-bold mt-5 text-gray-800 dark:text-gray-300">User Table</h1>
      {users && <UserTable data={users} />}
    </div>
  )
}

export default Page
