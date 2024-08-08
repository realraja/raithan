"use client"
import NotVerifiedPage from '@/components/Basics/NotVerified'
import React from 'react'
import { useSelector } from 'react-redux'

const Page = () => {
    const {user} = useSelector(state => state.user)

    if(!user.verified) return <NotVerifiedPage />
  return (
    <div>
      Study
    </div>
  )
}

export default Page
