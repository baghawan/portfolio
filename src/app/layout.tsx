import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { LazyMotion, domMax } from "motion/react";
import { DEFAULT_SEO } from "@/constants";
import { ThemeProvider } from "@/components/common/ThemeProvider";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import "@/styles/globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
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
      <body className={`${manrope.variable}`}>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <LazyMotion features={domMax}>
            <Header />

            <main className='pt-20 flex flex-col gap-16'>{children}</main>
            <Footer />
          </LazyMotion>
        </ThemeProvider>
      </body>
    </html>
  );
}
