/* eslint-disable @next/next/no-img-element */
"use client";
import { User } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { createContext, useContext } from "react";

type UserContextType = {
  user: User | null;
  isLoading: boolean;
};

const UserContext = createContext<UserContextType>({
  user: null,
  isLoading: false,
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: user, isLoading } = useQuery({
    queryKey: ["user", 1],
    queryFn: async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/user/?id=123`
      );
      console.log(response.data);

      return response.data;
    },
  });

  return (
    <UserContext.Provider value={{ user, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    console.log("context is not defined");
  }
  return context;
};
