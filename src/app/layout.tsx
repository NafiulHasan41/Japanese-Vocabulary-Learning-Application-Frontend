import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import AuthProvider from "@/provider/AuthProvider";
import Navbar from "@/components/global/navbar/Navbar";
import Footer from "@/components/global/footer/Footer";
// import { headers } from "next/headers";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "JP-Wordsmith | Lessons",
  description: "As this is a private route, user needs to login to access this page . And also no home page only lesson page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  // const pathname = headers().get("x-nextjs-page-path") || "/";
  // console.log("pathname", pathname);
  // const isAdminRoute = pathname.startsWith("/admin");
  // console.log("isAdminRoute", isAdminRoute);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
        {/* {!isAdminRoute && <Navbar />} */}
        <Navbar />
        <div className="min-h-[calc(100vh-4rem)]">
        {children}
        </div>  
        
        <Toaster/>
        <Footer />
        {/* {!isAdminRoute && <Footer />} */}
        </AuthProvider>
      </body>
    </html>
  );
}
