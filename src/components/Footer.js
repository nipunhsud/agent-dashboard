import React from "react";

const Footer = () => {
  return (
    <footer class="bg-black flex-center py-4 px-8">
      <div class=" container mx-auto text-white flex flex-col gap-8 lg:flex-row items-center justify-between">
        <h5 class="text-3xl font-black">Purnam</h5>
        <nav>
          <ul class="font-semibold flex flex-row gap-4">
            <li>
              <a href="#">Support</a>
            </li>
            <li>
              <a href="#">FAQ</a>
            </li>
            <li>
              <a href="#">Terms of Use</a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
