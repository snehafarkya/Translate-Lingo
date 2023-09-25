import React, { useState } from 'react'
import logo from '../logo.png'
import { Link } from 'react-router-dom/dist'
import { RiHome2Fill, RiMenu2Fill, RiMenu3Fill, RiSpeakFill, RiThreadsLine } from 'react-icons/ri'
import { AiFillAudio } from 'react-icons/ai'
import { TiHeartFullOutline } from 'react-icons/ti'
export default function Navbar() {
  const [ click, setClick] = useState();
  const clickMe = () =>{
    setClick(!click)
  }
  return (
    <div className=' '>
      <div className="md:px-40 px-6 bg-purple-100 sticky flex md:flex-row  justify-between items-center">
      <img src={logo} alt="" className='h-28' />
      <div className="links md:flex md:flex-row flex-col justify-center gap-8 hidden">
        <Link to={'/'} className='text-lg font-semibold hover:text-purple-900 hover:shadow-lg text-purple-700 px-4 py-2 border-2 transition duration-200 border-transparent hover:border-purple-900 rounded-lg flex items-center gap-1'> Home <RiHome2Fill/> </Link>
        <Link to={'/speech-to-text'} className='text-lg font-semibold hover:text-purple-900 hover:shadow-lg text-purple-700 px-4 py-2 border-2 transition duration-200 border-transparent hover:border-purple-900 rounded-lg flex items-center gap-1'> Speak here <RiSpeakFill/> </Link>
        <Link to={'/text-to-speech'} className='text-lg font-semibold hover:text-purple-900 hover:shadow-lg text-purple-700 px-4 py-2 border-2 transition duration-200 border-transparent hover:border-purple-900 rounded-lg flex items-center gap-1'> Listen here <AiFillAudio/> </Link>

      </div>
      <button className='flex md:hidden gap-1 justify-center items-center border-2 transition  bg-purple-700 p-4 text-white rounded-lg hover:shadow-lg' onClick={clickMe}><RiMenu3Fill/>  </button>
      </div>
      {click && (
        <div className="links flex-col justify-center gap-8 z-50 bg-purple-100 absolute w-full transition duration-200 ">
        <Link to={'/'} className='text-lg font-semibold hover:text-purple-900 hover:shadow-lg text-purple-700 px-4 py-2 border-2 transition duration-200 border-transparent hover:border-purple-900 rounded-lg flex items-center gap-1 w-max mx-6 my-4'> Home <RiHome2Fill/> </Link>
        <Link to={'/speech-to-text'} className='text-lg font-semibold hover:text-purple-900 hover:shadow-lg text-purple-700 px-4 py-2 border-2 transition duration-200 border-transparent hover:border-purple-900 rounded-lg flex items-center gap-1 w-max mx-6 my-4'> Speak here <RiSpeakFill/> </Link>
        <Link to={'/text-to-speech'} className='text-lg font-semibold hover:text-purple-900 hover:shadow-lg text-purple-700 px-4 py-2 border-2 transition duration-200 border-transparent hover:border-purple-900 rounded-lg flex items-center gap-1 w-max mx-6 my-4'> Listen here <AiFillAudio/> </Link>

      </div>
      )}
    </div>
  )
}
