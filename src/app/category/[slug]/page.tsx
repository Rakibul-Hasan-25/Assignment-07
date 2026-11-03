import ProductCard from "@/components/ProductCard";
import CategoriesDataProvider from "@/lib/CategoriesDataProvider";
import CategoryProductsDataProvider from "@/lib/CategoryProductsDataProvider";
import { CategoryProductsProps, Product } from "@/types/DataTypes";
import React from "react";
import SortProduct from "../SortProduct";

const page = async ({ params }: CategoryProductsProps) => {
  const { slug } = await params;
  const products: Product[] = await CategoryProductsDataProvider(slug);
  const categories = await CategoriesDataProvider();

  return (
    <>
      {/* top part of the section */}
      <div className="container mx-auto bg-white p-3 border border-transparent rounded-2xl mt-6 flex justify-center lg:justify-start">
        <div className="flex items-center gap-2">
          <div>
            {categories.map((category) =>
              category.slug === slug ? category.icon : "",
            )}
          </div>
          <div>
            <span className="font-bold tracking-wider">
              {slug === "chal"
                ? "চাল"
                : slug === "dal"
                  ? "ডাল"
                  : slug === "tel"
                    ? "তেল"
                    : slug === "sobji"
                      ? "সবজি"
                      : slug === "mach"
                        ? "মাছ"
                        : slug === "mangsho"
                          ? "মাংস"
                          : slug === "dim-dui"
                            ? "দিম-দুধ"
                            : slug === "mosla"
                              ? "মসলা"
                              : "প্রোডাক্ট নাই"}
            </span>
            <span className="block text-[12px] text-gray-600">
              {products.length}টি পণের আজকের দাম ও পরিবর্তন
            </span>
          </div>
        </div>
      </div>
      {/* middle part container */}
      <div className="min-h-screen">
        <div className="">
          <SortProduct products={products}/>
        </div>
      </div>
    </>
  );
};

export default page;
