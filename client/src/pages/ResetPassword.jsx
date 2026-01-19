import React, { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { Mail, Lock } from "lucide-react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from 'react-toastify';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [newPassword, setNewPassword] = useState();
  const [isEmailSent, setIsEmailSent] = useState();
  const [otp, setOtp] = useState();
  const [isOtpSubmitted, setIsOtpSubmitted] = useState();

  axios.defaults.withCredentials = true;

  const inputRefs = useRef([]);
  const { backendUrl } = useContext(AppContext);

  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && e.target.value === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text");
    const pasteArray = paste.split("");

    pasteArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });
  };

  const onSubmitEmail = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/auth/send-reset-otp`,
        { email },
      );
      if (data.success) {
        toast.success(data.message);
        setIsEmailSent(true);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const onSubmitOtp = async (e) => {
    e.preventDefault();
    const OtpArray = inputRefs.current.map(e=> e.value);
    const otp = OtpArray.join('');
    setOtp(otp);
    setIsOtpSubmitted(true); 
  };

  const resetPassword = async(e) => {
    e.preventDefault();
    try{
      const payload={
        email, otp, newPassword
      }
      const { data } = await axios.post(`${backendUrl}/api/auth/reset-password`, payload);
      if(data.success){
        toast.success(data.message);
        navigate('/login');
      }else{
        toast.error(data.message);
      }
    }catch(err){
      toast.error(err.message);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400">
      <img
        src={logo}
        alt="Logo"
        className="h-10 absolute left-5 top-5 sm:left-20 cursor-pointer"
        onClick={() => navigate("/")}
      />
      {/* Email id input form */}
      {!isEmailSent && (
        <form onSubmit={onSubmitEmail} className="bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm">
          <h1 className="text-2xl font-semibold text-white text-center mb-4">
            Reset password
          </h1>
          <p className="text-center mb-8 text-sm text-indigo-300">
            Enter your registered email address
          </p>
          <div className="mb-8 flex items-center w-full py-2.5 px-5 gap-2 rounded-full bg-[#333A5C]">
            <Mail size="16" color="#ababab" />
            <input
              type="email"
              placeholder="Email Id"
              className="bg-transparent outline-none text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button className="w-full px-5 py-2.5 text-white font-medium rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900">
            Submit
          </button>
        </form>
      )}

      {/* OTP Input form */}
      {isEmailSent && !isOtpSubmitted && (
        <form
          onSubmit={onSubmitOtp}
          className="bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm"
        >
          <h1 className="text-2xl font-semibold text-white text-center mb-4">
            Reset password OTP
          </h1>
          <p className="text-center mb-6 text-sm text-indigo-300">
            Enter the 6-digit code sent to your email
          </p>
          <div className="mb-8 flex justify-between" onPaste={handlePaste}>
            {Array(6)
              .fill(0)
              .map((_, index) => (
                <input
                  type="text"
                  maxLength="1" // Allow only one digit per input
                  key={index}
                  required
                  className="w-12 h-12 bg-[#333A5C] text-white text-center text-xl rounded-md"
                  ref={(e) => (inputRefs.current[index] = e)} // Store each input reference in array
                  onInput={(e) => handleInput(e, index)} // Move focus forward on input
                  onKeyDown={(e) => handleKeyDown(e, index)} // Handle backspace navigation
                />
              ))}
          </div>
          <button className="w-full py-4 bg-gradient-to-r from-indigo-500 to-indigo-900 rounded-full text-white font-semibold">
            Submit
          </button>
        </form>
      )}

      {/* Enter New Password */}
      {isEmailSent && isOtpSubmitted && (
        <form onSubmit={resetPassword} className="bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm">
          <h1 className="text-2xl font-semibold text-white text-center mb-4">
            New password
          </h1>
          <p className="text-center mb-8 text-sm text-indigo-300">
            Enter the new password below
          </p>
          <div className="mb-8 flex items-center w-full py-2.5 px-5 gap-2 rounded-full bg-[#333A5C]">
            <Lock size="16" color="#ababab" />
            <input
              type="password"
              placeholder="Password"
              className="bg-transparent outline-none text-white"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <button className="w-full px-5 py-2.5 text-white font-medium rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900">
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default ResetPassword;
