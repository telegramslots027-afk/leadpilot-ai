import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ChatBoost AI | AI customer assistant for dealerships and small businesses",
  description:
    "A bilingual AI customer enquiry demo for US car dealerships and growing small businesses."
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
