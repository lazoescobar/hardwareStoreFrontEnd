import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import SessionAuthProvider from "@/context/SessionAuthProvider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HardwareStore"
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="container-fluid">
          <SessionAuthProvider>
            {children}
          </SessionAuthProvider>
        </main>
      </body>
    </html>
  );
}
