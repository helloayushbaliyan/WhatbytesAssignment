import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ product }) {
  const { id, title, price, thumbnail, description, category, rating } = product;
  
  return (
    <Link 
      href={{
        pathname: `/product/${id}`,
        query: { title, price, thumbnail, description, category, rating }
      }} 
      className="rounded-xl overflow-hidden flex flex-col group hover:shadow-xl transition-all duration-300 bg-white border border-transparent hover:border-gray-200"
    >
      <div className="relative aspect-[4/3] bg-gray-50 rounded-t-xl overflow-hidden">
        <Image src={thumbnail} alt={title} fill className="object-contain p-4 group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
      </div>
      <div className="px-4 pb-4 pt-2 flex flex-col gap-1 flex-1">
        <h3 className="text-gray-900 font-medium text-2xl">{title}</h3>
        <p className="text-gray-900 font-bold text-xl">${price}</p>
        <button 
          className="mt-auto w-full bg-[#1a56a8] hover:bg-[#154a90] text-white rounded-md px-5 py-3 text-xl font-semibold cursor-pointer transition-colors active:scale-95"
        >
          Add to Cart
        </button>
      </div>
    </Link>
  );
}
