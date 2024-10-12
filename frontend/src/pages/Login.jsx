import React, { useState } from "react";
import logo from '../images/logo.png'
import image from '../images/authPageSide.png'
import { Link ,useNavigate} from "react-router-dom";
import { api_base_url } from "../helper";
const Login = () => {
    
    const [email,setEmail]=useState("")
    const [pwd,setPwd]=useState("")
    const [error, seterror] = useState("")
    const submitForm = (e) => {
      e.preventDefault();
      fetch(api_base_url + "/login",{
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email,
          password: pwd
        })
      }).then(res => res.json()).then(data => {
        if(data.success === true){
          localStorage.setItem("token", data.token);
          localStorage.setItem("isLoggedIn", true);
          localStorage.setItem("userId", data.userId);
          setTimeout(() => {
            window.location.href = "/"
          }, 200);
        } else {
          seterror(data.message);
        }
      })
    }
  return (
    <>
      <div className="w-screen flex justify-between items-center min-h-screen pl-[100px] ">
        <div className="left w-[40%]">
            <img className="w-[220px]" src={logo} alt="" />
            <form onSubmit={submitForm} action="" className="w-full mt-[40px] ">
                <div className="inputbox">
                    <input required onChange={(e)=>setEmail(e.target.value)} value={email} type="text" placeholder="Email"/>
                </div>
                <div className="inputbox">
                    <input required onChange={(e)=>setPwd(e.target.value)} value={pwd} type="Password" placeholder="Password"/>
                </div>
                <p className="text-grey">Already have an account <Link className="text-blue-600" to="/signUp">Sign Up</Link> </p>
                <p className='text-red-500 text-[14px] my-2'>{error}</p>
                 <button className="btnblue w-full mt-[20px]">Login</button>
            </form>
        </div>
        <div className="right w-[50%]">
            <img className="h-full  w-[100%] object-cover" src={image} alt="" />

        </div>
      </div>
    </>
  );
};

export default Login;
