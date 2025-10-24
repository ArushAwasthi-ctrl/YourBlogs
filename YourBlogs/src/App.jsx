import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import authServices from "./Appwrite/appwriteAuth";
import { login, logout } from "./features/AuthSlice";
import { Header , Footer} from "./components/input";
import { Outlet } from "react-router-dom";
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
  }, [dispatch]);

  return !Loading ? (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <Outlet />
      <Footer/>
    </div>
  ) : (
    <div className="flex items-center justify-center h-screen">
  <div className="animate-pulse space-y-4 text-gray-400">
    <div className="h-6 w-40 bg-gray-300 rounded"></div>
    <div className="h-6 w-56 bg-gray-300 rounded"></div>
  </div>
</div>
  );
}

export default App;
