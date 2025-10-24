import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import authServices from "./Appwrite/appwriteAuth";
import { login, logout } from "./features/AuthSlice";
import { Header } from "./components/input";
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
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="grow w-full">Hello</main>
    </div>
  ) : (
    <div className="flex items-center justify-center h-screen text-xl font-semibold text-gray-600">
      Loading...
    </div>
  );
}

export default App;
