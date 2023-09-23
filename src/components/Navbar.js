import React from 'react'
import logo from '../logo.png'
export default function Navbar() {
  return (
    <div className=' md:px-40 px-6 bg-purple-100 sticky py-2'>
      <img src={logo} alt="" className='h-28' />
    </div>
  )
}
