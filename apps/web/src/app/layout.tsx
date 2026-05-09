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
            <div className="fixed inset-0 -z-10 bg-background overflow-hidden">
              <div className="absolute inset-0 bg-grid opacity-[0.15]" />
              {/* Celo Green Glow */}
              <div className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] bg-emerald-500/20 rounded-full blur-[120px] animate-float mix-blend-screen" />
              {/* Accent Gold Glow */}
              <div className="absolute bottom-[-10%] right-[10%] w-[500px] h-[500px] bg-amber-500/15 rounded-full blur-[100px] animate-float mix-blend-screen" style={{ animationDelay: '3s' }} />
              {/* Deep Purple Glow */}
              <div className="absolute top-[40%] left-[-10%] w-[400px] h-[400px] bg-purple-500/15 rounded-full blur-[120px] mix-blend-screen" />
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
