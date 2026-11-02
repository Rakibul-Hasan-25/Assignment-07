"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Eye, EyeOff,ArrowLeft } from "lucide-react";
import {
  Button,
  Form,
  Input,
  Label,
  TextField,
  FieldError,
  InputGroup,
} from "@heroui/react";

export default function SignupPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSignin(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const email = String(data.email ?? "");
    const password = String(data.password ?? "");

    setLoading(true);

    try {
      const { error } = await authClient.signIn.email({
        email,
        password,
      });

      if (error) {
        setError(error.message ?? "অ্যাকাউন্ট তৈরি করা যায়নি।");
        return;
      }

      router.replace("/");
      router.refresh();
    } catch (err) {
      console.error(err);
      setError("কিছু সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  }
  const handleSocialLogin = async (
    provider: "google" | "github"
  ) => {
    setLoading(true);

    try {
      const { error } = await authClient.signIn.social({
        provider,
        callbackURL: "/",
      });

      if (error) {
        console.error("লগইন সমস্যা:", error);
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#f5f8f5] px-4 py-10">
        <div className="mb-5 text-center">
          <h1 className="mt-5 text-2xl font-bold text-gray-900">সাইন ইন</h1>

          <p className="mt-2 text-sm text-gray-500">
            বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্ট খুলুন।
          </p>
        </div>
      <div className="w-full max-w-md rounded-3xl border border-gray-200 bg-white p-7 shadow-xl sm:p-9">
        {/* Brand */}
        

        {/* Signup Form */}
        <Form onSubmit={handleSignin} className="flex flex-col gap-5">
          <TextField name="email" type="email" isRequired>
            <Label className="font-medium text-gray-700">ইমেইল ঠিকানা</Label>
            <Input
              placeholder="example@gmail.com"
              className="w-full rounded-xl border border-gray-300 px-3 py-3"
            />
            <FieldError />
          </TextField>

          <TextField name="password" isRequired minLength={8}>
            <Label className="font-medium text-gray-700">পাসওয়ার্ড</Label>

            <InputGroup className="w-full rounded-xl border border-gray-300 px-0.5 py-0.5">
              <InputGroup.Input
                type={showPassword ? "text" : "password"}
                placeholder="আপনার পাসওয়ার্ড লিখুন"
              />
              <InputGroup.Suffix>
                <Button
                  type="button"
                  isIconOnly
                  variant="ghost"
                  onPress={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <Eye size={12} /> : <EyeOff size={12} />}
                </Button>
              </InputGroup.Suffix>
            </InputGroup>
            <FieldError />
          </TextField>
          {error && (
            <p className="w-full rounded-lg bg-red-50 p-3 text-sm text-red-600">
              {error}
            </p>
          )}
          <Button
            type="submit"
            isDisabled={loading}
            className="w-full rounded-xl bg-green-700 py-3 font-semibold text-white hover:bg-green-800"
          >
            {loading
              ? "অ্যাকাউন্ট এ প্রবেশ করা হচ্ছে..."
              : "অ্যাকাউন্ট এ প্রবেশ করুন"}
          </Button>
        </Form>
        {/* the other sign in methods seperator*/}
        <div className="flex items-center gap-2 mt-3">
          <div className="flex-1 border border-t border-gray-300"></div>
          <span className="text-sm text-gray-500">অথবা</span>
          <div className="flex-1 border border-t border-gray-300"></div>
        </div>
        {/* social sign in  */}
        <div className="flex items-center justify-between mt-3">
          <button onClick={() => handleSocialLogin("google")} disabled={loading} className="btn">Google দিয়ে চালিয়ে যান</button>
          <button onClick={() => handleSocialLogin("github")} disabled={loading} className="btn">GitHub দিয়ে চালিয়ে যান</button>
        </div>
        <div className="mt-5 text-center">
          <p className="text-sm text-gray-600">
            অ্যাকাউন্ট নেই?{" "}
            <Link
              href="/signup"
              className="font-semibold text-green-700 hover:text-green-800"
            >
              সাইন আপ করুন
            </Link>
          </p>
        </div>
        
      </div>
      <div className="flex items-center justify-center mt-8">
        <Link className="block text-sm text-gray-600" href='/'><ArrowLeft className="inline-block" size={13}/>{" "}হোম পেইজ ফিরে যান</Link>
        </div>
    </main>
  );
}
