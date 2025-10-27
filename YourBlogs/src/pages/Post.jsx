import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import postServices from "../Appwrite/appwriteDatabase";
import fileServices from "../Appwrite/appwriteFiles";
import { useSelector } from "react-redux";
import { Button } from "../components/input";

export default function Post() {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const [post, setPost] = useState(null);
  const { postId } = useParams();
  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (postId) {
      postServices.getPost(postId).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else navigate("/");
  }, [postId, navigate]);

  const deletePost = async () => {
    if (!post) return;
    const imageId = post.featuredImage || post.FeaturedImage;
    if (window.confirm("Are you sure you want to delete this post?")) {
      await postServices.deletePost(post.$id);
      if (imageId) await fileServices.deleteFile(imageId);
      navigate("/");
    }
  };

  if (!post)
    return (
      <div className="min-h-[90vh] flex items-center justify-center bg-linear-to-br from-gray-50 via-white to-gray-100">
        <div className="text-gray-500 text-lg font-medium animate-pulse">
          Loading post...
        </div>
      </div>
    );

  const imageId = post.featuredImage || post.FeaturedImage;
  const imageUrl = imageId ? fileServices.getFilePreview(imageId) : null;
   
  return (
    <div className="min-h-[90vh] flex justify-center bg-linear-to-br from-gray-50 via-white to-gray-100 px-4 py-10">
      <div className="w-full max-w-4xl bg-white/80 backdrop-blur-md border border-gray-200 shadow-lg rounded-2xl overflow-hidden">
        {/* Featured Image */}
        {imageUrl && (
          <img
            src={imageUrl}
            alt={post.title}
            className="w-full max-h-[450px] object-cover"
          />
        )}

        {/* Content */}
        <div className="p-8 md:p-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            {post.title}
          </h1>

          <p className="text-sm text-gray-500 mb-6">
            Posted on {new Date(post.$createdAt).toLocaleDateString()}{" "}
            {isAuthor && (
              <span className="ml-2 text-green-600 font-semibold">
                (You are the author)
              </span>
            )}
          </p>

          {/* Post content rendered safely */}
          <div
            className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.content }}
          ></div>

          {/* Buttons */}
          {isAuthor && (
            <div className="flex gap-4 mt-10">
              <Link
                to={`/edit-post/${post.$id}`}
                className="flex-1 text-center bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-medium transition-all duration-200"
              >
                Edit Post
              </Link>

              <Button
                onClick={deletePost}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2.5 rounded-lg font-medium transition-all duration-200"
              >
                Delete Post
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
