import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Montserrat, Roboto } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

// Import fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  display: "swap",
});

// Metadata
export const metadata: Metadata = {
  title: "EduLinker — Learn. Teach. Connect.",
  description: "A platform that connects students and tutors around the world with video calls, messaging, and learning tools.",
  keywords: [
    "tutoring",
    "education",
    "learning",
    "online teaching",
    "video call lessons",
    "student-teacher platform",
    "EduLinker",
  ],
  authors: [{ name: "Kin Leon Zinzombe" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "EduLinker",
    description: "Connect with expert tutors anytime, anywhere.",
    url: "https://edulinker.com",
    siteName: "EduLinker",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} ${roboto.variable}`}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans`}
        style={{ fontFamily: "var(--font-roboto)" }}
      >
        {children}
        <Toaster richColors expand visibleToasts={10} />
      </body>
    </html>
  );
}