"use client";

import React from "react";
import "@/app/globals.css";
import { Files, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen w-full">
      <aside className="w-[260px] bg-[#1E2530] text-[#818994] border-r border-gray-700 p-4 space-y-6">
        <div className="flex items-center space-x-3 rounded-full">
          <Avatar className="w-10 h-10 rounded-full">
            <AvatarImage src="https://i.pravatar.cc/100?u=user" alt="User" />
            <AvatarFallback>AE</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-sm text-white">A. Enkh-Erdene</p>
            <p className="text-xs text-gray-500">Admin</p>
          </div>
        </div>

        {/* Navigation */}
        <div className="space-y-2">
          <Link href="/admin">
            <Button
              variant="ghost"
              className={`w-full justify-start text-sm ${
                pathname === "/admin"
                  ? "bg-[#2A303C] text-white hover:bg-[#323843]"
                  : "text-gray-500 hover:text-white hover:bg-[#1E2530]"
              }`}
            >
              <Files className="w-4 h-4 mr-2" />
              Dashboard
            </Button>
          </Link>

          <Link href="/admin/files">
            <Button
              variant="ghost"
              className={`w-full justify-start text-sm ${
                pathname === "/admin/files"
                  ? "bg-[#2A303C] text-white hover:bg-[#323843]"
                  : "text-gray-500 hover:text-white hover:bg-[#1E2530]"
              }`}
            >
              <Files className="w-4 h-4 mr-2" />
              Files
            </Button>
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 bg-gray-50 overflow-y-auto">{children}</main>
    </div>
  );
}
