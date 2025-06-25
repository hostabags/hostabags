"use client";

import { createContext, useEffect, useState } from "react";
import { User } from "firebase/auth";
import { AuthService } from "@/services/firebase";

interface AuthContextI {
  user: User | null;
  loading: boolean;
  role: string | null;
  signUp: (email: string, password: string, userData?: any) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextI>(
  {} as AuthContextI
);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = AuthService.onAuthStateChanged(async (user) => {
      setUser(user);

      if (user) {
        const userRole = await AuthService.getUserRole(user.uid);
        setRole(userRole);
      } else {
        setRole(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, userData?: any) => {
    try {
      await AuthService.signUp(email, password, userData);
    } catch (error) {
      throw error;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      await AuthService.signIn(email, password);
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await AuthService.signOut();
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, role, loading, signUp, signIn, logout }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
