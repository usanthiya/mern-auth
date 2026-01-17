import React from "react";
import logo from "../assets/logo.png";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  
  return (
    <div className="w-full flex justify-between items-center p-4 sm:p-6 sx:px-24 absolute top-0">
      <img src={logo} alt="Logo" className="h-10" />
      <button
        onClick={() => navigate("/login")}
        className="flex items-center gap-2 border border-gray-500 rounded-full px-6 py-2 text-gray-800 hover:bg-gray-100 transition-all"
      >
        Login <ArrowRight size={16} />
      </button>
    </div>
  );
};

export default Navbar;
