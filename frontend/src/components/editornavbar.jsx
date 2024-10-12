import React from 'react'
import logo from '../images/logo.png';
import Avatar from 'react-avatar';
import { FiDownload } from "react-icons/fi";

function EditorNavbar() {
  return (
   <div className="EditorNavbar flex items-center justify-between px-[100px] h-[80px] bg-[#141414]">
    <div className="logo">
      <img className='w-[150px] cursor-pointer' src={logo} alt="" />
    </div>
    <p>file/ <span className='text-[gray]'>My first project</span></p>
    <i className='p-[8px] btn text-[20px] bg-black rounded-[5px] cursor-pointer'><FiDownload /></i>
    
   </div>
  )
}

export default EditorNavbar