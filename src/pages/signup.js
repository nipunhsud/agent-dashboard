import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { auth, createUserWithEmailAndPassword } from "../config/firebase";


const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();


  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError(""); 
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("User registered:", userCredential.user);
      alert("Sign Up Successful!");
      navigate('/signin');
    } catch (err) {
      console.error("Error during sign up:", err.message);
      setError(err.message); 
    }
  };

  return (
    <div>
      <div className="bg-gradient-to-tr from-[#818cf8] to-[#312e81] flex justify-center items-center min-h-screen">
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
            {error && (
              <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
