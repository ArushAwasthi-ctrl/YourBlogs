import React, { useState } from "react";
import authServices from "../Appwrite/appwriteAuth";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Logo, Input, Button } from "../components/input";
import { useForm } from "react-hook-form";
import { login } from "../features/AuthSlice";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [btnText, setBtnText] = useState("Create Account");
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm();

  const create = async (data) => {
    setError("");
    setLoading(true);
    try {
      const userData = await authServices.createAccount(data);
      if (!userData) {
        setError("Failed to create account. Try again.");
        setLoading(false);
        return;
      }
      const currentUser = await authServices.getCurrentUser();
      if (currentUser) {
        dispatch(login(currentUser));
        navigate("/");
      } else {
        setError("Failed to fetch user data.");
        setLoading(false);
      }
    } catch (err) {
      const errorMessage =
        err?.message ||
        err?.response?.message ||
        "Something went wrong. Try again.";
      setError(errorMessage);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center bg-linear-to-br from-gray-50 via-white to-gray-100 px-4">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-md border border-gray-200 shadow-lg rounded-2xl p-8 md:p-10 transition-all duration-300">
        <div className="flex justify-center mb-6">
          <span className="inline-block w-20">
            <Logo />
          </span>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800">
          Create Your Account
        </h2>
        <p className="mt-2 text-center text-gray-600 text-sm">
          Already have an account?
          <Link
            to="/login"
            className="text-blue-600 font-medium hover:underline hover:text-blue-700 transition-colors"
          >
            Sign In
          </Link>
        </p>
        {error && (
          <p className="text-red-500 text-center mt-4 bg-red-50 py-2 rounded-md border border-red-200">
            {error}
          </p>
        )}
        <form onSubmit={handleSubmit(create)} className="mt-6 space-y-5">
          <Input
            label="Full Name"
            placeholder="Enter your full name"
            {...register("name", { required: "Full name is required" })}
          />
          <Input
            label="Email Address"
            type="email"
            placeholder="Enter your email"
            {...register("email", {
              required: "Email is required",
              validate: {
                matchPattern: (value) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                  "Enter a valid email address",
              },
            })}
          />
          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Minimum 6 characters required" },
            })}
          />
          <Button
            type="submit"
            className={`w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg text-lg font-medium transition-all duration-200 ${
              loading ? "cursor-not-allowed opacity-70" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Account"}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
