import { notFound } from "next/navigation";

const ProductDataProvider = async (id: number) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/bazardor/products/${id}`,
  );

  if (!res.ok) {
    notFound();
  }

  const data = res.json();

  return data;
};

export default ProductDataProvider;
