import React from "react";
import "@/app/globals.css";
import { Sparkles, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full">
      <aside className="w-[260px] bg-white border-r p-4 space-y-6">
        <div className="flex items-center space-x-3">
          <Image
            src="/avatar.jpg"
            alt="Admin Avatar"
            width={40}
            height={40}
            className="rounded-full"
          />
          <div>
            <p className="font-semibold text-sm">U. Nandin-Erdene</p>
            <p className="text-xs text-gray-500">Admin</p>
          </div>
        </div>

        <div className="space-y-2">
          <Link href="/admin">
            <Button variant="outline" className="w-full justify-start">
              <LayoutDashboard className="w-4 h-4 mr-2" />
              Dashboard
            </Button>
          </Link>
          <Link href="/admin/ai-assistant">
            <Button variant="ghost" className="w-full justify-start">
              <Sparkles className="w-4 h-4 mr-2" />
              AI Assistant
            </Button>
          </Link>
        </div>
      </aside>
      <main className="flex-1 bg-gray-50 p-6 overflow-y-auto">{children}</main>
    </div>
  );
}

