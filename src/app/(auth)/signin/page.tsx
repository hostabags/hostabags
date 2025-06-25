"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/layout/header/Header";
import { getBookings } from "@/utils/localStorage";
import { PreBookingI } from "@/types/preBooking";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInFormValues, signInSchema } from "@/validations/signSchema";
import useAuth from "@/hooks/useAuth";

export default function SignIn() {
  const [bookingDetails, setBookingDetails] = useState<PreBookingI | null>(null);
  const router = useRouter();
  const { signIn } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
  });

  useEffect(() => {
    const bookings = getBookings();
    if (bookings) {
      setBookingDetails({ ...bookings });
    }
  }, []);

  const onSubmit = async (data: SignInFormValues) => {
    try {
      await signIn(data.email, data.password);
      if (bookingDetails) {
        router.push("/confirm");
      } else {
        router.push("/");
      }
    } catch (error) {
      console.error("Failed to sign in", error);
    }
  };

  return (
    <>
      <Header />
      <main className="container ">
        <div className="form-container ">
          <h1>Sign in to your account</h1>
          <form className="form-group" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                type="email"
                autoComplete="email"
                required
                className="appearance-none"
                placeholder="Email address"
                {...register("email")}
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none "
                placeholder="Password"
                {...register("password")}
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
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
