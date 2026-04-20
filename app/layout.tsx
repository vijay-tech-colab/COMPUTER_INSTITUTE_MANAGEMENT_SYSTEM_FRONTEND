import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Providers from "./providers";

// 🔥 Body font (clean + readable)
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

// ✨ Heading font (premium feel)
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700"],
});

// 💻 Mono font
const mono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "CIMS - Institute Management System",
  description: "Modern management system for computer institutes",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full antialiased",
        inter.variable,
        jakarta.variable,
        mono.variable
      )}
    >
      <body className="min-h-full bg-gray-50 text-gray-900 font-sans">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}