"use client";

import { authClient } from "@/lib/auth-client";
import LogoutButton from "./LogoutBtn";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return <p>লোড হচ্ছে...</p>;
  }

  return (
    <nav>
      {session ? (
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <Image className="border border-transparent rounded-full" height={40} width={40} src={session.user.image ?? '../'} alt="user image" ></Image>
            <p className="font-bold text-green-700 text-sm">
              স্বাগতম, <br />{session.user.name.trim().split(" ")[0]}
            </p>
          </div>
          <LogoutButton />
        </div>
      ) : (
        <div className="flex gap-3 items-center">
          <Link href="/signin" className="btn bg-green-700 text-white">
            সাইন ইন
          </Link>
          <Link href="/signup" className="btn bg-green-700 text-white">
            সাইন আপ
          </Link>
        </div>
      )}
    </nav>
  );
}
