import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";  // Import useNavigate
import { sendPasswordResetEmail } from "firebase/auth";  
import { auth } from "../config/firebase";  

const ForgetPassword = () => {
  const [email, setEmail] = useState("");  // State for email
  const [error, setError] = useState("");  // State for error messages
  const [successMessage, setSuccessMessage] = useState("");  // State for success messages
  
  const navigate = useNavigate();  // Initialize the navigate hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");  // Clear previous errors
    setSuccessMessage("");  // Clear previous success messages

    try {
      // Send password reset email
      await sendPasswordResetEmail(auth, email);
      setSuccessMessage("Password reset email sent! Check your inbox.");

      // Redirect to the sign-in page after success
      setTimeout(() => {
        navigate("/signin");  // Navigate to the sign-in page after 2 seconds
      }, 2000);  // Wait for 2 seconds before redirecting to allow the success message to show
    } catch (err) {
      setError("Error: " + err.message);  // Handle errors (e.g., invalid email)
    }
  };

  return (
    <div>
      <div className="bg-black flex justify-center items-center min-h-screen">
        <div className="mx-auto bg-white rounded-2xl max-w-md p-8 shadow-lg">
          <Link className="flex items-center" to={'/signin'}>
            <img src="/images/back.svg" alt="" />
            <span className="text-sm text-[#6366f1] underline decoration-[#6366f1]">
              Back
            </span>
          </Link>
          <div className="mt-4 mb-6">
            <h1 className="font-bold text-3xl text-center text-[#6366f1] mb-2">
              Forgot Your Password?
            </h1>
          </div>
          <form
            className="contents"
            onSubmit={handleSubmit}  // Use handleSubmit to handle form submission
          >
            {/* Error and success message display */}
            {error && (
              <p className="text-red-500 text-center mt-2">{error}</p>
            )}
            {successMessage && (
              <p className="text-green-500 text-center mt-2">{successMessage}</p>
            )}
            
            {/* Email input field */}
            <div className="my-5 relative">
              <img
                src="/images/email.svg"
                alt=""
                className="absolute left-2 top-1/2 -translate-y-1/2"
              />
              <input
                required="required"
                placeholder="Email Address"
                className="pl-10 block shadow rounded-md border border-gray-400 outline-none px-3 py-2 mt-2 w-full focus:border-[#6366f1]"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}  // Update email state on change
              />
            </div>
            <input
              type="submit"
              value="Email Reset Instructions"
              className="bg-[#6366f1] text-white rounded-lg py-2 px-3.5 font-medium cursor-pointer w-full mt-8"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;