"use client";

import { useState } from "react";
import { useCart } from "../context/CartContext";

export default function ProductActions({ product }) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const decrease = () => setQuantity((q) => Math.max(1, q - 1));
  const increase = () => setQuantity((q) => q + 1);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setQuantity(1);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-8">
      {/* Quantity Selector */}
      <div className="flex items-center border-2 border-gray-200 rounded-xl bg-white h-14 w-full sm:w-36 flex-shrink-0">
        <button
          onClick={decrease}
          className="flex-1 flex justify-center items-center text-gray-500 hover:text-[#1a56a8] hover:bg-gray-50 h-full rounded-l-xl transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
          </svg>
        </button>
        <span className="text-gray-900 font-semibold text-lg w-10 text-center select-none">{quantity}</span>
        <button
          onClick={increase}
          className="flex-1 flex justify-center items-center text-gray-500 hover:text-[#1a56a8] hover:bg-gray-50 h-full rounded-r-xl transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        className="flex-1 bg-[#1a56a8] hover:bg-[#154a90] text-white h-14 rounded-xl font-bold text-lg shadow-md shadow-[#1a56a8]/20 flex justify-center items-center gap-2 transition-all active:scale-[0.98]"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>
        Add to Cart
      </button>
    </div>
  );
}
