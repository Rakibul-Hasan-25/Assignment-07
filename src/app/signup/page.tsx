"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Eye, EyeOff } from "lucide-react";
import {
  Button,
  Form,
  Input,
  Label,
  TextField,
  FieldError,
  InputGroup,
} from "@heroui/react";
import toast from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSignup(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const name = String(data.name ?? "");
    const email = String(data.email ?? "");
    const password = String(data.password ?? "");
    const confirmPassword = String(data.confirmPassword ?? "");

    if (password !== confirmPassword) {
      setError("পাসওয়ার্ড দুটি মিলছে না।");
      return;
    }

    setLoading(true);

    try {
      const { error } = await authClient.signUp.email({
        name,
        email,
        password,
      });

      if (error) {
        setError(error.message ?? "অ্যাকাউন্ট তৈরি করা যায়নি।");
        return;
      }
      toast.success("অনুরোধ গ্রহণ করা হয়েছে।");
      router.replace("/signin");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "অ্যাকাউন্ট তৈরি করা যায়নি।",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-3xl border border-gray-200 bg-white p-7 shadow-xl sm:p-9">
        {/* Brand */}
        <div className="mb-7 text-center">
          <h1 className="mt-5 text-2xl font-bold text-gray-900">
            অ্যাকাউন্ট তৈরি করুন
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            প্রতিদিনের বাজারদর জানতে আজই যুক্ত হন।
          </p>
        </div>

        {/* Signup Form */}
        <Form onSubmit={handleSignup} className="flex flex-col gap-5">
          <TextField name="name" isRequired>
            <Label className="font-medium text-gray-700">পূর্ণাঙ্গ নাম</Label>
            <Input
              placeholder="আপনার নাম লিখুন"
              className="w-full rounded-xl border border-gray-300 px-3 py-3"
            />
            <FieldError />
          </TextField>

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

          <TextField name="confirmPassword" type="password" isRequired>
            <Label className="font-medium text-gray-700">
              পাসওয়ার্ড নিশ্চিত করুন
            </Label>
            <InputGroup className="w-full rounded-xl border border-gray-300 px-0.5 py-0.5">
              <InputGroup.Input
                placeholder="পাসওয়ার্ড আবার লিখুন"
                type={showPassword ? "text" : "password"}
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
            {loading ? "অ্যাকাউন্ট তৈরি হচ্ছে..." : "অ্যাকাউন্ট তৈরি করুন"}
          </Button>
        </Form>

        {/* Sign in */}
        <div className="mt-7 border-t border-gray-100 pt-6 text-center">
          <p className="text-sm text-gray-600">
            ইতোমধ্যে অ্যাকাউন্ট রয়েছে?{" "}
            <Link
              href="/signin"
              className="font-semibold text-green-700 hover:text-green-800"
            >
              সাইন ইন করুন
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
