import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ryan Corp AI FrontDesk | Always-on customer assistant",
  description: "Preview Ryan Corp AI FrontDesk, a mobile-first customer enquiry assistant for small businesses."
};

export default function FrontDeskLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
