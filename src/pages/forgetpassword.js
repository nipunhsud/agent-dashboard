import React from "react";
import { Link } from "react-router-dom";

const Forgetpassword = () => {
  return (
    <div>
      <div class="bg-gradient-to-tr from-[#818cf8] to-[#312e81] flex justify-center items-center min-h-screen">
        <div class="mx-auto bg-white rounded-2xl max-w-md p-8 shadow-lg">
          <Link class="flex items-center" to={'/signin'}>
            <img src="/images/back.svg" alt="" />
            <span class="text-sm text-[#6366f1] underline decoration-[#6366f1]">
              Back
            </span>
          </Link>
          <div class="mt-4 mb-6">
            <h1 class="font-bold text-3xl text-center text-[#6366f1] mb-2">
              Forgot Your Password?
            </h1>
          </div>
          <form
            class="contents"
            action=""
            accept-charset="UTF-8"
            method="post"
          >
            <input
              type="hidden"
              name="authenticity_token"
              value="DRNVThxa2V3kMSDqen-3iMwahNbZrjp4iCxwJXZvkz91AKWLDLlGuFCc9XRGZqxeDozH71bbqK6hZrJixoozQA"
              autocomplete="off"
            />
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
            <input
              type="submit"
              name="commit"
              value="Email Reset Instructions"
              class="bg-[#6366f1] text-white rounded-lg py-2 px-3.5 font-medium cursor-pointer w-full mt-8"
              data-disable-with="Email Reset Instructions"
            />
          </form>{" "}
        </div>
      </div>
    </div>
  );
};

export default Forgetpassword;
