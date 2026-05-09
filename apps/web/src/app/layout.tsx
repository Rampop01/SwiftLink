import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import './globals.css';

import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Web3Provider } from '@/components/Web3Provider';
import { Toaster } from 'sonner';

const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });

export const metadata: Metadata = {
  title: 'SwiftLink | Instant Celo Payments',
  description: 'Send and receive crypto payments instantly on Celo with professional payment links.',
  other: {
    'talentapp:project_verification': 'e10cd925f87822202de169a07a91e9b9e0cf66005baf1b82befe47391793fe7122050fd07d32a5815bf6dccf33808e4de9e35567ffd3949ca55e7ac6ca00323b',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={outfit.className}>
        <Web3Provider>
          <Toaster richColors position="top-center" />
          <div className="relative flex min-h-screen flex-col">
            {/* Global Background */}
            <div className="fixed inset-0 -z-10 bg-background">
              <div className="absolute inset-0 bg-grid opacity-40" />
              <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-primary/8 rounded-full blur-[180px] animate-float" />
              <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[160px] animate-float" style={{ animationDelay: '3s' }} />
              <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[140px]" />
            </div>

            <Navbar />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </Web3Provider>
      </body>
    </html>
  );
}
