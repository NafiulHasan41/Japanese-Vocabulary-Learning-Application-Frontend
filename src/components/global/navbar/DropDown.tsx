'use client'
import React, { useContext } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import Image from 'next/image'
import { AuthContext } from '@/provider/AuthProvider';
import Link from 'next/link';


export interface User {
    id: string;
    name: string;
    email: string;
    imageURL?: string;
    role: "admin" | "user";
  }

export default function DropDown({user} : {user: User}) {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error("AuthContext must be used within an AuthProvider");
    }
  
    const { logOut } = context;
   
  return (
      <div>
          <DropdownMenu>
              <DropdownMenuTrigger>
                  <div className=' flex  border-l border-black pl-3  gap-1 items-center hover:text-sky-500'>
                      <Image src={user?.imageURL || "https://i.ibb.co.com/vxQWyYC/jp-wordsmith-logo.jpg"} alt="user" width={50} height={50} className=' rounded-full' />
                      <h1 className=' hidden md:block text-black font-bold text-[16px]  '>{user.name}</h1>
                  </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem disabled className=' md:hidden'>
                  <h1 className=' text-black font-bold text-[16px]  '>{user.name}</h1>
                    </DropdownMenuItem>
                    {
                        user.role === 'admin' && (
                            <DropdownMenuItem disabled >Admin</DropdownMenuItem>
                           
                        )
                    }
                    {
                        user.role === 'admin' && (
                            <DropdownMenuItem >
                                <Link href='/admin/dashboard'>
                                   Dashboard
                                </Link>
                            </DropdownMenuItem>
                           
                        )
                    }
                
                  <DropdownMenuItem>
                   <button onClick={()=>logOut()}  className='text-black font-bold text-[16px]'>Log Out</button>
                  </DropdownMenuItem>
              </DropdownMenuContent>
          </DropdownMenu>
      </div>
  )
}
