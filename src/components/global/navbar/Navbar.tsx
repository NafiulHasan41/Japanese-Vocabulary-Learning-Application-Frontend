'use client'
import React, { useContext } from 'react'
import Navigation from './Navigation'
import Image from 'next/image'
import { GrLogin } from "react-icons/gr";
import Link from 'next/link';
import { AuthContext } from '@/provider/AuthProvider';
import DropDown from './DropDown';

export default function Navbar() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }

  const { user } = context;
  return (
    <div className=' flex  justify-between px-10 md:px-20 sticky z-50 top-0 bg-gray-200/40 p-2 md:p-5'>
      <Link href='/'>
      <div className=' flex  items-center gap-1 border-r border-black pr-2 '>
        <Image src="https://i.ibb.co.com/vxQWyYC/jp-wordsmith-logo.jpg" alt="logo" width={50} height={50} className=' rounded-full'/>
        <h1 className='hidden md:block text-black font-bold text-[16px] hover:underline '>Japanese WordSmith</h1>
      </div>
      </Link>
      <Navigation/>
      {user ? (
        <DropDown user={user}/>
      ) : (
        <Link href='/authentication'>
        <div className=' border-l border-black pl-3 flex gap-1 items-center hover:text-sky-500'>
          <GrLogin />
         
          <button  className='hover:text-sky-500 text-black rounded-lg p-2 '>Log In / Register </button>
         
        </div>
        </Link>
      )}
      
    </div>
  )
}
