"use client"
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const Page = () => {
  const [mounted, setMounted] = useState(false);
  const searchParams = useSearchParams()
 
  function updateSorting(sortOrder) {
    const params = new URLSearchParams(searchParams.toString())
    params.set('sort', sortOrder)
    window.history.pushState(null, '', `?${params.toString()}`)
  }

 useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return (
    <>
      <div className='flex justify-center items-center h-full'>
        <h1 onClick={() => updateSorting('asc')} className='text-9xl font-extralight text-purple-700'>Coming Soon</h1>
      </div>
    </>
  )
}

export default Page
