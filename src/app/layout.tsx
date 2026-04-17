import type { Metadata } from "next";
import { Outfit, Caveat, Fredoka } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
});

const fredoka = Fredoka({
  subsets: ["latin"],
  variable: "--font-fredoka",
});

export const metadata: Metadata = {
  title: "Our Love Journey ❤️",
  description: "A digital scrapbook of our favorite memories together.",
  icons: {
    icon: "/heart.svg",
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
        className={`${outfit.variable} ${caveat.variable} ${fredoka.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
