import React, { useEffect,useState } from 'react'
import logo from '../images/logo.png';
import Avatar from 'react-avatar';
import { Link, useNavigate } from 'react-router-dom'
import { MdLightMode } from 'react-icons/md';
import { BsGridFill } from 'react-icons/bs';
import { ToggleEvent,api_base_url } from '../helper';


const Navbar = ({ isGridLayout, setIsGridLayout }) => {
  const [data, setdata] = useState(null)
  const [error, seterror] = useState("")
  const navigate=useNavigate();
  useEffect(() => {
    fetch(api_base_url + "/getUserDetails", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: localStorage.getItem("userId")
      })
    }).then(res => res.json()).then(data => {
      if (data.success) {
        setdata(data.user);
      }
      else {
        seterror(data.message);
      }
    })
  }, [])

  const logout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    window.location.reload();
  }

  return (
   <div className="navbar flex items-center justify-between px-[100px] h-[80px] bg-[#141414]">
    <div className="logo">
      <img className='w-[150px] cursor-pointer' src={logo} alt="" />
    </div>
    <div className="link items-center flex gap-3">
      <Link>Home</Link>
      <Link>About</Link>
      <Link>Contact</Link>
      <Link>Service</Link>
     
      <Avatar onClick={()=>{ ToggleEvent(".dropdown","hidden")}} round="50%" className='ml-[10px] cursor-pointer' name={data?data.name:""} size="40" />
    </div>

    <div className="dropdown hidden absolute right-[60px] top-[80px] shadow-lg shadow-black/50 rounded-lg bg-[#1A1919] w-[150px] h-[150px] p-[10px]">
    <div className='py-[10px] border-b'>
      <h3 className="text-[16px] " style={{lineHeight:1}}>{data?data.name:""}</h3>
    </div>
    <button onClick={logout} className='btnBlue !bg-red-500 h-[35px] mt-2  rounded-lg min-w-[120px] hover:!bg-red-600'>Logout</button>
    <i onClick={() => setIsGridLayout(!isGridLayout)}className='flex items-center cursor-pointer gap-2 pt-[5px]' style={{fontStyle:"normal"}} > <BsGridFill className='text-[20px] '  /> {isGridLayout ? "List" : "Grid"} Layout
      </i>
    </div>
   </div>
  )
}

export default Navbar