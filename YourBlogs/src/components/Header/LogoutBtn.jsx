import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../features/AuthSlice";
import { useNavigate } from "react-router-dom";
import authServices from "../../Appwrite/appwriteAuth";

function LogoutBtn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setLoading(true);
      await authServices.logoutAccount();
      dispatch(logout());
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className={`px-5 py-2 text-sm font-medium text-white rounded-full transition-all duration-200 
        ${loading ? "bg-red-400 cursor-not-allowed" : "bg-red-500 hover:bg-red-600 active:scale-95"}
      `}
      aria-label="Logout Button"
    >
      {loading ? "Logging out..." : "Logout"}
    </button>
  );
}

export default LogoutBtn;
