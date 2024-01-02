import React from 'react'
import { Button } from '../ui/button'
import { GrNewWindow } from "react-icons/gr";

function Broadcast() {
  return (
    <div className='p-6'>
        <h2 className='text-3xl font-semibold tracking-tight'>Create a Broadcast</h2>
        <Button className='my-4'>
            <GrNewWindow className='mr-2'/> New
        </Button>
    </div>
  )
}

export default Broadcast