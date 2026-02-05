import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/Footer";
import Script from 'next/script';

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "R&R Trading Company Limited | Premium Vehicles in Trinidad",
  description: "R&R Trading Company Limited - Your premier choice for Roll-on/Roll-off vehicles in Trinidad. Driving the difference with quality imports and exceptional service.",
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${outfit.variable} antialiased flex flex-col min-h-screen`}
      >
        {children}
        <Footer />
        <Script src="//code.tidio.co/tnej2zbqwbmf6fzlpbadomv1w4pve9i6.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
