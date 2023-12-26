import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Provider from './components/Provider'
import Footer from './components/Footer'
import Navbar from './components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'The Push Game',
  description: 'A pop it fidget game',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
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
