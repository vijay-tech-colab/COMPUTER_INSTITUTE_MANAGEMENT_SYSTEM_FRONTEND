"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth.hook";
import { useRouter, usePathname } from "next/navigation";

interface User {
  _id: string;
  name: string;
  email: string;
  avatar?: { url: string };
  role: string;
  branch: {
    _id: string;
    name: string;
    code: string;
  };
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  logout: () => void;
  refreshUser: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { useProfile, useLogout } = useAuth;
  
  const { data: profileData, isLoading: isProfileLoading, refetch } = useProfile();
  const logoutMutation = useLogout();

  const user = profileData?.user || null;
  const isAuthenticated = !!user;
  const isLoading = isProfileLoading;

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        logout: handleLogout,
        refreshUser: refetch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
