import type { Metadata } from "next";
import "../globals.css";
import NavBar from "@/src/components/NavBar";

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
    <>
      <NavBar />
      {children}
    </>
  );
}
