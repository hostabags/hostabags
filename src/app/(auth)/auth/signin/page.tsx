"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/layout/header/Header";
import { getBookings } from "@/utils/localStorage";
import { preBooking } from "@/types/preBooking";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bookingDetails, setBookingDetails] = useState<preBooking | null>(null);
  const [error, setError] = useState("");
  const router = useRouter();
  const { signIn } = useAuth();

  useEffect(() => {
    const bookings = getBookings();
    if (bookings) {
      setBookingDetails({ ...bookings });
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signIn(email, password);
      if (bookingDetails) {
        router.push("/confirm");
      } else {
        router.push("/");
      }
    } catch (error) {
      setError("Failed to sign in" + error);
    }
  };

  return (
    <>
      <Header />
      <main className="container ">
        <div className="form-container ">
          <h1>Sign in to your account</h1>
          <form className="form-group" onSubmit={handleSubmit}>
            {error && <div className="text-red-500 text-center">{error}</div>}

            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none "
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div>
              <button type="submit" className="btn w-full">
                Sign in
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}
