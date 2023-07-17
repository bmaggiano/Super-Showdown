// app/layout.tsx
import './globals.css'
// import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'

// const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Super Showdown',
  description: 'Put your knowledge to the test against an opponent library of over 700+ characters!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  )
}
