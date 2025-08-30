import type { Metadata } from "next";
import { Reddit_Sans } from "next/font/google";
import { DEFAULT_SEO } from "@/constants";
import { ThemeProvider } from "@/components/common/ThemeProvider";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import "@/styles/globals.css";

const redditSans = Reddit_Sans({
  variable: "--font-reddit-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = DEFAULT_SEO;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='en'
      data-scroll-behavior='smooth'
      suppressHydrationWarning
    >
      <body className={`${redditSans.variable}`}>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <Header />

          <main className='flex flex-col gap-16 lg:gap-24'>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
