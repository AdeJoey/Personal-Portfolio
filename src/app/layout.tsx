import type { Metadata } from "next";
import { Anton, Libre_Baskerville, Inter, Marcellus } from "next/font/google";
import "./globals.css";

const anton = Anton({
  weight: "400",
  variable: "--font-anton",
  subsets: ["latin"],
});

const marcellus = Marcellus({
  weight: "400",
  variable: "--font-marcellus",
  subsets: ["latin"],
});

const libreBaskerville = Libre_Baskerville({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-libre",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "IamJoey@TherapyDev | Business Owner & Developer",
  description:
    "I am passionate about creating websites that stand out from the crowd. UIUX, Web Design, Landing Page, UI Design Figma, Expert Webflow.",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${anton.variable} ${marcellus.variable} ${libreBaskerville.variable} ${inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
