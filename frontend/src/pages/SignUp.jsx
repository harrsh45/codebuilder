import React, { useState } from "react";
import logo from '../images/logo.png';
import image from '../images/authPageSide.png';
import { Link, useNavigate } from "react-router-dom";
import { api_base_url } from "../helper.js";

const SignUp = () => {
    const [Username, setUsername] = useState("");
    const [Name, setName] = useState("");
    const [Email, setEmail] = useState("");
    const [Pwd, setPwd] = useState("");
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const submitForm = (e) => {
        e.preventDefault();
        fetch(api_base_url + "/signup", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: Username,
              name: Name,
              email: Email,
              password: Pwd,
            }),
          })
          
        .then((res) => res.json())
        .then((data) => {
            if (data.success) {
                alert("Account created successfully");
                navigate("/login"); 
            } else {
                setError(data.message);
            }
        })
        .catch((error) => {
            setError("An error occurred. Please try again.");
        });
    }

    return (
        <>
            <div className="w-screen flex justify-between items-center min-h-screen pl-[100px]">
                <div className="left w-[40%]">
                    <img className="w-[220px]" src={logo} alt="Logo" />
                    <form onSubmit={submitForm} className="w-full mt-[40px]">
                        <div className="inputbox">
                            <input 
                                required 
                                onChange={(e) => setUsername(e.target.value)} 
                                value={Username} 
                                type="text" 
                                placeholder="Username"
                            />
                        </div>
                        <div className="inputbox">
                            <input 
                                required 
                                onChange={(e) => setName(e.target.value)} 
                                value={Name} 
                                type="text" 
                                placeholder="Name"
                            />
                        </div>
                        <div className="inputbox">
                            <input 
                                required 
                                onChange={(e) => setEmail(e.target.value)} 
                                value={Email} 
                                type="email" 
                                placeholder="Email"
                            />
                        </div>
                        <div className="inputbox">
                            <input 
                                required 
                                onChange={(e) => setPwd(e.target.value)} 
                                value={Pwd} 
                                type="password" 
                                placeholder="Password"
                            />
                        </div>
                        <p className="text-grey">
                            Already have an account? 
                            <Link className="text-blue-600" to="/login"> login</Link>
                        </p>
                        <p className='text-red-500 text-[14px] my-2'>{error}</p>
                        <button className="btnblue w-full mt-[20px]">Sign up</button>
                    </form>
                </div>
                <div className="right w-[50%]">
                    <img className="h-full w-[100%] object-cover" src={image} alt="Auth Page Side" />
                </div>
            </div>
        </>
    );
}

export default SignUp;
