import React from 'react'

type ButtonProps  = {
  cb : () => void,
  children: React.ReactNode
}

const Button = ({cb , children} : ButtonProps) => {
  return (
    <button className='px-4 py-2 bg-black text-white rounded-md font-semibold' onClick={cb}>
      {children}
    </button>
  )
}

export default Button