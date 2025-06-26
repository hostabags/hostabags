import {
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  setPersistence,
  browserSessionPersistence,
  UserCredential,
} from "firebase/auth";
import { auth, database } from "./config";
import { ref, set, get } from "firebase/database";
import type { User as AppUser } from "@/types/user";

export interface AuthError {
  code: string;
  message: string;
}

export class AuthService {

  //Create a new user account
  static async signUp(email: string, password: string, userData?: Partial<AppUser>): Promise<UserCredential> {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Create user profile in database
      await set(ref(database, "users/" + user.uid), {
        id: user.uid,
        email: user.email,
        role: "user",
        ...userData,
      });

      return userCredential;
    } catch (error) {
      throw this.handleAuthError(error as AuthError);
    }
  }

  //Sign in existing user
  static async signIn(email: string, password: string): Promise<UserCredential> {
    try {
      await setPersistence(auth, browserSessionPersistence);
      return await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      throw this.handleAuthError(error as AuthError);
    }
  }

  //Sign out current user
  static async signOut(): Promise<void> {
    try {
      await signOut(auth);
    } catch (error) {
      throw this.handleAuthError(error as AuthError);
    }
  }

  //Get current user role from database
  static async getUserRole(uid: string): Promise<string | null> {
    try {
      const roleRef = ref(database, `users/${uid}/role`);
      const snapshot = await get(roleRef);
      return snapshot.exists() ? snapshot.val() : null;
    } catch (error) {
      console.error("Error getting user role:", error);
      return null;
    }
  }

  //Listen to authentication state changes
  static onAuthStateChanged(callback: (user: User | null) => void) {
    return onAuthStateChanged(auth, callback);
  }

  //Get current user
  static getCurrentUser(): User | null {
    return auth.currentUser;
  }

  //Handle Firebase auth errors
  private static handleAuthError(error: AuthError): Error {
    const errorMessages: { [key: string]: string } = {
      'auth/user-not-found': 'No se encontró una cuenta con este email.',
      'auth/wrong-password': 'Contraseña incorrecta.',
      'auth/invalid-credential': 'Email o contraseña incorrectos.',
      'auth/email-already-in-use': 'Este email ya está registrado.',
      'auth/weak-password': 'La contraseña debe tener al menos 6 caracteres.',
      'auth/invalid-email': 'Email inválido.',
      'auth/too-many-requests': 'Demasiados intentos fallidos. Intenta más tarde.',
      'auth/network-request-failed': 'Error de conexión. Verifica tu internet.',
    };

    const message = errorMessages[error.code] || error.message || 'Error de autenticación desconocido.';
    return new Error(message);
  }
} 