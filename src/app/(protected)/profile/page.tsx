"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { authClient, useSession } from "@/lib/auth-client";
import { FieldError, Form, Input, Label, TextField } from "@heroui/react";
import _userIcon from "../../../../public/assets/user-default.png";
import toast from "react-hot-toast";
export default function ProfilePage() {
  const router = useRouter();

  const { data: session, isPending } = useSession();

  const [isUpdating, setIsUpdating] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");

  // Profile update
  const handleUpdate = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const name = String(data.name ?? "").trim();
    const nameRegex = /^[A-Za-z\u0980-\u09FF]+(?:\s+[A-Za-z\u0980-\u09FF]+)*$/;

    if (!name || !nameRegex.test(name)) {
      setMessage("সঠিক নাম লিখুন। শুধু বাংলা ও ইংরেজি অক্ষর ব্যবহার করুন।");
      setMessageType("error");
      return;
    }
    setIsUpdating(true);
    setMessage("");
    setMessageType("");

    try {
      const { error } = await authClient.updateUser({
        name: name,
      });

      if (error) {
        setMessage(error.message || "তথ্য আপডেট করা যায়নি।");
        setMessageType("error");
        return;
      }

      setMessage("আপনার নাম সফলভাবে আপডেট হয়েছে।");
      setMessageType("success");
    } catch {
      setMessage("সার্ভারে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
      setMessageType("error");
    } finally {
      setIsUpdating(false);
    }
  };

  // Sign out
  const handleSignOut = async () => {
    setIsSigningOut(true);

    try {
      const { error } = await authClient.signOut();

      if (error) {
        setMessage("সাইন আউট করা যায়নি। আবার চেষ্টা করুন।");
        setMessageType("error");
        return;
      }
      toast.success("সাইন আউট হয়েছে");
      router.replace("/signin");
      router.refresh();
    } catch {
      setMessage("সার্ভারে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
      setMessageType("error");
    } finally {
      setIsSigningOut(false);
    }
  };

  // Session loading
  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f0f5f0]">
        <p className="text-sm text-gray-500">লোড হচ্ছে...</p>
      </div>
    );
  }

  // User not logged in

  return (
    <div className="min-h-screen flex items-center justify-center">
      {session && (
        <div className="">
          <div className="max-w-lg">
            {/* Page Header */}
            <div className="mb-4">
              <h1 className="text-lg font-bold text-gray-800">আমার প্রোফাইল</h1>

              <p className="text-xs text-gray-500">
                আপনার ব্যক্তিগত তথ্য এখানে দেখুন।
              </p>
            </div>

            {/* User Information Card */}
            <div className="mb-3 flex items-center gap-3 rounded-lg border border-gray-100 bg-white px-3 py-3">
              {/* Profile Image */}
              <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-gray-100">
                <Image
                  src={session.user.image || _userIcon}
                  alt="প্রোফাইল ছবি"
                  fill
                  sizes="40px"
                  className="object-cover"
                />
              </div>

              {/* User Details */}
              <div className="min-w-0 flex-1">
                <h2 className="truncate text-sm font-semibold text-gray-800">
                  {session.user.name}
                </h2>

                <p className="truncate text-[10px] text-gray-500">
                  {session.user.email}
                </p>
              </div>

              {/* Sign Out Button */}
              <button
                type="button"
                onClick={handleSignOut}
                disabled={isSigningOut}
                className="btn border-red-300 text-red-500 "
              >
                {isSigningOut ? "অপেক্ষা করুন..." : "সাইন আউট"}
              </button>
            </div>

            {/* Profile Form Card */}
            <div className="rounded-lg border border-gray-100 bg-white p-4">
              <h2 className="mb-5 font-semibold text-gray-800">তথ্য</h2>

              <Form onSubmit={handleUpdate}>
                {/* Name Input */}
                <TextField name="name" type="text" pattern="[A-Za-z\u0980-\u09FF]+(?: [A-Za-z\u0980-\u09FF]+)*" isRequired className="mb-3">
                  <Label className="mb-2 block text-[12px] font-medium text-gray-600">
                    নাম
                  </Label>

                  <Input
                    placeholder="আপনার নাম লিখুন"
                    className="w-full rounded border border-gray-200 bg-white px-3 py-2 text-xs text-gray-800 outline-none transition focus:border-green-600 focus:ring-1 focus:ring-green-100"
                  />
                  <FieldError />
                </TextField>

                {/* Feedback Message */}
                {message && (
                  <p
                    className={`mb-3 text-xs ${
                      messageType === "success"
                        ? "text-green-700"
                        : "text-red-500"
                    }`}
                  >
                    {message}
                  </p>
                )}

                {/* Update Button */}
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="w-full rounded bg-green-700 py-1.5 text-xs font-medium text-white shadow-sm transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isUpdating ? "আপডেট হচ্ছে..." : "আপডেট"}
                </button>
              </Form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
