import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Providers from '../components/Providers'
import { useSession } from 'next-auth/react'
import AppBar from '@/components/AppBar'

interface Props {
  children: React.ReactNode;
}

export default function RootLayout( props: Props ) {

  return (
    <html lang="en">
      <body>
        <Providers>
          <AppBar />
          {props.children}
        </Providers>
      </body>
    </html>
  )
}
