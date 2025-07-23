import type { Metadata } from "next";
import Header from "../components/Header";
import "./globals.css";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Edward Chan Website",
  description: "Get to know me!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col justify-start font-sans max-h-screen">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
