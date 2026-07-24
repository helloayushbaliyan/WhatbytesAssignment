"use client";

import { useCallback } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { totalItems, mounted } = useCart();

  const search = searchParams.get("search") || "";

  const handleSearch = useCallback(
    (value) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set("search", value);
      } else {
        params.delete("search");
      }
      const qs = params.toString();
      router.push(qs ? `/?${qs}` : "/");
    },
    [searchParams, router]
  );

  return (
    <nav className="w-full bg-[#1a56a8] flex items-center justify-between gap-3 sm:gap-6 px-4 sm:px-6 md:px-10 py-3 sm:py-4 flex-wrap">

      {/* Logo */}
      <Link href="/" className="text-white text-2xl sm:text-3xl md:text-[44px] font-bold tracking-tight whitespace-nowrap select-none hover:text-gray-200 transition-colors">
        Logo
      </Link>

      {/* Search Bar */}
      <div className="flex gap-3 sm:gap-6 items-center justify-end flex-1 min-w-0">
        <div className="relative flex-1 max-w-[480px] min-w-0">
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
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search for products..."
            className="w-full rounded-2xl border-2 border-gray-300 outline-none py-2.5 sm:py-[15px] pl-10 pr-5 text-sm sm:text-lg text-gray-300 placeholder-gray-200 transition-colors"
          />
        </div>

        <Link href="/cart" className="relative bg-[#0d2b52] hover:bg-[#0a2244] transition-colors text-white rounded-lg px-4 sm:px-10 py-2.5 sm:py-[15px] text-sm sm:text-lg font-semibold flex items-center gap-2 whitespace-nowrap cursor-pointer flex-shrink-0">
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
          {/* Badge */}
          {mounted && totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center animate-bounce">
              {totalItems > 99 ? "99+" : totalItems}
            </span>
          )}
        </Link>
      </div>

    </nav>
  );
}
