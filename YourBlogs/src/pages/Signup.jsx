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
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm();

  const create = async (data) => {
    setError("");
    setLoading(true);
    try {
      const created = await authServices.createAccount({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      if (!created) {
        setError("Failed to create account. Please try again.");
        setLoading(false);
        return;
      }

      const user = await authServices.loginAccount({
        email: data.email,
        password: data.password,
      });

      if (user) {
        const currentUser = await authServices.getCurrentUser();
        if (currentUser) {
          dispatch(login(currentUser));
          navigate("/");
        } else {
          setError("Failed to fetch user data after login.");
        }
      } else {
        setError("Login failed right after signup. Please try logging in.");
      }
    } catch (err) {
      const errorMessage =
        err?.message ||
        err?.response?.message ||
        err?.response?.data?.message ||
        "Something went wrong. Try again.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center bg-linear-to-br from-sky-100 via-white to-indigo-100 px-4 sm:px-6 py-10">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-lg border border-gray-200 shadow-xl rounded-2xl p-8 sm:p-10 transition-all duration-300">
        <div className="flex justify-center mb-6">
          <span className="inline-block w-24 sm:w-28">
            <Logo />
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800">
          Create Your Account
        </h2>

        <p className="mt-2 text-center text-gray-600 text-sm sm:text-base">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-sky-600 font-semibold hover:underline hover:text-sky-700 transition-colors"
          >
            Sign In
          </Link>
        </p>

        {error && (
          <p className="text-red-600 text-center mt-4 bg-red-50 py-2 rounded-md border border-red-200 text-sm sm:text-base">
            {error}
          </p>
        )}

        <form
          onSubmit={handleSubmit(create)}
          className="mt-6 space-y-5 sm:space-y-6"
        >
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
            disabled={loading}
            className={`w-full bg-sky-600 hover:bg-sky-700 text-white py-2.5 sm:py-3 rounded-xl text-base sm:text-lg font-semibold shadow-md transition-all duration-200 ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Creating..." : "Create Account"}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
