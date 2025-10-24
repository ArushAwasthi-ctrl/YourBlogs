import React from "react";
import authServices from "../../Appwrite/appwriteAuth";
import { useDispatch } from "react-redux";
import { logout } from "../../features/AuthSlice";

function LogoutBtn() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    authServices.logoutAccount().then(() => dispatch(logout()));
  };

  return (
    <button
      onClick={handleLogout}
      className="px-5 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-full transition-all duration-200"
    >
      Logout
    </button>
  );
}

export default LogoutBtn;
