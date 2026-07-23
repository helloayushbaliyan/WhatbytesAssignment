import Image from "next/image";

export default function ProductCard({ title, price, image }) {
  return (
    <div className="rounded-xl overflow-hidden flex flex-col">
      <div className="relative aspect-[4/3] bg-gray-50 rounded-t-xl overflow-hidden">
        <Image src={image} alt={title} fill className="object-contain p-4" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
      </div>
      <div className="px-4 space-y-3 pb-4 pt-2 flex flex-col gap-1 flex-1">
        <h3 className="text-gray-900 font-medium text-2xl">{title}</h3>
        <p className="text-gray-900 font-bold text-xl">${price}</p>
        <button className="mt-auto w-full bg-[#1a56a8] hover:bg-[#154a90] text-white rounded-xl px-5 py-3 text-xl font-semibold cursor-pointer transition-colors">
          Add to Cart
        </button>
      </div>
    </div>
  );
}
