"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleSignOut = async () => {
    const { error } = await authClient.signOut();

    if (error) {
      console.error("Sign out error:", error);
      return;
    }

    router.replace("/signin");
    router.refresh();
  };

  return (
    <button className="btn bg-green-700 text-white" onClick={handleSignOut}>
      লগ আউট
    </button>
  );
}