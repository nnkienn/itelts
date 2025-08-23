"use client";
import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa"; // avatar fallback

const PrivateNavbar: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full bg-white shadow-sm flex items-center justify-between px-6 py-3">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <img src="/logo.png" alt="Logo" className="h-7" />
        <span className="font-bold text-green-700 text-lg">QuillBot Clone</span>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {/* Upgrade button */}
        <button className="bg-green-600 text-white px-4 py-1 rounded-full font-semibold hover:bg-green-700 transition">
          Upgrade to Premium
        </button>

        {/* Avatar dropdown */}
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="w-9 h-9 rounded-full overflow-hidden border-2 border-gray-200"
          >
            <FaUserCircle className="w-full h-full text-gray-500" />
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border text-sm z-50">
              <div className="px-4 py-2 border-b">
                <p className="font-medium">kientrungng.2002@gmail.com</p>
              </div>
              <ul className="py-2">
                <li className="px-4 py-2 hover:bg-gray-50 cursor-pointer">
                  Account details
                </li>
                <li className="px-4 py-2 hover:bg-gray-50 cursor-pointer flex justify-between items-center">
                  English <span>›</span>
                </li>
                <li className="px-4 py-2 hover:bg-gray-50 cursor-pointer flex justify-between items-center">
                  Dark mode
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-green-600"></div>
                  </label>
                </li>
                <li className="px-4 py-2 hover:bg-gray-50 cursor-pointer">
                  Help Center
                </li>
                <li className="px-4 py-2 hover:bg-gray-50 cursor-pointer">
                  Contact us
                </li>
              </ul>
              <div className="px-4 py-2 border-t hover:bg-gray-50 cursor-pointer">
                Log out
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default PrivateNavbar;
