import React, { useState } from "react";
import axios from 'axios';
import logo from "../assets/logo.png";
import { UserRound, Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from 'react-toastify';

const Login = () => {
  const navigate = useNavigate();
  const {backendUrl, setIsLoggedin, getUserData} = useContext(AppContext)
  const [state, setState] = useState("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async(e) => {
    try{
      e.preventDefault();
      
      axios.defaults.withCredentials = true;

      if(state == 'Sign Up'){
        const { data } = await axios.post(`${backendUrl}/api/auth/register`, {name, email, password})
        if(data.success){
          setIsLoggedin(true);
          getUserData();
          navigate('/');
        }else{
          toast.error(data.message)
        }
      }else{
        const { data } = await axios.post(`${backendUrl}/api/auth/login`, {email, password})
        if(data.success){
          setIsLoggedin(true);
          getUserData();
          navigate('/');
        }else{
          toast.error(data.message)
        }
      }
    }catch(err){
      console.log("Error on submmit: ". err)
      toast.error(err.message)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400">
      <img
        src={logo}
        alt="Logo"
        className="h-10 absolute left-5 top-5 sm:left-20 cursor-pointer"
        onClick={()=> navigate('/')}
      />
      <div className="bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm">
        <h2 className="text-3xl font-semibold text-white text-center mb-3">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </h2>
        <p className="text-center text-sm mb-8">
          {state === "Sign Up"
            ? "Create your account"
            : "Login to your account"}
        </p>
        <form onSubmit={onSubmitHandler}>
          {state == "Sign Up" && (
            <div className="mb-4 flex items-center gap-3 px-5 py-2.5 w-full rounded-full bg-[#333A5C]">
              <UserRound size="16" color="#ababab" />
              <input
                value={name}
                onChange={e=> setName(e.target.value)}
                type="text"
                placeholder="Full Name"
                required
                className="bg-transparent outline-none"
              />
            </div>
          )}

          <div className="mb-4 flex items-center gap-3 px-5 py-2.5 w-full rounded-full bg-[#333A5C]">
            <Mail size="16" color="#ababab" />
            <input
              value={email}
              onChange={e=> setEmail(e.target.value)}
              type="email"
              placeholder="Email"
              required
              className="bg-transparent outline-none"
            />
          </div>

          <div className="mb-4 flex items-center gap-3 px-5 py-2.5 w-full rounded-full bg-[#333A5C]">
            <Lock size="16" color="#ababab" />
            <input
              value={password}
              onChange={e=> setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              required
              className="bg-transparent outline-none"
            />
          </div>

          <p onClick={()=> navigate('/reset-password')} className="mb-4 text-indigo-500 cursor-pointer text-center">
            Forgot Password?
          </p>

          <button className="w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium">
            {state}
          </button>
        </form>

        {state == "Sign Up" ? (
          <p className="text-gray-400 text-xs text-center mt-4">
            Already have an account?{" "}
            <span onClick={()=> setState('Login')} className="text-blue-400 underline cursor-pointer">
              Login here
            </span>
          </p>
        ) : (
          <p className="text-gray-400 text-xs text-center mt-4">
            Don't have an account?{" "}
            <span onClick={()=> setState('Sign Up')} className="text-blue-400 underline cursor-pointer">
              Sign up
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
