import React, { useState } from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };
  return (
    <div>
      <div class="bg-gradient-to-tr from-[#818cf8] to-[#312e81] flex justify-center items-center min-h-screen">
        <div class="mx-auto bg-white rounded-2xl max-w-md p-8 shadow-lg">
          <a class="flex items-center" href="/">
            <img src="/images/back.svg" alt="" />
            <span class="text-sm text-[#6366f1] underline decoration-[#6366f1]">
              Back
            </span>
          </a>
          <div class="mt-4 mb-6">
            <h1 class="font-bold text-3xl text-center text-[#6366f1] mb-2">
              Sign Up
            </h1>
            <h4 class="text-gray-600 text-center">
              Sign Up today and use our AI agents!
            </h4>
          </div>
          <form
            class="contents"
            action=""
            accept-charset="UTF-8"
            method="post"
          >
            <input
              type="hidden"
              name=""
              value=""
              autocomplete="off"
            />

            <div class="my-5 relative">
              <input
                required="required"
                autofocus="autofocus"
                autocomplete="username"
                placeholder="Email Address"
                class="block shadow rounded-md border border-gray-400 outline-none px-3 py-2 mt-2 w-full focus:border-[#6366f1]"
                type="email"
                name=""
                id=""
              />
            </div>

            <div class="my-5">
              <div class="relative" data-controller="password-toggle">
                <input
                  required="required"
                  autocomplete="current-password"
                  placeholder="Password"
                  maxlength="72"
                  class="pr-12 block shadow rounded-md border border-gray-400 outline-none px-3 py-2 mt-2 w-full focus:border-[#6366f1]"
                  data-password-toggle-target="passwordField"
                  size="72"
                  type={showPassword ? "text" : "password"}
                  name=""
                  id=""
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

            <div class="my-5">
              <input
                class="block shadow rounded-md border border-gray-400 outline-none px-3 py-2 mt-2 w-full focus:border-[#6366f1]"
                placeholder="First Name"
                type="text"
                name=""
                id=""
              />
            </div>

            <div class="my-5">
              <input
                class="block shadow rounded-md border border-gray-400 outline-none px-3 py-2 mt-2 w-full focus:border-[#6366f1]"
                placeholder="Last Name"
                type="text"
                name=""
                id=""
              />
            </div>

            <input
              type="submit"
              name="commit"
              value="Sign Up"
              class="bg-[#6366f1] text-white rounded-lg py-2 px-3.5 font-medium cursor-pointer w-full mt-8"
              data-disable-with="Sign Up"
            />
            <Link
              class="border-2 border-[#6366f1] text-[#6366f1] block text-center mt-2.5 rounded-lg py-2 px-3.5 font-medium cursor-pointer w-full"
              to={"/signin"}
            >
              Sign In
            </Link>
          </form>{" "}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
