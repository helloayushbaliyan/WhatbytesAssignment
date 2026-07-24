import Image from "next/image";
import Link from "next/link";
import ProductCard from "./components/ProductCard";
import { products } from "./data/products";

export default function Home() {
  const standardProducts = products.filter(p => !p.featured);
  const featuredProduct = products.find(p => p.featured);

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-[95%] mx-auto px-4 sm:px-6 md:px-8 py-6">
        <div className="flex flex-col md:flex-row gap-[3rem]">

          {/* ===== SIDEBAR ===== */}
          <aside className="w-full md:w-60 lg:w-64 flex-shrink-0">

            {/* Filters Card */}
            <div className="rounded-2xl bg-[#1a56a8] overflow-hidden shadow-md p-5 flex flex-col gap-6">

              {/* Title */}
              <h2 className="text-white font-bold text-xl">Filters</h2>

              {/* Category */}
              <div>
                <p className="text-white font-bold text-base mb-3">Category</p>
                <div className="flex flex-col gap-2">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="radio" name="category" defaultChecked className="appearance-none w-5 h-5 rounded-full border-2 border-white checked:bg-white checked:border-white cursor-pointer" />
                    <span className="text-white text-base">All</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="radio" name="category" className="appearance-none w-5 h-5 rounded-full border-2 border-white/60 checked:bg-white checked:border-white cursor-pointer" />
                    <span className="text-white/90 text-base">Beauty</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="radio" name="category" className="appearance-none w-5 h-5 rounded-full border-2 border-white/60 checked:bg-white checked:border-white cursor-pointer" />
                    <span className="text-white/90 text-base">Fragrances</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="radio" name="category" className="appearance-none w-5 h-5 rounded-full border-2 border-white/60 checked:bg-white checked:border-white cursor-pointer" />
                    <span className="text-white/90 text-base">Furniture</span>
                  </label>
                </div>
              </div>

              {/* Price Slider */}
              <div>
                <p className="text-white font-bold text-base mb-3">Price</p>
                <input type="range" min={0} max={1000} defaultValue={500} className="w-full accent-white cursor-pointer" />
                <div className="flex justify-between text-sm text-white mt-2">
                  <span>0</span>
                  <span>1000</span>
                </div>
              </div>

            </div>

          </aside>

          {/* ===== PRODUCT LISTING ===== */}
          <main className="flex-1">
            <h1 className="text-3xl md:text-3xl xl:text-4xl font-bold text-gray-900 mb-6">Product Listing</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[3rem]">

              {standardProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}

              {/* Featured Card */}
              {featuredProduct && (
                <Link
                  href={`/product/${featuredProduct.id}`}
                  className="col-span-1 sm:col-span-2 bg-white rounded-xl shadow-sm overflow-hidden flex flex-col sm:flex-row group hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-200"
                >
                  <div className="relative w-full sm:w-56 h-56 sm:h-auto bg-gray-50 flex-shrink-0">
                    <Image src={featuredProduct.image} alt={featuredProduct.title} fill className="object-contain p-4 group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="px-5 py-4 flex flex-col gap-2 flex-1">
                    <h3 className="font-bold text-xl text-gray-900 group-hover:text-[#1a56a8] transition-colors">{featuredProduct.title}</h3>
                    <p className="text-gray-900 font-bold text-lg">${featuredProduct.price}</p>
                    {/* Star Rating */}
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} viewBox="0 0 24 24" className={`w-5 h-5 ${i < Math.floor(featuredProduct.rating) ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'}`}>
                          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">{featuredProduct.description}</p>
                    <p className="text-gray-500 text-sm font-semibold mt-auto pt-2 capitalize">Category: {featuredProduct.category}</p>
                    <button
                      className="mt-2 w-full bg-[#1a56a8] hover:bg-[#154a90] text-white rounded-md py-2.5 text-sm font-semibold cursor-pointer transition-colors active:scale-95"
                    >
                      Add to Cart
                    </button>
                  </div>
                </Link>
              )}

            </div>
          </main>

        </div>
      </div>
    </div>
  );
}
