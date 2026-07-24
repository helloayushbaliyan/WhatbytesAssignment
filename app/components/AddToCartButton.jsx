"use client";

import { useCart } from "../context/CartContext";

export default function AddToCartButton({ product, className, children }) {
  const { addToCart } = useCart();

  const handleClick = (e) => {
    e.preventDefault(); // Prevent Link navigation when inside a Link
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <button onClick={handleClick} className={className}>
      {children || "Add to Cart"}
    </button>
  );
}
