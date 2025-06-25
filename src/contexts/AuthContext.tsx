"use client";

import { createContext, useEffect, useState } from "react";
import {
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  setPersistence, //Esto es para mantener la session hasta que se cierra pestaña o navegador
  browserSessionPersistence, //Esto es para mantener la session hasta que se cierra pestaña o navegador
} from "firebase/auth";
import { auth, database } from "@/config/firebase";
import { ref, set, get } from "firebase/database";

interface AuthContextI {
  user: User | null;
  loading: boolean;
  role: string | null;
  signUp: (email: string, password: string) => Promise<void>;
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
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);

      if (user) {
        const roleRef = ref(database, "users/" + user.uid + "/role");
        const snapshot = await get(roleRef);

        if (snapshot.exists()) {
          setRole(snapshot.val());
        } else {
          setRole(null);
        }
      } else {
        setRole(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signUp = async (email: string, password: string) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    await set(ref(database, "users/" + user.uid), {
      email: user.email,
      role: "user",
    });
  };

  const signIn = async (email: string, password: string) => {
    await setPersistence(auth, browserSessionPersistence); //Esto es para mantener la session hasta que se cierra pestaña o navegador
    await signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider
      value={{ user, role, loading, signUp, signIn, logout }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
