import React, { useState } from "react";
import authServices from "../Appwrite/appwriteAuth";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Logo, Input, Button } from "../components/input";
import { useForm } from "react-hook-form";
import { login } from "../features/AuthSlice";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [btnText, setbtnText] = useState("Login");
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();

  const submitLogin = async (data) => {
    setError("");
    setbtnText("Loading...");

    try {
      const user = await authServices.loginAccount(data);

      if (!user) {
        setError("Invalid credentials, please try again.");
        setbtnText("Login");
        return;
      }

      const userData = await authServices.getCurrentUser();
      if (userData) {
        dispatch(login(userData));
        navigate("/");
      } else {
        setError("Failed to fetch user data.");
        setbtnText("Login");
      }
    } catch (err) {
      const errorMessage = err?.message || "Something went wrong. Try again.";
      setError(errorMessage);
      setbtnText("Login");
    }
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center bg-linear-to-br from-gray-50 via-white to-gray-100 px-4">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-md border border-gray-200 shadow-lg rounded-2xl p-8 md:p-10 transition-all duration-300">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <span className="inline-block w-20 sm:w-24">
            <Logo />
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800">
          Welcome Back
        </h2>
        <p className="mt-2 text-center text-gray-600 text-sm md:text-base">
          Login to your account to continue
        </p>

        {/* Error */}
        {error && (
          <p className="text-red-500 text-center mt-4 bg-red-50 py-2 rounded-md border border-red-200">
            {error}
          </p>
        )}

        {/* Form */}
        <form
          onSubmit={handleSubmit(submitLogin)}
          className="mt-6 space-y-5 text-sm md:text-base"
        >
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
            })}
          />

          <Button
            type="submit"
            className={`w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg text-lg font-medium transition-all duration-200 ${
              btnText === "Loading..." ? "cursor-not-allowed opacity-70" : ""
            }`}
            disabled={btnText === "Loading..."}
          >
            {btnText}
          </Button>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-600 mt-6 text-sm md:text-base">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-600 font-semibold hover:underline hover:text-blue-700 transition-colors"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
