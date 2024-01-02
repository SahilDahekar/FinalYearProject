import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from '@/components/ui/button'
import { IoVideocam ,IoKey } from "react-icons/io5";


function Dashboard() {
  return (
    <div className='h-screen'>
        <div className='flex justify-between py-4 px-3 border-b'>
            <h1 className='text-3xl font-semibold tracking-tight'>Dashboard</h1>
            <div>
                <Avatar className='cursor-pointer'>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </div>
        </div>
        <div className='flex h-[90%]'>
            <div className='w-1/6 gap-2 flex flex-col p-2'>
                <Button className='text-base' asChild variant="ghost" size='lg'>
                    <Link to="/broadcast"><IoVideocam className='mr-2'/>Broadcast</Link>
                </Button>
                <Button className='text-base' asChild variant="ghost" size='lg'>
                    <Link to="/destination"><IoKey className='mr-2'/>Destination</Link>
                </Button>
            </div>
            <div className='w-5/6 border'>
                <Outlet />
            </div>
        </div>
    </div>
  )
}

export default Dashboard