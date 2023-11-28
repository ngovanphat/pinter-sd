import type { Metadata } from "next";
import "../globals.css";
import NavBar from "@/src/components/NavBar";

export const metadata: Metadata = {
  title: "Item detail",
  description: "Item detail",
};

export default function ItemDetailLayout({
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
