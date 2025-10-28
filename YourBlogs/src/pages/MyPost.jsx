import React, { useState, useEffect } from "react";
import { Container, PostCard } from "../components/input";
import postServices from "../Appwrite/appwriteDatabase";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function MyPost() {
  const userData = useSelector((state) => state.auth.userData);
  const isLoggedIn = useSelector((state) => state.auth.status);
  const userId = userData?.$id; // Appwrite user id is `$id`
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
      // Logged-in state present but user details not hydrated yet
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

  // ✅ Conditional rendering
  if (loading) {
    return (
      <Container>
        <p className="text-center text-gray-400 my-10 animate-pulse">
          Loading your posts...
        </p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <p className="text-center text-red-500 my-10 font-medium">{error}</p>
      </Container>
    );
  }

  return (
    <Container>
      <h1 className="text-2xl font-semibold text-center my-6 text-white">
        My Posts
      </h1>

      {posts.length === 0 ? (
        <p className="text-center text-gray-400">
          You haven't created any posts yet.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.$id} {...post} />
          ))}
        </div>
      )}
    </Container>
  );
}

export default MyPost;
