import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CartProvider from "./components/Provider";
import Navbar from "./components/Nevbar";
import ShoppingCartModal from "./components/ShoppingCartModal";
import {
  ClerkProvider,

} from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClerkProvider>
          <html lang="en">
            <body>
            <CartProvider>
              <Navbar />
              <ShoppingCartModal />
              {children}
            </CartProvider>
            </body>
          </html>
        </ClerkProvider>
      </body>
    </html>
  );
}
