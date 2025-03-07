import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { auth, signInWithEmailAndPassword } from "../config/firebase"; 

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

  return (
    <>
      <div className="bg-[#f5f5f7] flex justify-center items-center min-h-screen">
        <div className="mx-auto bg-white rounded-[12px] max-w-md p-8 shadow-md transform transition-transform duration-300 hover:-translate-y-1">
          <Link className="flex items-center" to={"/"}>
            <img src="/images/back.svg" alt="" />
            <span className="text-sm text-[#0C0B0B] underline decoration-[#0C0B0B]">
              Back
            </span>
          </Link>
          <div className="mt-4 mb-6">
            <h1 className="font-bold text-3xl text-center text-[#0C0B0B] mb-2">
              Sign In
            </h1>
          </div>

          <form className="contents" onSubmit={handleSubmit}>
            {successMessage && (
                <div className="bg-[#22c55e]/10 border border-[#22c55e] text-[#22c55e] px-4 py-4 rounded-lg flex items-center justify-center">
                  <p className="text-sm font-medium mb-0">Your sign in was successful!</p>
                </div>
            )}
            <input type="hidden" name="" value="" autoComplete="off" />
            <div className="my-5 relative">
              <input
                required="required"
                autoFocus="autofocus"
                autoComplete="username"
                placeholder="Email Address"
                className="pl-10 block shadow rounded-md border border-gray-400 outline-none px-3 py-2 mt-2 w-full focus:border-[#0C0B0B]"
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
                  className="pl-10 pr-12 block shadow rounded-md border border-gray-400 outline-none px-3 py-2 mt-2 w-full focus:border-[#0C0B0B]"
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
              className="bg-[#0C0B0B] text-white rounded-[8px] py-2 px-3.5 font-bold cursor-pointer w-full mt-8 hover:bg-opacity-80 transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
            />
            <Link
              className="border-2 border-[#0C0B0B] text-[#0C0B0B] block text-center mt-2.5 rounded-[8px] py-2 px-3.5 font-bold cursor-pointer w-full hover:bg-[#0C0B0B] hover:text-white transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
              to={"/signup"}
            >
              Sign Up
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignIn;

