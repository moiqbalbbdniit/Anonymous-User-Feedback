import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/app/globals.css';

import Navbar from '@/components/Navbar';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Iqbals Project',
  description: 'Real feedback from real people.',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" >
      
        <body className={inter.className}>
          
          {children}
         
        </body>
      
    </html>
  );
}