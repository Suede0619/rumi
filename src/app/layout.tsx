import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  Cormorant_Unicase,
  Cormorant_Upright,
} from "next/font/google";
import "./globals.css";

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-garamond",
  display: "swap",
});

const cormorantUnicase = Cormorant_Unicase({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-unicase",
  display: "swap",
});

const cormorantUpright = Cormorant_Upright({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-upright",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rumi",
  description: "Rumi Landing Page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${cormorantGaramond.variable} ${cormorantUnicase.variable} ${cormorantUpright.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
