import { notFound } from "next/navigation";

const CategoryProductsDataProvider = async(category: string) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/bazardor/products?category=${category}`);

  if (!res.ok) {
    notFound();
  }

  const data = await res.json();

  return data;
};

export default CategoryProductsDataProvider;
