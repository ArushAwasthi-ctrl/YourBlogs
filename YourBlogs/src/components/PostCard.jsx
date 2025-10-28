import React from "react";
import { Link } from "react-router-dom";
import fileServices from "../Appwrite/appwriteFiles";

function PostCard({ $id, title, featuredImage, FeaturedImage, createdAt, $createdAt, authorName }) {
  const imageId = featuredImage || FeaturedImage;
  const created = createdAt || $createdAt;

  return (
    <Link
      to={`/post/${$id}`}
      className="group block transform hover:scale-[1.02] transition-transform duration-300"
    >
      <div className="card bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300">
        {imageId ? (
          <img
            src={fileServices.getFilePreview(imageId)}
            alt={title}
            className="w-full h-48 sm:h-52 md:h-56 object-cover rounded-t-2xl group-hover:opacity-95 transition-all duration-300"
          />
        ) : (
          <div className="w-full h-48 sm:h-52 md:h-56 flex items-center justify-center bg-linear-to-br from-gray-100 via-gray-200 to-gray-300 text-gray-400 text-sm italic">
            No image available
          </div>
        )}

        <div className="p-4 sm:p-5">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
            {title}
          </h2>

          {authorName && (
            <p className="text-sm text-gray-500 mb-1">
              by <span className="font-medium text-gray-700">{authorName}</span>
            </p>
          )}

          {created && (
            <p className="text-xs text-gray-400">
              {new Date(created).toLocaleDateString()}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
