import React, { useState } from "react";
import { Link } from "react-router-dom";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };
  return (
    <>
      <div class="bg-gradient-to-tr from-[#818cf8] to-[#312e81] flex justify-center items-center min-h-screen">
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

          <form
            class="contents"
            action=""
            accept-charset="UTF-8"
            method="post"
          >
            <input type="hidden" name="" value="" autocomplete="off" />
            <div class="my-5 relative">
              <img
                src="/images/email.svg"
                alt=""
                className="absolute left-2 top-1/2 -translate-y-1/2"
              />
              <input
                required="required"
                autofocus="autofocus"
                autocomplete="username"
                placeholder="Email Address"
                class="pl-10 block shadow rounded-md border border-gray-400 outline-none px-3 py-2 mt-2 w-full focus:border-[#6366f1]"
                type="email"
                name="email_address"
                id="email_address"
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
                <img
                  src="/images/lock.svg"
                  alt="Lock Icon"
                  className="w-6 h-6 absolute left-2 top-1/2 -translate-y-1/2"
                />
              </div>
              <Link
                className="mt-1 text-gray-700 block underline text-right"
                to={"/forgetpassword"}
              >
                Forgot Password?
              </Link>
            </div>

            <input
              type="submit"
              name="commit"
              value="Sign In"
              class="bg-[#6366f1] text-white rounded-lg py-2 px-3.5 font-medium cursor-pointer w-full mt-8"
            />
            <Link
              class="border-2 border-[#6366f1] text-[#6366f1] block text-center mt-2.5 rounded-lg py-2 px-3.5 font-medium cursor-pointer w-full"
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
