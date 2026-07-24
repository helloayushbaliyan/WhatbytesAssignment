import { Suspense } from "react";
import ProductListing from "./components/ProductListing";

export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center text-gray-500 text-lg">
          Loading products...
        </div>
      }
    >
      <ProductListing />
    </Suspense>
  );
}
