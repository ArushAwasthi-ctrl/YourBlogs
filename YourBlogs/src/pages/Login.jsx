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
    <div className="flex items-center justify-center min-h-[80vh] bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
        <div className="flex justify-center mb-4">
          <span className="inline-block w-full max-w-[90px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Welcome Back
        </h2>
        <p className="text-center text-gray-500 mt-2 mb-6">
          Login to your account to continue
        </p>
        {error && (
          <p className="text-red-600 text-center mb-4 font-medium">{error}</p>
        )}
        <form onSubmit={handleSubmit(submitLogin)} className="space-y-5">
          <Input
            label="Email"
            placeholder="Enter your email"
            type="email"
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
            className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-full py-2 text-lg font-semibold transition-all duration-200"
          >
            {btnText}
          </Button>
        </form>
        <p className="text-center text-gray-500 mt-6">
          Don’t have an account?
          <Link
            to="/signup"
            className="text-blue-600 font-semibold hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
