import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { auth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "../config/firebase"; 


const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState(""); 
  const [error, setError] = useState(""); 
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();


  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); 
    setSuccessMessage("");

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setSuccessMessage("Sign in successful!");
      setTimeout(() => {
        navigate('/stocks');
      }, 1500);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      setSuccessMessage("Sign in successful!");
      setTimeout(() => {
        navigate('/stocks');
      }, 1500);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <div class="bg-black flex justify-center items-center min-h-screen">
        <div class="mx-auto bg-white rounded-2xl max-w-md p-8 shadow-lg">
          <Link class="flex items-center" to={"/"}>
            <img src="/images/back.svg" alt="" />
            <span class="text-sm text-[#6366f1] underline decoration-[#6366f1]">
              Back
            </span>
          </Link>
          <div class="mt-4 mb-6">
            <h1 class="font-bold text-3xl text-center text-[#6366f1] mb-2">
              Sign In
            </h1>
            <h4 class="text-gray-600 text-center">Book your AI Agent Today!</h4>
          </div>

          <form class="contents" onSubmit={handleSubmit}>
            {successMessage && (
                <div className="bg-[#6366f1]/10 border border-[#6366f1] text-[#6366f1] px-4 py-4 rounded-lg flex items-center justify-center">
                  <p className="text-sm font-medium mb-0">Your sign in was succesful!.</p>
                </div>
            )}
            <input type="hidden" name="" value="" autocomplete="off" />
            <div class="my-5 relative">
              <input
                required="required"
                autofocus="autofocus"
                autocomplete="username"
                placeholder="Email Address"
                class="pl-10 block shadow rounded-md border border-gray-400 outline-none px-3 py-2 mt-2 w-full focus:border-[#6366f1]"
                type="email"
                name="email_address"
                id="email_address"
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
                  className="pl-10 pr-12 block shadow rounded-md border border-gray-400 outline-none px-3 py-2 mt-2 w-full focus:border-[#6366f1]"
                  size="72"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
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
              <Link
                className="mt-1 text-gray-700 block underline text-right"
                to={"/forgetpassword"}
              >
                Forgot Password?
              </Link>
            </div>

            {error && (
              <p className="text-red-500 text-center mt-2">{error}</p> 
            )}

            <input
              type="submit"
              name="commit"
              value="Sign In"
              className="bg-[#6366f1] text-white rounded-lg py-2 px-3.5 font-medium cursor-pointer w-full mt-8"
            />
            <Link
              className="border-2 border-[#6366f1] text-[#6366f1] block text-center mt-2.5 rounded-lg py-2 px-3.5 font-medium cursor-pointer w-full"
              to={"/signup"}
            >
              Sign Up
            </Link>
            {/*Google*/}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="flex items-center justify-center gap-2 border border-gray-300 text-gray-700 rounded-lg py-2 px-3.5 font-medium cursor-pointer w-full mt-2.5 hover:bg-gray-50"
            >
              <img 
                src="/images/google.svg"
                alt="Google" 
                className="w-5 h-5" 
              />
              Sign in with Google
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignIn;
