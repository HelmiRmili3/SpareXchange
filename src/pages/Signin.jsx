import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../redux/auth/authSlice";
import { useNavigate } from "react-router-dom";

const SignInPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.auth);

  // State for email and password
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
      navigate("/account"); // Redirect to account page on success
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex flex-col flex-1 md:flex-row p-6 gap-6 justify-center items-center">
        <div className="w-full max-w-md bg-white shadow-md p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4 text-center">Sign In</h3>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
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
                className="w-full p-2 border border-gray-300 rounded-md"
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
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div className="flex justify-end mt-4">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                disabled={status === "loading"}
              >
                {status === "loading" ? "Signing in..." : "Sign In"}
              </button>
            </div>
          </form>

          <div className="mt-4 text-center">
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
