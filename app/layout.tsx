import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import { WagmiContext } from "@/context/wagmiContext";
import { Toaster } from "@/components/ui/sonner";




const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "3 Wheeler Bike Club | Ownership, Community & Governance",
  description: "P2P Financing Platform for the 3 Wheeler Bike Club",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body
        className={`${geistMono.className}`}
      >
        <WagmiContext>
          {children}
          <Toaster expand={true} richColors />
        </WagmiContext>
      </body>
    </html>
  );
}
