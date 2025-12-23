import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DeVHiXu | Modern Web Solutions & Development",
  description: "Transforming ideas into high-performance web experiences. Expert frontend developer specializing in React, Next.js, and modern UI/UX design.",
  keywords: ["web development", "javascript", "react", "next.js", "frontend developer", "modern apps", "DeVHiXu", "Himanshu Tamrakar"],
  authors: [{ name: "Himanshu Tamrakar" }],
  openGraph: {
    title: "DeVHiXu | Modern Web Solutions & Development",
    description: "Transforming ideas into high-performance web experiences. Expert frontend developer.",
    url: "https://hixu-portfolio.vercel.app", // Replace with actual URL if different
    siteName: "DeVHiXu Portfolio",
    images: [
      {
        url: "/og-image.png", // Ensure this image exists in public folder
        width: 1200,
        height: 630,
        alt: "DeVHiXu Portfolio Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DeVHiXu | Modern Web Solutions & Development",
    description: "Transforming ideas into high-performance web experiences.",
    images: ["/og-image.png"], // Ensure this image exists
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
        {children}
      </body>
    </html>
  );
}
