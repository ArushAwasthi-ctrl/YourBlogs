import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import postServices from "../../Appwrite/appwriteDatabase";
import fileServices from "../../Appwrite/appwriteFiles";
import { Input, Button, TinyMCE } from "../input";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

export default function CreatePost({ post }) {
  const { postId } = useParams();
  const { register, handleSubmit, watch, setValue, control, reset } = useForm({
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

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value.trim().toLowerCase().replace(/[^a-zA-Z\d\s]+/g, "-").replace(/\s/g, "-");
    return "";
  }, []);

  useEffect(() => {
    if (post) {
      reset({
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        featuredImage: post?.FeaturedImage || post?.featuredImage || "",
      });
    }
  }, [post, reset]);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "image" && value.image?.[0]) {
        const file = value.image[0];
        setPreviewImage(URL.createObjectURL(file));
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const submit = async (data) => {
    if (!user) {
      setError("You must be logged in to create or edit a post.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      let featuredImageId = post?.FeaturedImage || post?.featuredImage || null;
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

      const targetId = postId || post?.$id;
      const dbPost = targetId
        ? await postServices.updatePost(targetId, postData)
        : await postServices.createPost(postData);

      if (dbPost) navigate(`/post/${dbPost.$id}`);
      else setError("Failed to save post. Try again.");
    } catch (err) {
      setError(err?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const existingImageId = post?.FeaturedImage || post?.featuredImage;
  const existingImageUrl = existingImageId ? fileServices.getFilePreview(existingImageId) : null;

  return (
    <section className="min-h-[90vh] flex items-center justify-center bg-linear-to-br from-sky-50 via-violet-50 to-pink-50 px-3 sm:px-6 py-8">
      <div className="w-full max-w-3xl bg-white/80 backdrop-blur-md border border-gray-200 shadow-xl rounded-2xl p-6 sm:p-10 transition-all duration-300">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-3 gradient-text">
          {post ? "Edit Post" : "Create a New Post"}
        </h2>
        <p className="text-center text-gray-600 text-sm mb-6">
          {post
            ? "Update your post details below."
            : "Write your thoughts and share them with the world."}
        </p>

        {error && (
          <p className="text-red-600 text-center mb-5 bg-red-50 py-2 rounded-lg border border-red-200 text-sm font-medium">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit(submit)} className="space-y-5 sm:space-y-6">
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
              setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true })
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
                className="rounded-xl shadow-md w-full max-h-64 object-cover"
              />
            </div>
          )}

          <Button
            type="submit"
            className={`w-full ${
              post
                ? "bg-green-600 hover:bg-green-700 focus:ring-green-400"
                : "bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-400"
            } text-white py-2.5 rounded-lg text-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              loading ? "cursor-not-allowed opacity-70" : ""
            }`}
            disabled={loading}
          >
            {loading
              ? post
                ? "Updating..."
                : "Publishing..."
              : post
              ? "Update Post"
              : "Publish Post"}
          </Button>
        </form>
      </div>
    </section>
  );
}
