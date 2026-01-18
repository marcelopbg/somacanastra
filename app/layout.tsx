import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: 'Calculadora de Pontos Canastra e Pontos Buraco',
    template: '%s | Soma Canastra',
  },
  description:
    'Calculadora online de pontos de canastra e pontos de buraco. ' +
    'Some a pontuação do jogo de forma rápida, correta e sem erros.',
  keywords: [
    'pontos canastra',
    'pontos buraco',
    'calculadora de canastra',
    'calculadora de pontos canastra',
    'calculadora de pontos buraco',
    'pontuação canastra',
    'pontuação buraco',
    'canastra',
    'buraco',
    'jogo de cartas',
  ],
  openGraph: {
    title: 'Calculadora de Pontos Canastra e Pontos Buraco',
    description:
      'Calcule os pontos da canastra e do buraco de forma simples, rápida e correta.',
    type: 'website',
    locale: 'pt_BR',
  },
  icons: {
    icon: 'favicon.ico',
  },
  robots: {
    index: true,
    follow: true,
  },
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased m-0 flex place-items-center min-w-[320px] font-[system-ui,Avenir,Helvetica,Arial,sans-serif] leading-[1.5] font-normal text-[#213547] bg-white dark:text-[rgba(255,255,255,0.87)] dark:bg-[#242424]`}
        style={{ colorScheme: 'light dark' }}
      >
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-1TDH264J5N"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-1TDH264J5N');
          `}
        </Script>

        {children}
      </body>
    </html>
  );
}
