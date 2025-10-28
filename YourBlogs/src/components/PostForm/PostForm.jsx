import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import postServices from "../../Appwrite/appwriteDatabase";
import fileServices from "../../Appwrite/appwriteFiles";
import { Input, Button, TinyMCE } from "../input";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function CreatePost({ post }) {
  const { register, handleSubmit, watch, setValue, control } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.slug || "",
      content: post?.content || "",
      featuredImage: post?.FeaturedImage || post?.featuredImage || "",
    },
  });

  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.userData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [previewImage, setPreviewImage] = useState(null);

  // Convert title → slug
  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");
    return "";
  }, []);

  // Auto slug updates
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  // Image preview updates
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "image" && value.image?.[0]) {
        const file = value.image[0];
        setPreviewImage(URL.createObjectURL(file));
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  // ✅ Submit handler (Handles both Create and Edit)
  const submit = async (data) => {
    if (!user) {
      setError("You must be logged in to create or edit a post.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      let featuredImageId = post?.FeaturedImage || post?.featuredImage || null;

      // Upload new image only if user selected one
      if (data.image && data.image[0]) {
        const file = await fileServices.createFile(data.image[0]);
        if (file) featuredImageId = file.$id;
      }

      const postData = {
        title: data.title,
        slug: data.slug || slugTransform(data.title),
        content: data.content,
        featuredImage: featuredImageId,
        userId: user?.$id,
      };

      let dbPost;

      if (post && post.$id) {
        // ✅ Update existing post
        dbPost = await postServices.updatePost(post.$id, postData);
      } else {
        // ✅ Create new post
        dbPost = await postServices.createPost(postData);
      }

      if (dbPost) navigate(`/post/${dbPost.$id}`);
      else setError("Failed to save post. Try again.");
    } catch (err) {
      setError(err?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  // Prepare existing image URL when editing
  const existingImageId = post?.FeaturedImage || post?.featuredImage;
  const existingImageUrl = existingImageId
    ? fileServices.getFilePreview(existingImageId)
    : null;

  return (
    <div className="min-h-[90vh] flex items-center justify-center bg-linear-to-br from-gray-50 via-white to-gray-100 px-4">
      <div className="w-full max-w-3xl bg-white/80 backdrop-blur-md border border-gray-200 shadow-lg rounded-2xl p-8 md:p-10 transition-all duration-300">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-3">
          {post ? "Edit Post" : "Create a New Post"}
        </h2>
        <p className="text-center text-gray-600 text-sm mb-6">
          {post
            ? "Update your existing post below."
            : "Share your thoughts with the community."}
        </p>

        {error && (
          <p className="text-red-500 text-center mt-2 mb-4 bg-red-50 py-2 rounded-md border border-red-200">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit(submit)} className="space-y-5">
          <Input
            label="Title"
            placeholder="Enter post title"
            {...register("title", { required: "Title is required" })}
          />

          <Input
            label="Slug"
            placeholder="Auto-generated from title"
            {...register("slug", { required: "Slug is required" })}
            onInput={(e) =>
              setValue("slug", slugTransform(e.currentTarget.value), {
                shouldValidate: true,
              })
            }
          />

          <TinyMCE
            name="content"
            control={control}
            label="Post Content"
            defaultValue={post?.content || ""}
          />

          <Input
            label="Featured Image"
            type="file"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("image", { required: !post })}
          />

          {(previewImage || existingImageUrl) && (
            <div className="w-full mt-3">
              <img
                src={previewImage || existingImageUrl}
                alt="Preview"
                className="rounded-lg shadow-md w-full max-h-64 object-cover"
              />
            </div>
          )}

          <Button
            type="submit"
            className={`w-full ${
              post
                ? "bg-green-600 hover:bg-green-700"
                : "bg-blue-600 hover:bg-blue-700"
            } text-white py-2.5 rounded-lg text-lg font-medium transition-all duration-200 ${
              loading ? "cursor-not-allowed opacity-70" : ""
            }`}
            disabled={loading}
          >
            {loading
              ? post
                ? "Updating..."
                : "Creating..."
              : post
              ? "Update Post"
              : "Publish Post"}
          </Button>
        </form>
      </div>
    </div>
  );
}
