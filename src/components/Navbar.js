import React, { useState } from 'react'
import logo from '../logo.png'
import { Link } from 'react-router-dom/dist'
import { RiHome2Fill, RiHome2Line, RiMenu2Fill, RiMenu3Fill, RiSpeakFill, RiSpeakLine, RiThreadsLine } from 'react-icons/ri'
import { AiFillAudio, AiOutlineAudio } from 'react-icons/ai'
import { TiHeartFullOutline } from 'react-icons/ti'
export default function Navbar() {
  const [ click, setClick] = useState();
  const clickMe = () =>{
    setClick(!click)
  }
  return (
    <div className=' '>
      <div className="md:px-40 pt-6 md:pt-0 px-6 bg-purple-100 sticky flex md:flex-row  justify-between items-center">
      <img src={logo} alt="" className='h-28' />
      <div className="links md:flex md:flex-row flex-col justify-center gap-8 hidden">
        <Link to={'/'} className='text-lg font-semibold hover:text-purple-900 hover:shadow-lg text-purple-700 px-4 py-2 border-2 transition duration-200 border-transparent hover:border-purple-900 rounded-lg flex items-center gap-1 group/1'> Translator <RiHome2Line className="group-hover/1:hidden"/> <RiHome2Fill className="group-hover/1:flex hidden"/> </Link>
        <Link to={'/speech-to-text'} className='text-lg font-semibold hover:text-purple-900 hover:shadow-lg text-purple-700 px-4 py-2 border-2 transition duration-200 border-transparent hover:border-purple-900 rounded-lg flex items-center gap-1 group/2'> Speak here <RiSpeakLine className="group-hover/2:hidden" /> <RiSpeakFill className="group-hover/2:flex hidden"/> </Link>
        <Link to={'/text-to-speech'} className='text-lg font-semibold hover:text-purple-900 hover:shadow-lg text-purple-700 px-4 py-2 border-2 transition duration-200 border-transparent hover:border-purple-900 rounded-lg flex items-center gap-1 group/3'> Listen here <AiOutlineAudio className="group-hover/3:hidden"/> <AiFillAudio className="group-hover/3:flex hidden"/> </Link>

      </div>
      <button className='flex md:hidden gap-1 justify-center items-center border-2 transition  bg-purple-700 p-4 text-white rounded-lg hover:shadow-lg' onClick={clickMe}><RiMenu3Fill/>  </button>
      </div>
      {click && (
        <div className="links flex-col justify-center gap-8 z-50 bg-purple-100 absolute w-full transition duration-200 ">
        <Link to={'/'} className='text-lg font-semibold hover:text-purple-900 hover:shadow-lg text-purple-700 px-4 py-2 border-2 transition duration-200 border-transparent hover:border-purple-900 rounded-lg flex items-center gap-1 w-max mx-6 my-4 group/1'> Translator <RiHome2Line className="group-hover/1:hidden"/> <RiHome2Fill className="group-hover/1:flex hidden "/> </Link>
        <Link to={'/speech-to-text'} className='text-lg font-semibold hover:text-purple-900 hover:shadow-lg text-purple-700 px-4 py-2 border-2 transition duration-200 border-transparent hover:border-purple-900 rounded-lg flex items-center gap-1 w-max mx-6 my-4 group/2'> Speak here <RiSpeakLine className="group-hover/2:hidden" /> <RiSpeakFill className="group-hover/2:flex hidden"/> </Link>
        <Link to={'/text-to-speech'} className='text-lg font-semibold hover:text-purple-900 hover:shadow-lg text-purple-700 px-4 py-2 border-2 transition duration-200 border-transparent hover:border-purple-900 rounded-lg flex items-center gap-1 w-max mx-6 my-4 group/3'> Listen here <AiOutlineAudio className="group-hover/3:hidden"/> <AiFillAudio className="group-hover/3:flex hidden"/> </Link>

      </div>
      )}
    </div>
  )
}
