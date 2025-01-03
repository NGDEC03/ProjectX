import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ScrollBarProps } from "@/context/ScrollBar";
import { ThemeProvider } from "@/context/ThemeContext";
import Navbar from "@/components/layout/Navbar";
import NextTopLoader from 'nextjs-toploader';
import { UserContext } from "@/context/userContext";
import { Toaster } from "@/components/ui/toaster";
import { QueryProvider } from "@/context/QueryProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "project X",
  description: "project x description",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryProvider>

          <UserContext>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <NextTopLoader
                showSpinner={false}
                color="#5eead4"
              />
              <ScrollBarProps>
                <Navbar />
                {children}
                <Toaster />
              </ScrollBarProps>
            </ThemeProvider>
          </UserContext>
        </QueryProvider>
      </body>
    </html>
  );
}
