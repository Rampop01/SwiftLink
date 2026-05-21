import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import './globals.css';

import { Navbar } from '@/components/navbar';
import { MobileNav } from '@/components/mobile-nav';
import { Footer } from '@/components/footer';
import { Web3Provider } from '@/components/Web3Provider';
import { Toaster } from 'sonner';

const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });

export const metadata: Metadata = {
  title: 'SwiftLink | Get Paid Instantly on Celo — No Hex Addresses',
  description: 'Turn your wallet into a human-readable payment link. Claim swiftlink/pay/yourname and receive cUSD or CELO instantly. Zero fees. Built for MiniPay.',
  keywords: 'celo, payments, crypto, minipay, payment link, cusd, swiftlink',
  openGraph: {
    title: 'SwiftLink | Get Paid Instantly on Celo — No Hex Addresses',
    description: 'Turn your wallet into a human-readable payment link. Claim swiftlink/pay/yourname and receive cUSD or CELO instantly. Zero fees. Built for MiniPay.',
    url: 'https://swiftlink.me',
    siteName: 'SwiftLink',
    images: [
      {
        url: 'https://swiftlink.me/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SwiftLink | Get Paid Instantly on Celo — No Hex Addresses',
    description: 'Turn your wallet into a human-readable payment link. Claim swiftlink/pay/yourname and receive cUSD or CELO instantly. Zero fees. Built for MiniPay.',
    images: ['https://swiftlink.me/og-image.png'],
  },
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
              {/* Custom Image Background */}
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 mix-blend-screen" 
                style={{ backgroundImage: 'url(/bg-glow.png)' }} 
              />
              
              {/* Shiny Overlay: Radial Gradient Spotlight */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(52,211,153,0.1),transparent_70%)]" />
              
              {/* Noise Texture for that premium feel */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

              {/* Grid texture */}
              <div className="absolute inset-0 bg-grid opacity-[0.05]" />
            </div>

            <Navbar />
            <main className="flex-1 pb-24 md:pb-0">
              {children}
            </main>
            <MobileNav />
            <Footer />
          </div>
        </Web3Provider>
      </body>
    </html>
  );
}
