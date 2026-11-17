import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ChatBoost AI | Turn website visitors into customers",
  description:
    "An AI-powered customer conversation and lead capture assistant for growing businesses."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
