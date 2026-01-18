import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const EmailVerify = () => {
  const navigate = useNavigate();
  const inputRefs = useRef([]);

  const handleInput = (e, index) => {
    // Check if a value is entered and ensure it's not the last input box
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus(); // Move focus to next OTP input
    }
  };

  const handleKeyDown = (e, index) => {
    // Check if Backspace key is pressed, move backward if the current input is already empty and Prevents going before the first input
    if (e.key === "Backspace" && e.target.value === "" && index > 0) {
      inputRefs.current[index - 1].focus(); // Move focus to previous OTP input
    }
  };

  const handlePaste = (e) => {
    // Get the pasted text from the clipboard (e.g. "123456")
    const paste = e.clipboardData.getData("text");
    const pasteArray = paste.split("");  // Convert the pasted string into an array of individual characters

    pasteArray.forEach((char, index) => {
      // Check if the OTP input exists at this index
      // This prevents errors if pasted text is longer than OTP length
      if (inputRefs.current[index]) {
        // Assign each character to its corresponding OTP input box
        inputRefs.current[index].value = char;
      }
    });

  };

  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400">
      <img
        src={logo}
        alt="Logo"
        className="h-10 absolute left-5 top-5 sm:left-20 cursor-pointer"
        onClick={() => navigate("/")}
      />
      <form className="bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm">
        <h1 className="text-2xl font-semibold text-white text-center mb-4">
          Email Verify OTP
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
          Verify email
        </button>
      </form>
    </div>
  );
};

export default EmailVerify;
