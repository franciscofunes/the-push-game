import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Provider from './components/Provider'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })
import { Press_Start_2P } from 'next/font/google';

export const metadata: Metadata = {
  title: 'The Push Game',
  description: 'A pop it fidget game',
}

const dancingScript = Press_Start_2P({
  subsets: ['latin'],
  weight: '400'
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={dancingScript.className}>
      <body className="min-h-screen mx-auto max-w-6xl flex flex-col bg-white dark:bg-gray-900">
        <Provider>
          <Navbar />
          <main className="flex flex-col flex-1 max-w-6xl w-full  ">
            {children}
          </main>
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
