// export default SignInPage;
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  signIn,
  signInWithGoogle,
  signInWithFacebook,
} from "../redux/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

const SignInPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Handle form field change
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(signIn(formData));
    if (result.meta.requestStatus === "fulfilled") {
      navigate("/");
    }
  };

  // Google sign-in
  const handleGoogleSignIn = async () => {
    const result = await dispatch(signInWithGoogle());
    if (result.meta.requestStatus === "fulfilled") {
      navigate("/");
    }
  };

  // Facebook sign-in
  const handleFacebookSignIn = async () => {
    const result = await dispatch(signInWithFacebook());
    if (result.meta.requestStatus === "fulfilled") {
      navigate("/");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex flex-col flex-1 md:flex-row p-6 gap-6 justify-center items-center">
        <div className="w-full max-w-md bg-white shadow-md p-8 rounded-lg">
          <h3 className="text-2xl font-bold mb-6 text-center text-gray-700">
            Sign In
          </h3>

          {error && (
            <p className="text-red-500 text-sm text-center mb-4">{error}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleFormChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleFormChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
              disabled={status === "loading"}
            >
              {status === "loading" ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="my-6 text-center text-sm text-gray-500">OR</div>

          <div className="flex flex-col gap-3">
            <button
              onClick={handleGoogleSignIn}
              className="flex items-center justify-center w-full bg-white border border-gray-300 rounded-md py-2 hover:shadow-md transition duration-200"
            >
              <FcGoogle className="mr-2 text-xl" />
              Sign in with Google
            </button>

            <button
              onClick={handleFacebookSignIn}
              className="flex items-center justify-center w-full bg-blue-600 text-white rounded-md py-2 hover:bg-blue-700 transition duration-200"
            >
              <FaFacebook className="mr-2 text-xl" />
              Sign in with Facebook
            </button>
          </div>

          <div className="mt-6 text-center">
            <a
              href="/forgot-password"
              className="text-sm text-blue-500 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
