import React from "react";

const Footer = () => {
  return (
    <div className="bg-[#7281ff] py-3">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between py-4 px-6 gap-10">
          <h1 className="text-3xl font-black text-white">Purnam</h1>
          <div>
            <ul>
              <li className="flex flex-row gap-3">
                <a className=" text-white rounded-lg py-2 px-3.5 inline-block font-medium cursor-pointer ">
                  Support
                </a>
                <a className=" text-white rounded-lg py-2 px-3.5 inline-block font-medium cursor-pointer ">
                  FAQ
                </a>
                <a className=" text-white rounded-lg py-2 px-3.5 inline-block font-medium cursor-pointer text-nowrap">
                  Terms Of Use
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
