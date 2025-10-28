import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import postServices from "../Appwrite/appwriteDatabase";
import { Link } from "react-router-dom";
import { PostCard } from "../components/input";

export default function Home() {
  const isLoggedIn = useSelector((state) => state.auth.status);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoggedIn) {
      setPosts([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    postServices
      .getAllPosts()
      .then((docs) => setPosts(Array.isArray(docs) ? docs : []))
      .catch((err) => {
        console.error("Error fetching posts:", err);
        setError("Something went wrong while loading posts.");
      })
      .finally(() => setLoading(false));
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] bg-linear-to-br from-gray-50 via-white to-gray-100 px-6 text-center">
        <p className="text-2xl font-semibold text-gray-700 mb-3">
          You must be logged in to view posts.
        </p>
        <Link
          to="/login"
          className="px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-all duration-200 shadow-md"
        >
          Log In
        </Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[80vh] bg-linear-to-br from-gray-50 via-white to-gray-100">
        <p className="text-gray-500 text-lg font-medium animate-pulse">
          Loading posts...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[80vh] text-red-600 font-medium bg-linear-to-br from-gray-50 via-white to-gray-100">
        {error}
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] bg-linear-to-br from-gray-50 via-white to-gray-100 px-6 text-center">
        <p className="text-gray-600 text-lg font-medium mb-2">
          No posts yet.
        </p>
        <Link
          to="/add-post"
          className="px-6 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition-all duration-200 shadow-md"
        >
          Create Your First Post
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-[90vh] bg-linear-to-br from-gray-50 via-white to-gray-100 px-5 py-10">
      <div className="max-w-7xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 transition-all duration-300">
        {posts.map((post) => (
          <PostCard key={post.$id} {...post} />
        ))}
      </div>
    </div>
  );
}
