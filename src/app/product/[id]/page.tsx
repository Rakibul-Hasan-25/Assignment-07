import ProductDataProvider from "@/lib/ProductDataProvider";
import { Product, ProductProps } from "@/types/DataTypes";
import Link from "next/link";
import { Triangle, Minus } from "lucide-react";
import React from "react";

const page = async ({ params }: ProductProps) => {
  const { id } = await params;
  const product: Product = await ProductDataProvider(id);
  // Calculate lowest and highest market prices
  const lowestPrice = Math.min(...product.markets.map((market) => market.min));

  const highestPrice = Math.max(...product.markets.map((market) => market.max));

  // Calculate average market price
  const averagePrice =
    product.markets.length > 0
      ? product.markets.reduce(
          (total, market) => total + (market.min + market.max) / 2,
          0,
        ) / product.markets.length
      : 0;

  // Calculate price difference
  const priceDifference = Math.abs(product.today - product.yesterday);
  return (
    <main className=" bg-[#f0f5f0] px-3 py-6 md:px-6">
      <div className="mx-auto container space-y-4">
        {/* Breadcrumb */}
        <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-green-700">
            হোম
          </Link>
          <span>›</span>
          <Link
            href={`/category/${product.category}`}
            className="hover:text-green-700"
          >
            {product.categoryNameBn}
          </Link>
          <span>›</span>
          <span className="font-medium text-gray-700">{product.nameBn}</span>
        </div>

        {/* Product Header */}
        <section className="flex flex-col justify-between gap-5 rounded-2xl border border-gray-200 bg-white p-5 sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-[#f0f5f0] text-4xl">
              {product.image}
            </div>

            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {product.nameBn}
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                প্রতি কেজি · {product.categoryNameBn}
              </p>

              <p className="mt-2 text-sm text-gray-700">
                {product.change.dir === "up" && (
                  <span>
                    গতকালের তুলনায় আজ দাম বেড়েছে{" "}
                    <strong className="text-red-600">
                      {priceDifference.toLocaleString("bn-BD")} টাকা
                    </strong>
                  </span>
                )}

                {product.change.dir === "down" && (
                  <span>
                    গতকালের তুলনায় আজ দাম কমেছে{" "}
                    <strong className="text-green-600">
                      {priceDifference.toLocaleString("bn-BD")} টাকা
                    </strong>
                  </span>
                )}

                {product.change.dir === "flat" && (
                  <span>গতকালের তুলনায় আজ দাম অপরিবর্তিত</span>
                )}
              </p>
            </div>
          </div>

          {/* Today's Price */}
          <div className="rounded-xl bg-[#f0f5f0] px-6 py-4 text-center sm:min-w-28">
            <p className="text-xs text-gray-500">আজকের দাম</p>

            <h2 className="text-3xl font-bold text-gray-900">
              {product.today.toLocaleString("bn-BD")}
            </h2>

            <p className="text-sm text-gray-500">
              টাকা / {product.unit === "kg" ? "কেজি" : product.unit}
            </p>

            <p
              className={`mt-1 text-xs font-semibold ${
                product.change.dir === "up"
                  ? "text-red-600"
                  : product.change.dir === "down"
                    ? "text-green-600"
                    : "text-gray-500"
              }`}
            >
              {product.change.dir === "up" && <Triangle className="inline-block" fill="red" size={12}/>}
              {product.change.dir === "down" && <Triangle className="inline-block" fill="green" size={12}/>}
              {product.change.dir === "flat" && <Minus className="inline-block" size={12}/>}{" "}
              {product.change.pct.toLocaleString("bn-BD")}%
            </p>
          </div>
        </section>

        {/* Price Summary */}
        <section className="rounded-2xl border border-gray-200 bg-white p-5">
          <h2 className="mb-4 text-lg font-bold text-gray-800">
            দামের সারসংক্ষেপ
          </h2>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {/* Lowest Price */}
            <div className="rounded-xl border border-gray-200 p-4">
              <p className="text-xs text-gray-500">সর্বনিম্ন দাম</p>

              <h3 className="mt-1 text-2xl font-bold text-green-600">
                ৳{lowestPrice.toLocaleString("bn-BD")}
              </h3>

              <p className="text-xs text-gray-500">সবচেয়ে কম দামের বাজার</p>
            </div>

            {/* Highest Price */}
            <div className="rounded-xl border border-gray-200 p-4">
              <p className="text-xs text-gray-500">সর্বাধিক দাম</p>

              <h3 className="mt-1 text-2xl font-bold text-red-600">
                ৳{highestPrice.toLocaleString("bn-BD")}
              </h3>

              <p className="text-xs text-gray-500">সবচেয়ে বেশি দামের বাজার</p>
            </div>

            {/* Average Price */}
            <div className="rounded-xl border border-gray-200 p-4">
              <p className="text-xs text-gray-500">গড় দাম</p>

              <h3 className="mt-1 text-2xl font-bold text-green-600">
                ৳{Math.round(averagePrice).toLocaleString("bn-BD")}
              </h3>

              <p className="text-xs text-gray-500">
                প্রতি বাজারের গড় দামের ভিত্তিতে
              </p>
            </div>
          </div>
        </section>

        {/* Market Price Table */}
        <section className="rounded-2xl border border-gray-200 bg-white p-5">
          <h2 className="mb-4 text-lg font-bold text-gray-800">
            বাজারভিত্তিক আজকের দাম
          </h2>

          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full min-w-162.5 text-sm">
              <thead className="bg-[#f8faf8] text-gray-500">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">বাজার</th>

                  <th className="px-4 py-3 text-left font-semibold">বিভাগ</th>

                  <th className="px-4 py-3 text-right font-semibold">
                    সর্বনিম্ন
                  </th>

                  <th className="px-4 py-3 text-right font-semibold">
                    সর্বোচ্চ
                  </th>

                  <th className="px-4 py-3 text-right font-semibold">গড়</th>
                </tr>
              </thead>

              <tbody>
                {product.markets.map((market, index) => {
                  const marketAverage = (market.min + market.max) / 2;

                  return (
                    <tr
                      key={index}
                      className="border-t border-gray-200 odd:bg-white even:bg-[#f0f5f0]"
                    >
                      <td className="px-4 py-3 font-medium text-gray-800">
                        {market.market}
                      </td>

                      <td className="px-4 py-3 text-gray-600">
                        {market.division}
                      </td>

                      <td className="px-4 py-3 text-right text-gray-700">
                        {market.min.toLocaleString("bn-BD")} টাকা
                      </td>

                      <td className="px-4 py-3 text-right text-gray-700">
                        {market.max.toLocaleString("bn-BD")} টাকা
                      </td>

                      <td className="px-4 py-3 text-right font-semibold text-gray-900">
                        {Math.round(marketAverage).toLocaleString("bn-BD")} টাকা
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
};

export default page;
