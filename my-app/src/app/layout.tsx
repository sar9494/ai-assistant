"use client";
import "./globals.css";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { UserProvider } from "./provider/userProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();
  return (
    <html lang="en">
      <body className={`antialiased bg-white`}>
        <QueryClientProvider client={queryClient}>
          <UserProvider>
            <Toaster /> {children}
          </UserProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
