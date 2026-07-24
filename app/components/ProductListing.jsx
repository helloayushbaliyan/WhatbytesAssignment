"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import ProductCard from "./ProductCard";
import { products } from "../data/products";

const ALL_CATEGORIES = ["All", ...new Set(products.map((p) => p.category))];

export default function ProductListing() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Read URL params
  const category = searchParams.get("category") || "all";
  const maxPrice = parseInt(searchParams.get("price") || "1000");
  const search = searchParams.get("search") || "";

  // Update a single URL param, keeping the rest intact
  const updateParam = useCallback(
    (key, value) => {
      const params = new URLSearchParams(searchParams.toString());
      const isDefault =
        !value ||
        value === "all" ||
        (key === "price" && parseInt(value) >= 1000);
      if (isDefault) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
      const qs = params.toString();
      router.push(qs ? `/?${qs}` : "/");
    },
    [searchParams, router]
  );

  // Filter products by category, price, and search
  const filtered = products.filter((p) => {
    const matchCat =
      category === "all" ||
      p.category.toLowerCase() === category.toLowerCase();
    const matchPrice = p.price <= maxPrice;
    const matchSearch =
      !search ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchPrice && matchSearch;
  });

  const standardProducts = filtered.filter((p) => !p.featured);
  const featuredProduct = filtered.find((p) => p.featured);

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-[95%] mx-auto px-4 sm:px-6 md:px-8 py-6">
        <div className="flex flex-col md:flex-row gap-[3rem]">

          {/* ===== SIDEBAR ===== */}
          <aside className="w-full md:w-60 lg:w-64 flex-shrink-0">
            <div className="rounded-2xl bg-[#1a56a8] overflow-hidden shadow-md p-5 flex flex-col gap-6">
              <h2 className="text-white font-bold text-xl">Filters</h2>

              {/* Search */}
              <div>
                <p className="text-white font-bold text-base mb-3">Search</p>
                <input
                  id="search-input"
                  type="text"
                  value={search}
                  onChange={(e) => updateParam("search", e.target.value)}
                  placeholder="Search products..."
                  className="w-full px-3 py-2 rounded-lg bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:border-white text-sm"
                />
              </div>

              {/* Category */}
              <div>
                <p className="text-white font-bold text-base mb-3">Category</p>
                <div className="flex flex-col gap-2">
                  {ALL_CATEGORIES.map((cat) => {
                    const value = cat.toLowerCase();
                    const isChecked = category === value;
                    return (
                      <label
                        key={cat}
                        className="flex items-center gap-3 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="category"
                          id={`cat-${value}`}
                          checked={isChecked}
                          onChange={() => updateParam("category", value)}
                          className="appearance-none w-5 h-5 rounded-full border-2 border-white/60 checked:bg-white checked:border-white cursor-pointer flex-shrink-0"
                        />
                        <span className="text-white/90 text-base">{cat}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Price Slider */}
              <div>
                <p className="text-white font-bold text-base mb-3">
                  Max Price:{" "}
                  <span className="font-extrabold">${maxPrice}</span>
                </p>
                <input
                  id="price-range"
                  type="range"
                  min={0}
                  max={1000}
                  value={maxPrice}
                  onChange={(e) => updateParam("price", e.target.value)}
                  className="w-full accent-white cursor-pointer"
                />
                <div className="flex justify-between text-sm text-white mt-2">
                  <span>$0</span>
                  <span>$1000</span>
                </div>
              </div>

              {/* Reset */}
              <button
                id="reset-filters"
                onClick={() => router.push("/")}
                className="text-white/80 text-sm hover:text-white underline text-left transition-colors"
              >
                Reset Filters
              </button>
            </div>
          </aside>

          {/* ===== PRODUCT LISTING ===== */}
          <main className="flex-1">
            <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
              <h1 className="text-3xl md:text-3xl xl:text-4xl font-bold text-gray-900">
                Product Listing
              </h1>
              {filtered.length > 0 && (
                <span className="text-sm text-gray-500 font-medium">
                  {filtered.length} product{filtered.length !== 1 ? "s" : ""} found
                </span>
              )}
            </div>

            {/* No products found */}
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <svg
                  className="w-16 h-16 text-gray-300 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <p className="text-xl font-semibold text-gray-500">
                  No products found
                </p>
                <p className="text-gray-400 mt-1">
                  Try adjusting your filters or search term
                </p>
                <button
                  id="clear-filters"
                  onClick={() => router.push("/")}
                  className="mt-4 text-[#1a56a8] hover:underline text-sm font-medium"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[3rem]">
                {standardProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}

                {/* Featured Card */}
                {featuredProduct && (
                  <Link
                    href={`/product/${featuredProduct.slug}`}
                    className="col-span-1 sm:col-span-2 bg-white rounded-xl shadow-sm overflow-hidden flex flex-col sm:flex-row group hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-200"
                  >
                    <div className="relative w-full sm:w-56 h-56 sm:h-auto bg-gray-50 flex-shrink-0">
                      <Image
                        src={featuredProduct.image}
                        alt={featuredProduct.title}
                        fill
                        className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="px-5 py-4 flex flex-col gap-2 flex-1">
                      <h3 className="font-bold text-xl text-gray-900 group-hover:text-[#1a56a8] transition-colors">
                        {featuredProduct.title}
                      </h3>
                      <p className="text-gray-900 font-bold text-lg">
                        ${featuredProduct.price}
                      </p>
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            viewBox="0 0 24 24"
                            className={`w-5 h-5 ${i < Math.floor(featuredProduct.rating)
                              ? "fill-yellow-400 text-yellow-400"
                              : "fill-gray-200 text-gray-200"
                              }`}
                          >
                            <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
                        {featuredProduct.description}
                      </p>
                      <p className="text-gray-500 text-sm font-semibold mt-auto pt-2 capitalize">
                        Category: {featuredProduct.category}
                      </p>
                      <button className="mt-2 w-full bg-[#1a56a8] hover:bg-[#154a90] text-white rounded-md py-2.5 text-sm font-semibold cursor-pointer transition-colors active:scale-95">
                        Add to Cart
                      </button>
                    </div>
                  </Link>
                )}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
