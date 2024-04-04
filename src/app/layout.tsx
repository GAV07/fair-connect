import type { Metadata, Viewport } from "next";
import { Inter, Spline_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });
const spline = Spline_Sans({ subsets: ["latin"] });
const grotesk = Space_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "2024 Venture Miami Hiring Fair",
  description: "Connect locally with companies in Miami",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={spline.className}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
