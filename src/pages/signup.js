import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../config/firebase";


const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState(false);
  const navigate = useNavigate();


  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError(""); 
    setSuccessMessage(false);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(userCredential.user);
      setSuccessMessage(true);
      
      setTimeout(() => {
        navigate("/stocks");
      }, 3000);
    } catch (err) {
      console.error("Error during sign up:", err.message);
      setError(err.message); 
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      setSuccessMessage(true);
      setTimeout(() => {
        navigate('/stocks');
      }, 1500);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <div className="bg-black flex justify-center items-center min-h-screen">
        <div className="mx-auto bg-white rounded-2xl max-w-md p-8 shadow-lg">
          <a className="flex items-center" href="/">
            <img src="/images/back.svg" alt="" />
            <span className="text-sm text-[#6366f1] underline decoration-[#6366f1]">
              Back
            </span>
          </a>
          <div className="mt-4 mb-6">
            <h1 className="font-bold text-3xl text-center text-[#6366f1] mb-2">
              Sign Up
            </h1>
            <h4 className="text-gray-600 text-center">
              Sign Up today and use our AI agents!
            </h4>
          </div>
          <form className="contents" onSubmit={handleSignUp}>
            {successMessage && (
              <div className="bg-[#6366f1]/10 border border-[#6366f1] text-[#6366f1] px-4 py-4 rounded-lg flex flex-col items-center justify-center">
                <p className="text-sm font-medium mb-2">Sign up successful!</p>
                <p className="text-sm font-medium mb-0">Please check your email to verify your account.</p>
              </div>
            )}
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <div className="my-5 relative">
              <input
                required
                autoFocus
                autoComplete="username"
                placeholder="Email Address"
                className="block shadow rounded-md border border-gray-400 outline-none px-3 py-2 mt-2 w-full focus:border-[#6366f1]"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="my-5">
              <div className="relative">
                <input
                  required
                  autoComplete="current-password"
                  placeholder="Password"
                  maxLength="72"
                  className="pr-12 block shadow rounded-md border border-gray-400 outline-none px-3 py-2 mt-2 w-full focus:border-[#6366f1]"
                  size="72"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  className="absolute right-2.5 top-1/2 -translate-y-1/2"
                  type="button"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <img
                      src="/images/hidepass.svg"
                      alt="Hide Password"
                      className="w-6 h-6"
                    />
                  ) : (
                    <img
                      src="/images/showpass.svg"
                      alt="Show Password"
                      className="w-6 h-6"
                    />
                  )}
                </button>
              </div>
            </div>
{/* 
            <div className="my-5">
              <input
                className="block shadow rounded-md border border-gray-400 outline-none px-3 py-2 mt-2 w-full focus:border-[#6366f1]"
                placeholder="First Name"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div> */}

            {/* <div className="my-5">
              <input
                className="block shadow rounded-md border border-gray-400 outline-none px-3 py-2 mt-2 w-full focus:border-[#6366f1]"
                placeholder="Last Name"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div> */}

            <button
              type="submit"
              className="bg-[#6366f1] text-white rounded-lg py-2 px-3.5 font-medium cursor-pointer w-full mt-8"
            >
              Sign Up
            </button>
            <Link
              className="border-2 border-[#6366f1] text-[#6366f1] block text-center mt-2.5 rounded-lg py-2 px-3.5 font-medium cursor-pointer w-full"
              to={"/signin"}
            >
              Sign In
            </Link>
            {/*Google*/}
            <button
              type="button"
              onClick={handleGoogleSignUp}
              className="flex items-center justify-center gap-2 border border-gray-300 text-gray-700 rounded-lg py-2 px-3.5 font-medium cursor-pointer w-full mt-2.5 hover:bg-gray-50"
            >
              <img src="/images/google.svg" alt="Google" className="w-5 h-5" />
              Sign up with Google
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
