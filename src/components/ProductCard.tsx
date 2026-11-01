import ConvertUnit, { ProductCardProps } from "@/types/DataTypes";
import { Triangle,Minus } from "lucide-react";
import Link from "next/link";

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link href={`/product/${product.id}`} className="block">
      <div className="group w-80 rounded-2xl border border-gray-100 bg-white p-4 transition-all duration-200 hover:-translate-y-1 hover:border-green-200 hover:shadow-lg">

        {/* Product information */}
        <div className="flex items-center gap-3">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#f0f5f0] text-2xl">
            {product.image}
          </span>

          <div className="min-w-0">
            <h3 className="truncate text-base font-bold text-gray-900 group-hover:text-green-700">
              {product.nameBn}
            </h3>

            <p className="mt-1 text-xs">
              প্রতি {ConvertUnit(product.unit)}
            </p>
          </div>
        </div>

        {/* Price information */}
        <div className="mt-4 flex items-end justify-between">
          <div>
            <p className="text-xs font-medium">
              আজকের বাজারদর
            </p>

            <p className="mt-1 text-xl font-bold tracking-tight text-gray-900">
              ৳{product.today.toLocaleString("bn-BD")}
              <span className="ml-1 text-xs font-medium">
                /{ConvertUnit(product.unit)}
              </span>
            </p>
          </div>

          {/* Price change indicator */}
          <div
            className={`flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold ${
              product.change.dir === "up"
                ? "bg-red-50 text-red-600"
                : product.change.dir === "down"
                  ? "bg-green-50 text-green-700"
                  : "bg-gray-100 text-gray-600"
            }`}
          >
            {product.change.dir === "up" && <Triangle fill="red" size={13} />}
            {product.change.dir === "down" && <Triangle fill="green" size={13} />}
            {product.change.dir === "flat" && <Minus fill="black"  size={13} />}

            {product.change.pct.toLocaleString("bn-BD")}%
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;