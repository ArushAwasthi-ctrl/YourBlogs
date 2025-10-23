import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import authServices from "./Appwrite/appwriteAuth";
import { login, logout } from "./features/AuthSlice";
function App() {
  const [Loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    authServices
      .getCurrentUser()
      .then((userData) => {
        if (userData) dispatch(login({ userData }));
        else dispatch(logout());
      })
      .finally(() => setLoading(false));
  }, []);


 return !Loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
       Hello
      </div>
    </div>
  ) : <div>Loading ...</div>
}

export default App;
