import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "IPL Performance Analytics & Prediction System",
  description: "AI-Powered IPL Performance Analytics & Match Prediction Startup",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} min-h-screen flex flex-col bg-slate-900 text-slate-50`}>
        {/* Navigation placeholder */}
        <main className="flex-1">{children}</main>
        {/* Footer placeholder */}
      </body>
    </html>
  );
}
