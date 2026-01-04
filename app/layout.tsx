import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Toaster } from "sonner";

const montserrat = Montserrat({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Clima - Weather Showcase",
  description: "Get accurate and up-to-date weather forecasts and current weather conditions for your location. Stay prepared with temperature, wind, and more.",
  authors: [{ name: 'Nott Nott' }],
  keywords: [
    "weather forecast",
    "current weather",
    "local weather",
    "temperature",
    "weather app",
    "forecast app",
    "wind speed",
    "humidity",
    "weather updates"
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={montserrat.className}
      >
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 py-6 md:px-16 px-6">
              {children}
              <Toaster richColors />
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
