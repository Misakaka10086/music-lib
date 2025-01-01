import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Box } from "@mui/material";
import { Footer } from "./components/Footer/Footer";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import GoogleAnalytics from "@/app/lib/GoogleAnalytics";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "糖芋小宝的选歌台",
  description: "这里是糖芋小宝的歌曲选歌台，欢迎点歌！",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <GoogleAnalytics />
        <UserProvider>{children}</UserProvider>
      </body>
    </html>
  );
}
