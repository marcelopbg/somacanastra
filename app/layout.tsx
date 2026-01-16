import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
    default: 'Calculadora de Canastra Online',
    template: '%s | Canastra'
  },
  description:
    'Calculadora gratuita de pontuação de Canastra. ' +
    'Calcule canastras limpas, sujas, curingas e penalidades.',
  keywords: [
    'canastra',
    'calculadora de canastra',
    'pontuação canastra',
    'regras da canastra',
    'jogo de cartas'
  ],
  openGraph: {
    title: 'Calculadora de Canastra',
    description:
      'Calcule a pontuação da Canastra de forma rápida e precisa.',
    type: 'website',
    locale: 'pt_BR'
  },
  robots: {
    index: true,
    follow: true
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
