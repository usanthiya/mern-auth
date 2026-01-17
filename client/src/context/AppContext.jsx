import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  let backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState();

  const getAuthState = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/auth/is-auth`);
      if (data.success) {
        setIsLoggedin(true);
        getUserData();
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(()=>{
    getAuthState();
  },[])

  const getUserData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/data`);
      data.success ? setUserData(data.userData) : toast.error(data.message);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const value = {
    backendUrl,
    isLoggedin,
    setIsLoggedin,
    userData,
    setUserData,
    getUserData,
    getAuthState
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
