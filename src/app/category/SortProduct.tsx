"use client";
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Product } from "@/types/DataTypes";
import ProductCard from "@/components/ProductCard";
const SortProduct = ({ products }: { products: Product[] }) => {
  const [sortOrder, setSortOrder] = useState<string>("ডিফল্ট");
  const SortedProduct = products.toSorted((a, b) => {
    if (sortOrder === "দামঃ বেশি থেকে কম") {
      return b.today - a.today;
    }
    else if(sortOrder === "দামঃ কম থেকে বেশি"){
    return a.today - b.today;
    }
    return 0;
  });
  return (
    <div className="container mx-auto">
      <div className="flex items-center gap-2 justify-center lg:justify-end bg-white border border-transparent rounded-2xl p-3 mt-5">
        <div>সাজান</div>
        <div className="dropdown dropdown-center">
          <div role="button" tabIndex={0} className="btn">
            {sortOrder}
            <ChevronDown size={15} />
          </div>
          <ul
            onClick={() => {
              (document.activeElement as HTMLElement)?.blur();
            }}
            tabIndex={-1}
            className="dropdown-content menu bg-base-100 rounded-box z-1 w-40 py-1 shadow-sm"
          >
            <li
              onClick={() => setSortOrder("ডিফল্ট")}
              className={sortOrder === "ডিফল্ট" ? "hidden" : "block"}
            >
              <a>ডিফল্ট</a>
            </li>
            <li
              onClick={() => setSortOrder("দামঃ কম থেকে বেশি")}
              className={sortOrder === "দামঃ কম থেকে বেশি" ? "hidden" : "block"}
            >
              <a>দামঃ কম থেকে বেশি</a>
            </li>
            <li
              onClick={() => setSortOrder("দামঃ বেশি থেকে কম")}
              className={sortOrder === "দামঃ বেশি থেকে কম" ? "hidden" : "block"}
            >
              <a>দামঃ বেশি থেকে কম</a>
            </li>
          </ul>
        </div>
      </div>
      <div className=" mt-5 flex flex-col items-center lg:items-start">
        {/* top part text container */}
        <div className="mb-2">
          <span className="text-[12px] text-gray-600">
            মোট {products.length}টি পণ্য দেখানো হচ্ছে
          </span>
        </div>
        <div className="flex items-center justify-center gap-2 flex-wrap lg:justify-between">
          {SortedProduct.map((product) => (
            <div key={product.id}>
              <ProductCard product={product}></ProductCard>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SortProduct;
