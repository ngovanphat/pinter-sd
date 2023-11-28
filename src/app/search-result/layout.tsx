import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavBar from "@/src/components/NavBar";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Search Result",
  description: "Search result of the prompt",
};

export default function SearchResultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <NavBar />
      <body className={inter.className}>{children}</body>
    </html>
  );
}
