import React, { useEffect, useState } from "react";
import authServices from "../../Appwrite/appwriteAuth";
import { useDispatch } from "react-redux";
import { logout } from "../../features/AuthSlice";
import { useNavigate } from "react-router-dom";

function LogoutBtn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(false);
  }, []);
  const handleLogout = () => {
    setLoading(true);
    authServices.logoutAccount().then(() => dispatch(logout()));
    navigate("/");
  };

  return (
    <button
      onClick={handleLogout}
      className="px-5 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-full transition-all duration-200"
    >
      {loading ? "Loading..." : "Logout"}
    </button>
  );
}

export default LogoutBtn;
