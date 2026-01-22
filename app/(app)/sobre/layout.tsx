import type { Metadata } from "next";
import Script from "next/script";
import "../../globals.css";

import { Roboto, Roboto_Mono } from "next/font/google";

const robotoSans = Roboto({
  variable: "--font-roboto-sans",
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  display: "swap",
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: 'Soma Canastra – Como funciona a calculadora de pontos',
  description:
    'Conheça o Soma Canastra, um aplicativo simples e rápido para somar os pontos da canastra. ' +
    'Veja como funciona a calculadora e quais pontuações são consideradas.',
  keywords: [
    'soma canastra',
    'calculadora de canastra',
    'como funciona soma canastra',
    'contagem de pontos canastra',
    'app canastra',
    'pontuação canastra',
  ],
  openGraph: {
    title: 'Soma Canastra – Calculadora de Pontos de Canastra',
    description:
      'Veja como funciona o Soma Canastra e comece a somar os pontos da canastra sem erros.',
    type: 'website',
    locale: 'pt_BR',
  },
  robots: {
    index: true,
    follow: true,
  },
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${robotoSans.variable} ${robotoMono.variable} antialiased m-0 flex place-items-center min-w-[320px] font-[system-ui,Avenir,Helvetica,Arial,sans-serif] leading-[1.5] font-normal text-[#213547] bg-white dark:text-[rgba(255,255,255,0.87)] dark:bg-[#242424] mx-auto`}
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

        <main className="w-full" style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
        >
          {children}
        </main>
      </body>
    </html>
  );
}
