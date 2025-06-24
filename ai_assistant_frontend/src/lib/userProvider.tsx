"use client";

import React, { createContext, useContext } from "react";
import { ApolloError } from "@apollo/client";
import { useUserInformationQuery } from "@/generated/graphql";

type Message = {
  id: string;
  content: string;
  createdAt: string;
};

export type User = {
  id: string;
  email: string;
  messages: Message[];
};

type UserContextType = {
  user: User | null;
  loading: boolean;
  error: ApolloError | undefined;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  userId: number;
  children: React.ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({
  userId,
  children,
}) => {
  const { data, loading, error } = useUserInformationQuery({
    variables: { userId },
    skip: !userId,
  });

  const user = data?.userInformation ?? null;

  return (
    <UserContext.Provider value={{ user, loading, error }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
