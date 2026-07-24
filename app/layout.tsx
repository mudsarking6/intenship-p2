import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://spacesync-booking.king7866.chatgpt.site"),
  title: "SpaceSync - Resource Booking",
  description: "Book the right campus or office space, right on time.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  openGraph: {
    title: "SpaceSync - Resource Booking",
    description: "Book the right space, right on time.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "SpaceSync resource booking dashboard" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SpaceSync - Resource Booking",
    description: "Book the right space, right on time.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body></html>;
}
