import './globals.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'

import { DarkModeToggle } from '@/components/DarkModeToggle'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Habilita ai - Dashboard do Instrutor',
  description: 'Dashboard para instrutores do Habilita ai',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} min-h-screen bg-background relative transition-colors duration-200 overflow-x-hidden`}>
        <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(7,249,162,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(7,249,162,0.03)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

        <div className="fixed inset-0 overflow-hidden opacity-10 pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute h-1 bg-primary"
              style={{
                width: "200%",
                left: "-50%",
                top: `${i * 25}%`,
                transform: "rotate(-15deg)",
                animation: `slide-right ${8 + i * 2}s linear infinite`,
                animationDelay: `${i * 0.5}s`,
              }}
            />
          ))}
        </div>
        
        <DarkModeToggle />
        
        <div className="relative z-10">
          {children}
        </div>
        
        <Toaster position="top-right" />
      </body>
    </html>
  )
}
