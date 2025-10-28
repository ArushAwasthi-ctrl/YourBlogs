import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import postServices from "../Appwrite/appwriteDatabase";
import { PostForm, Container } from "../components/input";

function EditPost() {
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const { postId } = useParams();

  useEffect(() => {
    if (postId) {
      postServices.getPost(postId).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else {
      navigate("/");
    }
  }, [postId, navigate]);

  if (!post) {
    return (
      <div className="flex justify-center items-center min-h-[90vh] bg-linear-to-br from-gray-50 via-white to-gray-100 px-4">
        <p className="text-gray-500 text-lg font-medium animate-pulse">
          Loading post...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-[90vh] flex justify-center bg-linear-to-br from-gray-50 via-white to-gray-100 px-4 py-10">
      <Container>
        <div className="max-w-3xl mx-auto bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl shadow-lg p-8 md:p-10 transition-all duration-300">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
            Edit Post
          </h2>
          <PostForm post={post} />
        </div>
      </Container>
    </div>
  );
}

export default EditPost;
