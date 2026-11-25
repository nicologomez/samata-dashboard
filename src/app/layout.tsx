import type { Metadata } from "next";
import { Besley, Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
});

const besley = Besley({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-besley",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Samata Health",
    default: "Samata Health",
  },
  description: "Privacy-aware mental health benefits platform",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${poppins.variable} ${besley.variable}`}>
      <body className="type-paragraph-small">{children}</body>
    </html>
  );
}
