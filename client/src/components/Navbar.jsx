import React from "react";
import logo from "../assets/logo.png";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();
  const { userData, backendUrl, setIsLoggedin, setUserData } = useContext(AppContext);
  
  const logout = async() => {
    axios.defaults.allowCredentials = true; 

    try{
      const { data } = await axios.post(`${backendUrl}/api/auth/logout`);
      if(data.success){
        setIsLoggedin(false);
        setUserData(null);
      }else{
        toast.error(data.message);
      }
    }catch(err){
      toast.error(err.message);
    }
  }

  const sendVerificationOtp = async() => {
    axios.defaults.allowCredentials = true; 

    try{
      const { data } = await axios.post(`${backendUrl}/api/auth/send-verify-otp`);
      if(data.success){
        toast.success(data.message)
        navigate('/email-verify');
      }else{
        toast.error(data.message);
      }
    }catch(err){
      console.log("Error in send verification otp: ", err)
      toast.error(err.message);
    }
  }

  return (
    <div className="w-full flex justify-between items-center p-4 sm:p-6 sx:px-24 absolute top-0">
      <img src={logo} alt="Logo" className="h-10" />
      {userData ? (
        <div className="h-8 w-8 flex items-center justify-center rounded-full bg-black text-white relative group cursor-pointer">
          {userData.name[0].toUpperCase()}
          <div className="absolute hidden group-hover:block top-0 right-0 z-10 rounded text-black pt-10">
            <ul className="list-none m-0 p-2 bg-gray-100 text-sm">
              {!userData.isAccountVerified && 
                <li onClick={sendVerificationOtp} className="py-1 px-2 hover:bg-gray-200">Verify Email</li>
              }
              <li onClick={()=> logout()}className="py-1 px-2 hover:bg-gray-200 pr-10">Logout</li>
            </ul>
          </div>
        </div>
      ) : (
        <button
          onClick={() => navigate("/login")}
          className="flex items-center gap-2 border border-gray-500 rounded-full px-6 py-2 text-gray-800 hover:bg-gray-100 transition-all"
        >
          Login <ArrowRight size={16} />
        </button>
      )}
    </div>
  );
};

export default Navbar;
