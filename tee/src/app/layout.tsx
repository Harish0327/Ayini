import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";/*  */
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryProvider } from "@/components/providers/ReactQueryProvider";
import { CartProvider } from "@/contexts/CartContext";
import Navbar from "@/components/Navbar";
import WhatsAppFloat from "@/components/WhatsAppFloat";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ayini - Authentic Traditional Indian Spices & Powders",
  description: "Premium handmade traditional Indian spice blends, podi, tea powder, and masala. Authentic recipes passed through generations. Order now for home delivery.",
  keywords: "idly podi, tea powder, masala powder, indian spices, traditional food, homemade spices, ayini",
  authors: [{ name: "Ayini" }],
  icons: {
    icon: "/assets/Logo.png",
    shortcut: "/assets/Logo.png",
    apple: "/assets/Logo.png",
  },
  openGraph: {
    title: "Ayini - Authentic Traditional Indian Spices",
    description: "Premium handmade traditional Indian spice blends made with love and authentic recipes",
    type: "website",
    images: ["/assets/Logo.png"],
  },
  twitter: {
    card: "summary_large_image",
    site: "@ayini",
    images: ["/assets/Logo.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReactQueryProvider>
          <CartProvider>
            <TooltipProvider>
              <Navbar />
              <Toaster />
              <Sonner />
              {children}
              <WhatsAppFloat />
            </TooltipProvider>
          </CartProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}