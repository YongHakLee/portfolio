import type { Metadata } from "next";
import localFont from "next/font/local";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import "./globals.css";

const pretendard = localFont({
  src: "../fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  title: {
    default: "이용학 — 이력서 · 포트폴리오",
    template: "%s — 이용학",
  },
  description:
    "데이터와 AI를 연구하고, 따라 할 수 있게 가르치는 이용학의 이력서와 포트폴리오",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${pretendard.variable} h-full antialiased`}>
      <body className="min-h-full font-sans">
        <div className="min-h-dvh flex flex-col">
          <SiteHeader />
          <main className="w-full max-w-3xl mx-auto flex-1 px-6">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
