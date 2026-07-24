"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "../context/CartContext";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, clearCart, subtotal, mounted } = useCart();

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 text-lg">
        Loading cart...
      </div>
    );
  }

  const shipping = items.length > 0 ? 15.0 : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-[95%] xl:max-w-7xl mx-auto px-4 sm:px-6 md:px-8">

        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <span className="text-gray-500 font-medium">{items.length} Item{items.length !== 1 ? "s" : ""}</span>
        </div>

        {items.length === 0 ? (
          /* Empty Cart State */
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-16 flex flex-col items-center justify-center text-center">
            <svg className="w-20 h-20 text-gray-200 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="9" cy="21" r="1" strokeWidth={1.5} />
              <circle cx="20" cy="21" r="1" strokeWidth={1.5} />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            <p className="text-xl font-semibold text-gray-500 mb-2">Your cart is empty</p>
            <p className="text-gray-400 mb-6">Looks like you haven't added anything yet.</p>
            <Link
              href="/"
              className="bg-[#1a56a8] hover:bg-[#154a90] text-white rounded-xl px-8 py-3 font-semibold transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">

            {/* Left: Cart Items List */}
            <div className="flex-1">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

                {/* Header row (desktop only) */}
                <div className="hidden md:grid grid-cols-12 gap-4 p-6 border-b border-gray-100 text-sm font-semibold text-gray-500 bg-gray-50/50">
                  <div className="col-span-6">Product Details</div>
                  <div className="col-span-3 text-center">Quantity</div>
                  <div className="col-span-2 text-right">Price</div>
                  <div className="col-span-1 text-right">Remove</div>
                </div>

                {/* Items */}
                <div className="flex flex-col">
                  {items.map((item) => (
                    <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 p-6 border-b border-gray-100 items-center">

                      {/* Product Info */}
                      <div className="col-span-1 md:col-span-6 flex items-center gap-4">
                        <div className="relative w-24 h-24 bg-gray-50 rounded-lg flex-shrink-0 border border-gray-100 p-2">
                          <Image src={item.image} alt={item.title} fill className="object-contain p-2" />
                        </div>
                        <div className="flex flex-col">
                          <Link href={`/product/${item.slug}`} className="font-bold text-lg text-gray-900 hover:text-[#1a56a8] transition-colors">
                            {item.title}
                          </Link>
                          <span className="text-sm text-gray-500 mt-1">{item.category}</span>
                          <span className="text-[#1a56a8] font-semibold text-sm mt-2 md:hidden">${item.price}</span>
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="col-span-1 md:col-span-3 flex items-center md:justify-center mt-4 md:mt-0">
                        <div className="flex items-center border border-gray-200 rounded-lg bg-white h-10 w-28">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="flex-1 flex justify-center items-center text-gray-500 hover:text-[#1a56a8] hover:bg-gray-50 h-full rounded-l-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" /></svg>
                          </button>
                          <span className="text-gray-900 font-semibold text-sm w-8 text-center select-none">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="flex-1 flex justify-center items-center text-gray-500 hover:text-[#1a56a8] hover:bg-gray-50 h-full rounded-r-lg transition-colors"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                          </button>
                        </div>
                      </div>

                      {/* Total Price */}
                      <div className="hidden md:block col-span-2 text-right">
                        <span className="font-bold text-lg text-gray-900">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>

                      {/* Remove Action */}
                      <div className="absolute right-6 mt-4 md:mt-0 md:relative md:right-auto md:col-span-1 text-right">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-red-50"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                      </div>

                    </div>
                  ))}
                </div>

                <div className="p-6 bg-gray-50/50 flex justify-between items-center">
                  <Link href="/" className="text-[#1a56a8] font-medium hover:underline flex items-center gap-2 text-sm">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                    Continue Shopping
                  </Link>
                  <button
                    onClick={clearCart}
                    className="text-red-500 hover:text-red-600 font-medium text-sm hover:underline transition-colors"
                  >
                    Clear Cart
                  </button>
                </div>

              </div>
            </div>

            {/* Right: Order Summary */}
            <div className="w-full lg:w-96 flex-shrink-0">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

                <div className="flex flex-col gap-4 text-gray-600 mb-6">
                  <div className="flex justify-between items-center">
                    <span>Subtotal</span>
                    <span className="font-medium text-gray-900">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Shipping</span>
                    <span className="font-medium text-gray-900">${shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Tax (8%)</span>
                    <span className="font-medium text-gray-900">${tax.toFixed(2)}</span>
                  </div>
                </div>

                <hr className="border-gray-100 mb-6" />

                <div className="flex justify-between items-center mb-8">
                  <span className="text-lg font-bold text-gray-900">Total</span>
                  <span className="text-2xl font-bold text-[#1a56a8]">${total.toFixed(2)}</span>
                </div>

                <button className="w-full bg-[#1a56a8] hover:bg-[#154a90] text-white rounded-xl py-4 font-bold text-lg shadow-md shadow-[#1a56a8]/20 transition-all active:scale-95 mb-4">
                  Proceed to Checkout
                </button>

                <p className="text-xs text-center text-gray-500">
                  Secure checkout powered by Stripe.
                </p>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
