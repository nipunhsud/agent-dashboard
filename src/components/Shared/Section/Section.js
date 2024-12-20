import React from "react";

const Section = ({ name, title, subtitle, children }) => {
  return (
    <section className="flex items-center flex-col mt-36 container mx-auto text-center mb-36">
      {name && (
        <p className="uppercase text-gray-400 tracking-wider">{name}</p>
      )}

      {title && (
        <h4 className="font-black mt-6 xl:mt-10 mb-2.5 xl:mb-4 text-2xl xl:text-4xl text-gray-700 mx-2.5 text-center text-balance">
          {title}
        </h4>
      )}

      {subtitle && (
        <p className="text-gray-500 text-xl xl:text-2xl">
          {subtitle}
        </p>
      )}

      <div className="mt-8">{children}</div>
    </section>
  );
};

export default Section;
