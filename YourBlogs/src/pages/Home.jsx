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
      <div className="flex flex-col items-center justify-center h-[70vh] text-center">
        <p className="text-2xl font-semibold text-gray-700 mb-2">
          You must be logged in to view posts.
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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <div className="text-gray-500 text-lg font-medium animate-pulse">Loading posts...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-[70vh] text-red-600 font-medium">
        {error}
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="flex items-center justify-center h-[70vh] text-gray-500 text-lg font-medium">
        No posts yet. Start by creating your first post!
      </div>
    );
  }

  return (
    <div className="min-h-[90vh] bg-linear-to-br from-gray-50 via-white to-gray-100 px-6 py-10">
      <div className="max-w-6xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.$id} {...post} />
        ))}
      </div>
    </div>
  );
}
