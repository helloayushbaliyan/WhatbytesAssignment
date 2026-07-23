"use client";

import { useState } from "react";

export default function Navbar() {
  const [search, setSearch] = useState("");

  return (
    <nav className="w-full bg-[#1a56a8] flex items-center justify-between gap-6 px-10 py-4">

      {/* Logo */}
      <span className="text-white text-[44px] font-bold tracking-tight whitespace-nowrap select-none">
        Logo
      </span>

      {/* Search Bar */}
      <div className="flex gap-6 items-center justify-end flex-1">
        <div className="relative flex-1 max-w-[480px]">
          {/* Search Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#9ca3af"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="absolute left-[14px] top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for products..."
            className="w-full rounded-2xl  border-2 border-gray-300 outline-none py-[15px] pl-10 pr-5 text-lg text-gray-300 placeholder-gray-200 transition-colors"
          />
        </div>

        <button className="bg-[#0d2b52] hover:bg-[#0a2244] transition-colors text-white rounded-lg px-10 py-[15px] text-lg font-semibold flex items-center gap-2 whitespace-nowrap cursor-pointer">
          {/* Cart / Shopping Cart Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-[17px] h-[17px]"
          >
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
          Cart
        </button>
      </div>

      {/* Cart Button */}


    </nav>
  );
}
