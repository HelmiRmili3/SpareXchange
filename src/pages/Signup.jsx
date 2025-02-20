import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux"; // Import Redux hooks
import { signUp } from "../redux/auth/authSlice"; // Import the signUp action
import { useNavigate } from "react-router-dom"; // For navigation after sign-up

const SignUpPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State for form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Access Redux state for loading and error
  const { status, error } = useSelector((state) => state.auth);

  // Handle form field changes
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Dispatch the signUp action
    try {
      await dispatch(
        signUp({
          email: formData.email,
          password: formData.password,
          name: formData.name,
        })
      ).unwrap(); // unwrap() ensures the promise is handled correctly

      // Redirect to the home page or account page after successful sign-up
      navigate("/");
    } catch (err) {
      // Error is already handled by the authSlice
      console.error("Sign Up Failed:", err);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Main Content: Sign-Up Section */}
      <div className="flex flex-col flex-1 md:flex-row p-6 gap-6 justify-center items-center">
        {/* Centered Sign-Up Form */}
        <div className="w-full max-w-md bg-white shadow-md p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4 text-center">Sign Up</h3>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-md mb-4">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Input */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-semibold mb-2"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            {/* Email Input */}
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

            {/* Password Input */}
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

            {/* Confirm Password Input */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-semibold mb-2"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleFormChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end mt-4">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:bg-blue-300"
                disabled={status === "loading"} // Disable button while loading
              >
                {status === "loading" ? "Signing Up..." : "Sign Up"}
              </button>
            </div>
          </form>

          {/* Already have an account? */}
          <div className="mt-4 text-center">
            <p className="text-sm">
              Already have an account?{" "}
              <a href="/login" className="text-blue-500 hover:underline">
                Sign In
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
