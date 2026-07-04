import { Manrope, Playfair_Display } from "next/font/google";
import "./globals.css";
import AppProviders from "@/components/providers/AppProviders";
import AppShell from "@/components/shell/AppShell";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
});

export const metadata = {
  title: "Trendy Threads",
  description:
    "Premium fashion storefront with secure checkout, account history, and seamless backend integrations.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${manrope.variable} ${playfair.variable} font-sans text-slate-900 antialiased`}
      >
        <AppProviders>
          <AppShell>{children}</AppShell>
        </AppProviders>
      </body>
    </html>
  );
}
