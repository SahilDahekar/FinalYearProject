import React from 'react'

const Button = ({cb , children}) => {
  return (
    <button className='px-4 py-2 bg-black text-white rounded-md font-semibold' onClick={cb}>
      {children}
    </button>
  )
}

export default Button