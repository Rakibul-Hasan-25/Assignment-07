import React from "react";
import ConvertUnit, { Categories, Product } from "@/types/DataTypes";
import CategoriesDataProvider from "@/lib/CategoriesDataProvider";
import Link from "next/link";
import { Minus, ShoppingCart, Triangle } from "lucide-react";
import AllProductsDataProvider from "@/lib/AllProductsDataProvider";
const today = new Date();

export const banglaDate = new Intl.DateTimeFormat("bn-BD", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "Asia/Dhaka",
}).format(today);
const Header = async () => {
  const categories: Categories[] = await CategoriesDataProvider();
  const allProducts: Product[] = await AllProductsDataProvider();
  return (
    // main container of the header
    <div className="bg-white">
      {/* header top part container */}
      <Link href="/" className="block container mx-auto mt-5 mb-5">
        {/* top part sub container */}
        <div className="flex gap-2">
          {/* left side logo */}
          <div className="bg-green-700 flex items-center justify-center border border-transparent rounded-lg p-2">
            <ShoppingCart color="white" size={29} />
          </div>
          {/* right side title and date  */}
          <div>
            <h2 className="font-extrabold tracking-wider text-2xl">বাজার দর</h2>
            <p className="font-light tracking-tighter">{banglaDate}</p>
          </div>
        </div>
      </Link>
      {/* header category part main container */}
      <div className="container mx-auto mb-4">
        {/* header category part sub container */}
        <div className="flex gap-8 flex-wrap">
          {categories.map((category) => (
            <div key={category.id} className="flex  gap-2">
              <span>{category.icon}</span>
              <p className="font-bold hover:text-green-700">
                <Link href={`/category/${category.slug}`}>
                  {category.nameBn}
                </Link>
              </p>
            </div>
          ))}
        </div>
      </div>
      {/* header bottom moving part main container */}
      <div className="border-t border-b border-gray-200">
        <div className="flex w-max animate-infinite-scroll  hover:paused">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex gap-2">
              {allProducts.map((product) => (
                <Link className="block" href={`/product/${product.id}`} key={`${copy}-${product.id}`}>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-green-500">
                    <span>{product.categoryIcon}</span>
                    <span>{product.nameBn}</span>
                    <span>
                      ৳{product.today.toLocaleString("bn-BD")} টাকা/
                      {ConvertUnit(product.unit)}
                    </span>
                    {product.change.dir === "up" && (
                      <span className="flex items-center gap-0.5 text-red-700">
                        <Triangle fill="red" size={12} />
                        {product.change.pct.toLocaleString("bn-BD")}%
                      </span>
                    )}
                    {product.change.dir === "down" && (
                      <span className="flex items-center gap-0.5 text-green-700">
                        <Triangle
                          className="rotate-180"
                          fill="green"
                          size={12}
                        />
                        {product.change.pct.toLocaleString("bn-BD")}%
                      </span>
                    )}
                    {product.change.dir === "flat" && (
                      <span className="flex items-center gap-0.5 text-green-700">
                        <Minus fill="black" size={12} />
                        {product.change.pct.toLocaleString("bn-BD")}%
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Header;
