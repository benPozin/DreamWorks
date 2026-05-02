import type { Metadata } from "next";
import { Figtree, Noto_Sans, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { AnnouncementBar } from "@/components/site/announcement-bar";
import { AuthProvider } from "@/lib/auth";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const noto = Noto_Sans({
  variable: "--font-noto",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "DreamWorks Dental Laboratories | Full-Service Dental Lab",
  description:
    "Florida dental lab: thirty years of precision craftsmanship. Crowns, implants, milling, and bespoke VIP cases for professionals who don't compromise.",
  metadataBase: new URL("https://dreamworksdental.example"),
  icons: {
    icon: [{ url: "/brand/logo-lockup-square.png", type: "image/png" }],
    apple: [{ url: "/brand/logo-lockup-square.png", type: "image/png", sizes: "180x180" }],
  },
  openGraph: {
    images: [{ url: "/brand/logo-lockup-square.png", alt: "DreamWorks Dental Laboratories" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${figtree.variable} ${noto.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg text-fg" suppressHydrationWarning>
        <AuthProvider>
          <AnnouncementBar />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
