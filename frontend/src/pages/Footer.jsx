import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
// import { SiIimjobs, SiHirist, SiJobstreet } from "react-icons/si";

const Footer = () => {
  return (
    <footer className="bg-[#fff]  mt-10 ">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between gap-10">
          {/* Left - Naukri Logo + Links */}
          <div>
            <h1 className="text-3xl font-semibold text-[#117a5b] mb-4">jobSpot</h1>
            <ul className="text-gray-600 text-sm space-y-2">
              <li className="hover:text-black cursor-pointer">About us</li>
              <li className="hover:text-black cursor-pointer">Careers</li>
              <li className="hover:text-black cursor-pointer">Employer home</li>
              <li className="hover:text-black cursor-pointer">Sitemap</li>
              <li className="hover:text-black cursor-pointer">Credits</li>
            </ul>
          </div>

          {/* Middle Links */}
          <div>
            <ul className="text-gray-600 text-sm space-y-2 mt-8 md:mt-0">
              <li className="hover:text-black cursor-pointer">Help center</li>
              <li className="hover:text-black cursor-pointer">Summons/Notices</li>
              <li className="hover:text-black cursor-pointer">Grievances</li>
              <li className="hover:text-black cursor-pointer">Report issue</li>
            </ul>
          </div>

          {/* Right Links */}
          <div>
            <ul className="text-gray-600 text-sm space-y-2 mt-8 md:mt-0">
              <li className="hover:text-black cursor-pointer">Privacy policy</li>
              <li className="hover:text-black cursor-pointer">Terms & conditions</li>
              <li className="hover:text-black cursor-pointer">Fraud alert</li>
              <li className="hover:text-black cursor-pointer">Trust & safety</li>
            </ul>
          </div>

          {/* App Section */}
          <div className="text-sm text-gray-700">
            <p className="font-medium mb-2">Apply on the go</p>
            <p className="mb-3">Get real-time job updates on our App</p>
            <div className="flex gap-3">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="Google Play"
                className="h-10 cursor-pointer"
              />
              <img
                src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                alt="App Store"
                className="h-10 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <p>© 2025 Info Edge (India) Ltd. All rights reserved</p>
          </div>

          <div className="flex items-center gap-5">
            <span className="font-medium text-gray-700">Our businesses</span>
            {/* <div className="flex gap-4 items-center text-[#0073e6]">
              <SiIimjobs className="text-2xl" title="iimjobs" />
              <SiHirist className="text-2xl" title="Hirist" />
              <SiJobstreet className="text-2xl" title="Job Hai" />
            </div> */}
          </div>
        </div>

        {/* Social Icons */}
        <div className="mt-6 flex gap-4 justify-center text-gray-600 text-xl">
          <FaFacebookF className="hover:text-[#0073e6] cursor-pointer" />
          <FaInstagram className="hover:text-[#E4405F] cursor-pointer" />
          <FaXTwitter className="hover:text-black cursor-pointer" />
          <FaLinkedinIn className="hover:text-[#0077B5] cursor-pointer" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
