import { NavBar } from '@/components/NavBar'
import './globals.css'

export const metadata = {
  title: 'A2SV Group 46 data',
  description: 'a2sv group 46 data',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <NavBar/>
        {children}</body>
    </html>
  )
}
