import React from "react";
import { Link } from "react-router-dom";
import fileServices from "../Appwrite/appwriteFiles";

function PostCard({ $id, title, featuredImage, FeaturedImage, createdAt, $createdAt, authorName }) {
  const imageId = featuredImage || FeaturedImage;
  const created = createdAt || $createdAt;
  return (
    <Link
      to={`/post/${$id}`}
      className="group block hover:scale-[1.02] transition-transform duration-300"
    >
      <div className="w-full card overflow-hidden hover:shadow-xl transition-all duration-300">
        {/* Featured Image */}
        {imageId ? (
          <img
            src={fileServices.getFilePreview(imageId)}
            alt={title}
            className="w-full h-52 object-cover rounded-t-2xl group-hover:opacity-95 transition-all duration-300"
          />
        ) : (
          <div
            className="w-full h-52 bg-linear-to-br from-gray-100 via-gray-200 to-gray-300 
          flex items-center justify-center text-gray-400 text-sm italic"
          >
            No image available
          </div>
        )}

        {/* Content */}
        <div className="p-5">
          <h2 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-gray-900 transition-colors duration-300">
            {title}
          </h2>

          {authorName && (
            <p className="text-sm text-gray-500 mb-2">
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
