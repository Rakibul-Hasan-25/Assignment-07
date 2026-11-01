import AllProductsDataProvider from "@/lib/AllProductsDataProvider";
import { Product } from "@/types/DataTypes";
import React from "react";
import ProductCard from "./ProductCard";

const AllProducts = async () => {
  const products: Product[] = await AllProductsDataProvider();
  return (
    // main container of all products
    <div id="allProducts" className="container mx-auto mt-6 flex flex-col items-center lg:items-start">
        {/* top part text container */}
        <div className="flex flex-col gap-1 mb-2 items-center lg:items-start">
            <span className="font-semibold tracking-wider text-2xl">সব পণ্য</span>
            <span className="text-[12px] text-gray-600">মোট {products.length}টি পণ্য দেখানো হচ্ছে</span>
        </div>
      <div className="flex items-center justify-center gap-2 flex-wrap lg:justify-between">
        {products.map((product) => (
          <div key={product.id}>
            <ProductCard product={product}></ProductCard>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
