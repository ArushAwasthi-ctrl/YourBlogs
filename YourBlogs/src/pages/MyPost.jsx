import React, { useState, useEffect } from "react";
import { Container, PostCard } from "../components/input";
import postServices from "../Appwrite/appwriteDatabase";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function MyPost() {
  const userData = useSelector((state) => state.auth.userData);
  const isLoggedIn = useSelector((state) => state.auth.status);
  const userId = userData?.$id;
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      setPosts([]);
      setLoading(false);
      return;
    }

    if (!userId) {
      setLoading(true);
      return;
    }

    const fetchUserPosts = async () => {
      try {
        setLoading(true);
        const userPosts = await postServices.getPostsPerUser(userId);
        setPosts(Array.isArray(userPosts) ? userPosts : []);
      } catch (err) {
        console.error("Error fetching user posts:", err);
        setError("Failed to load your posts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserPosts();
  }, [isLoggedIn, userId]);

  // ✅ Loading state
  if (loading) {
    return (
      <div className="min-h-[90vh] flex items-center justify-center bg-linear-to-br from-gray-50 via-white to-gray-100">
        <p className="text-gray-500 text-lg font-medium animate-pulse">
          Loading your posts...
        </p>
      </div>
    );
  }

  // ✅ Error state
  if (error) {
    return (
      <div className="min-h-[90vh] flex items-center justify-center bg-linear-to-br from-gray-50 via-white to-gray-100">
        <p className="text-red-500 text-lg font-semibold bg-red-50 border border-red-200 px-4 py-3 rounded-lg shadow-sm">
          {error}
        </p>
      </div>
    );
  }

  // ✅ Main layout
  return (
    <div className="min-h-[90vh] bg-linear-to-br from-gray-50 via-white to-gray-100 px-4 py-10 flex justify-center">
      <div className="w-full max-w-6xl bg-white/80 backdrop-blur-lg rounded-2xl border border-gray-200 shadow-lg p-6 sm:p-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8 text-gray-800">
          My Posts
        </h1>

        {posts.length === 0 ? (
          <p className="text-center text-gray-500 text-base sm:text-lg">
            You haven’t created any posts yet.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {posts.map((post) => (
              <PostCard key={post.$id} {...post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyPost;
