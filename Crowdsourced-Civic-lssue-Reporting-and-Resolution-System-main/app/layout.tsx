import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LenisProvider from "../components/providers/LenisProvider";
import ClerkProviderClient from "../components/providers/ClerkProviderClient";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "जनसेतु",
    template: "%s | जनसेतु",
  },
  description: "जनसेतु - Crowdsourced Civic Issue Reporting & Resolution Platform",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/menulogo.png", type: "image/png", sizes: "512x512" },
    ],
    shortcut: "/menulogo.png",
    apple: "/menulogo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClerkProviderClient>
          <LenisProvider>{children}</LenisProvider>
        </ClerkProviderClient>
      </body>
    </html>
  );
}
