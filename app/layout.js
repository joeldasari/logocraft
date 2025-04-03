import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";

import "./globals.css";
import Provider from "@/providers/provider";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "LogoCraft - AI Logo Generator",
  description: "An AI-Powered Logo Generator",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" className="dark">
        {/* I've added this head tag to link the favicon manually  */}
        <head>
          <link rel="icon" href="/favicon.png" />
        </head>
        <body className={`${inter.className} body antialiased`}>
          <Provider>{children}</Provider>
          <Toaster richColors />
        </body>
      </html>
    </ClerkProvider>
  );
}
