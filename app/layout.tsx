import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "每日运势——您的八字专属版",
  description: "基于WebCal协议的八字运势订阅",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
