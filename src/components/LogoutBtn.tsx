"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function LogoutButton() {
  const router = useRouter();

  const handleSignOut = async () => {
    const { error } = await authClient.signOut();

    if (error) {
      console.error("Sign out error:", error);
      return;
    }
    toast.success("লগ আউট হয়েছে");
    router.replace("/signin");
    router.refresh();
  };

  return (
    <button className="btn bg-green-700 text-white" onClick={handleSignOut}>
      লগ আউট
    </button>
  );
}