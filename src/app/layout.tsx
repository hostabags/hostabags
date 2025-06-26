import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import { AuthContextProvider } from "@/contexts/AuthContext";
import Header from "@/components/layout/header/Header";
import Footer from '@/components/layout/footer/Footer';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hostabags",
  description: "Your luggage storage solution",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContextProvider>
          <Header />
          <main>
            {children}
          </main>
          <Footer />
        </AuthContextProvider>
      </body>
    </html>
  );
}
