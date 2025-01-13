import React from "react";

const Footer = () => {
  return (
    <footer class="bg-black flex-center py-4 px-8">
      <div class=" container mx-auto text-white flex flex-col gap-8 lg:flex-row items-center justify-between">
        <h5 class="text-3xl font-black">Purnam</h5>
        <nav>
          <ul className="font-semibold flex flex-row gap-4">
            <li>
              <a href="#" className="text-white no-underline hover:opacity-80 transition-opacity">Support</a>
            </li>
            <li>
              <a href="#" className="text-white no-underline hover:opacity-80 transition-opacity">FAQ</a>
            </li>
            <li>
              <a href="#" className="text-white no-underline hover:opacity-80 transition-opacity">Terms of Use</a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
