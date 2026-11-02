
"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "@/lib/auth-client";

export default function ProfilePage() {
  const { data: session } = useSession();
  const [name, setName] = useState(session?.user.name || "");

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();

    // এখানে profile update API call করবে
    console.log("Updated name:", name);
  };

  return (
    <div className="min-h-screen bg-[#f0f5f0] px-4 py-5">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-4">
          <h1 className="text-lg font-bold text-gray-800">
            আমার প্রোফাইল
          </h1>
          <p className="text-xs text-gray-500">
            আপনার ব্যক্তিগত তথ্য এখানে দেখুন।
          </p>
        </div>

        {/* User Information Card */}
        <div className="mb-3 flex items-center gap-3 rounded-lg border border-gray-100 bg-white px-3 py-3">
          <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full">
            <Image
              src={session?.user.image || "/default-avatar.png"}
              alt="প্রোফাইল ছবি"
              fill
              className="object-cover"
              sizes="40px"
            />
          </div>

          <div className="flex-1">
            <h2 className="text-sm font-semibold text-gray-800">
              {session?.user.name || "ব্যবহারকারী"}
            </h2>
            <p className="text-[10px] text-gray-500">
              {session?.user.email}
            </p>
          </div>

          <button
            type="button"
            className="rounded border border-red-300 px-3 py-1 text-[10px] font-medium text-red-500 hover:bg-red-50"
          >
            সাইন আউট
          </button>
        </div>

        {/* Profile Form Card */}
        <div className="rounded-lg border border-gray-100 bg-white p-4">
          <h2 className="mb-5 text-sm font-semibold text-gray-800">
            তথ্য
          </h2>

          <form onSubmit={handleUpdate}>
            <div className="mb-2">
              <label
                htmlFor="name"
                className="mb-1 block text-[10px] font-medium text-gray-600"
              >
                নাম
              </label>

              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded border border-gray-200 bg-white px-3 py-1.5 text-xs outline-none focus:border-green-600"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded bg-green-700 py-1 text-[10px] font-medium text-white shadow-sm hover:bg-green-800"
            >
              আপডেট
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
