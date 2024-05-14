import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { CartProvider } from "./_context/carts";
import AuthProvider from "./_providers/auth";
import { Toaster } from "@/app/_components/ui/sonner";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "FSW Food",
  description: "Um aplicativo para você fazer o pedido de seu lanche!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={poppins.className}>
        <AuthProvider>
          <CartProvider>{children}</CartProvider>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
