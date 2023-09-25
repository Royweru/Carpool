import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from './components/Navbar'
import Clientonly from './components/Clientonly'
import Modal from './components/modals/Modal'
import LoginModal from './components/modals/LoginModal'
import RegisterModal from './components/modals/RegisterModal'
import { getCurrentUser } from '@/session/getServerSession'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CarPool',
  description: 'Welcome to carpool your ultimate car buyer and seller!',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser()
  return (
    <html lang="en">
      <Clientonly>
       <RegisterModal />
      <LoginModal />
      <Navbar currentUser = {currentUser} />
      </Clientonly>
      
      <body className={inter.className}>{children}</body>
    </html>
  )
}
