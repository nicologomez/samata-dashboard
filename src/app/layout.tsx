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
  title: "Samata Health | Employer Dashboard",
  description: "Privacy-aware employer benefits dashboard demo",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${besley.variable}`}>
        {children}
      </body>
    </html>
  );
}
