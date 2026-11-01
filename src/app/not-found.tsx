import Link from "next/link";
import { Home, SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col justify-center items-center text-center px-4">
      <SearchX size={64} className="text-green-600 mb-4" />

      <h1 className="text-5xl font-bold text-gray-800">
        404
      </h1>

      <h2 className="text-2xl font-semibold mt-3">
        পৃষ্ঠাটি খুঁজে পাওয়া যায়নি!
      </h2>

      <p className="text-gray-500 mt-2 max-w-md">
        দুঃখিত! আপনি যে পৃষ্ঠাটি খুঁজছেন সেটি পাওয়া যায়নি
        অথবা সরিয়ে ফেলা হয়েছে।
      </p>

      <Link
        href="/"
        className="mt-6 flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
      >
        <Home size={18} />
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}