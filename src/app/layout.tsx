import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "./provider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Stepful Schedule App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html className="h-full" lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-full bg-[#F0E2D3]`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
