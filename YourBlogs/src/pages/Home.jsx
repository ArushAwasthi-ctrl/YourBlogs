import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import postServices from "../Appwrite/appwriteDatabase";
import authServices from "../Appwrite/appwriteAuth";
import { Link } from "react-router-dom";
function Home() {
  const [User, setUser] = useState(null);
  const [Posts, setPosts] = useState([]);
  const currentUser = useSelector((state) => state.auth.status);
  useEffect(() => {
    if (currentUser) {
      authServices.getCurrentUser().then((user) => {
        setUser(user);
        if (user) {
          postServices.getActivePosts().then((posts) => setPosts(posts));
        }
      });
    } else {
      setUser(null);
      setPosts([]);
    }
  }, [currentUser]);

  if (!User) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-center">
        <p className="text-2xl font-semibold text-gray-700 mb-2">
          You must be logged in to view this page.
        </p>
        <Link
          to="/login"
          className="text-white bg-blue-600 hover:bg-blue-700 font-medium px-5 py-2 rounded-md transition-all duration-200"
        >
          Log In
        </Link>
      </div>
    );
  }

  if (User && Posts.length === 0) {
    return (
      <div className="grow w-full justify-center items-center">
        No Posts Yet
      </div>
    );
  }

  return (
    <div className="grow w-full">
      {/* render posts or other UI when user is available */}
    </div>
  );
}

export default Home;
