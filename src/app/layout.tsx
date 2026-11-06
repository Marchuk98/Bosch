import type { Metadata, Viewport } from "next";
import { Manrope, Saira_Condensed } from "next/font/google";
import { ServiceWorker } from "@/components/ServiceWorker";
import "./globals.css";

const ui = Manrope({
  subsets: ["latin", "cyrillic"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-ui",
  display: "swap",
});

const digits = Saira_Condensed({
  subsets: ["latin"],
  weight: ["200"],
  variable: "--font-digits",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bosch WGB244A40 — панель по-русски",
  description: "Интерактивная русская панель стиральной машины Bosch Serie 8 WGB244A40: программы, кнопки, инструкции.",
  applicationName: "Стиралка",
  appleWebApp: {
    capable: true,
    title: "Стиралка",
    statusBarStyle: "default",
  },
  formatDetection: { telephone: false },
  other: { "apple-mobile-web-app-capable": "yes" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#e9e9e7",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${ui.variable} ${digits.variable}`}>
      <body>
        {children}
        <ServiceWorker />
      </body>
    </html>
  );
}
