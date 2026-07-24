import Image from "next/image";
import Link from "next/link";
import { products } from "../../data/products";

export default async function ProductDetailPage({ params }) {
  const { id } = await params;
  const product = products.find(p => p.id === id);

  if (!product) {
    return <div className="min-h-screen flex items-center justify-center text-gray-500 text-xl">Product not found.</div>;
  }

  // For the gallery, we'll just use the image since we passed it in the URL
  const galleryImages = [product.image];

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-[95%] mx-auto px-4 sm:px-6 md:px-8">

        {/* Breadcrumbs */}
        <nav className="flex text-sm text-gray-500 mb-8" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link href="/" className="hover:text-[#1a56a8] transition-colors">Home</Link>
            </li>
            <li>
              <div className="flex items-center">
                <svg className="w-3 h-3 mx-1 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                </svg>
                <span className="ml-1 md:ml-2 hover:text-[#1a56a8] transition-colors cursor-pointer">{product.category}</span>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <svg className="w-3 h-3 mx-1 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                </svg>
                <span className="ml-1 md:ml-2 text-gray-800 font-medium">{product.title}</span>
              </div>
            </li>
          </ol>
        </nav>

        {/* Product Layout */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex flex-col lg:flex-row">

            {/* Left: Image Section */}
            <div className="w-full lg:w-1/2 p-6 lg:p-10 border-b lg:border-b-0 lg:border-r border-gray-100 bg-gray-50/50">
              <div className="flex flex-col gap-6">
                {/* Main Image */}
                <div className="relative w-full aspect-square bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 p-8">
                  <Image
                    src={galleryImages[0]}
                    alt={product.title}
                    fill
                    className="object-contain p-4 hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Thumbnails */}
                <div className="grid grid-cols-4 gap-4">
                  {galleryImages.map((img, index) => (
                    <div key={index} className={`relative aspect-square rounded-lg overflow-hidden border-2 cursor-pointer transition-colors ${index === 0 ? 'border-[#1a56a8]' : 'border-transparent bg-white hover:border-gray-200 shadow-sm'}`}>
                      <Image src={img} alt={`Thumbnail ${index + 1}`} fill className="object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Details Section */}
            <div className="w-full lg:w-1/2 p-6 lg:p-12 flex flex-col justify-center">

              <div className="mb-2">
                <span className="inline-block bg-[#1a56a8]/10 text-[#1a56a8] text-xs font-semibold px-3 py-1 rounded-full">
                  {product.category}
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
                {product.title}
              </h1>

              {/* Reviews */}
              <div className="flex items-center gap-2 mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} viewBox="0 0 24 24" className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'}`}>
                      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm font-medium text-gray-600">{product.rating}</span>
                <span className="text-sm text-gray-400">·</span>
                <a href="#reviews" className="text-sm text-[#1a56a8] hover:underline">{product.reviewsCount} reviews</a>
              </div>

              {/* Price */}
              <div className="mb-6 flex items-end gap-3">
                <span className="text-4xl font-bold text-gray-900">${product.price}</span>
                <span className="text-sm font-medium text-green-600 bg-green-50 px-2.5 py-1 rounded-md mb-1">In Stock</span>
              </div>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed mb-8 text-lg">
                {product.description}
              </p>

              <hr className="border-gray-100 mb-8" />

              {/* Actions: Quantity & Add to Cart */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">

                {/* Quantity Selector */}
                <div className="flex items-center border-2 border-gray-200 rounded-xl bg-white h-14 w-full sm:w-36 flex-shrink-0">
                  <button className="flex-1 flex justify-center items-center text-gray-500 hover:text-[#1a56a8] hover:bg-gray-50 h-full rounded-l-xl transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" /></svg>
                  </button>
                  <span className="text-gray-900 font-semibold text-lg w-10 text-center select-none">1</span>
                  <button className="flex-1 flex justify-center items-center text-gray-500 hover:text-[#1a56a8] hover:bg-gray-50 h-full rounded-r-xl transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                  </button>
                </div>

                {/* Add to Cart Button */}
                <button className="flex-1 bg-[#1a56a8] hover:bg-[#154a90] text-white h-14 rounded-xl font-bold text-lg shadow-md shadow-[#1a56a8]/20 flex justify-center items-center gap-2 transition-all active:scale-[0.98]">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <circle cx="9" cy="21" r="1" />
                    <circle cx="20" cy="21" r="1" />
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                  </svg>
                  Add to Cart
                </button>
              </div>

              {/* Guarantees */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 text-gray-600 bg-gray-50 p-3 rounded-lg">
                  <svg className="w-5 h-5 text-[#1a56a8]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  <span className="text-sm font-medium">Free Shipping</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600 bg-gray-50 p-3 rounded-lg">
                  <svg className="w-5 h-5 text-[#1a56a8]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                  <span className="text-sm font-medium">30-Day Returns</span>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
