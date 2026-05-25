'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Loader2, Link2, ExternalLink, ShieldCheck, QrCode, ArrowRight } from 'lucide-react';
import { useReadContract } from 'wagmi';
import { SWIFTLINK_ABI, SWIFTLINK_ADDRESS } from '@/lib/contracts';
import { shortenAddress } from '@/lib/utils';
import Link from 'next/link';
import { toast } from 'sonner';
import { ShareModal } from '@/components/ShareModal';

export default function ProfileClient({ params }: { params: { username: string } }) {
  const { username } = params;
  
  const { data: profileData, isLoading: isResolving } = useReadContract({
    address: SWIFTLINK_ADDRESS,
    abi: SWIFTLINK_ABI,
    functionName: 'profiles',
    args: [username],
  });

  const wallet = profileData?.[1];
  const metadataStr = profileData?.[2] || '';
  const isActive = profileData?.[3] === true;
  
  // Try to parse metadata if it's JSON (we currently store plain strings or empty, but let's be robust)
  let metadata: { bio?: string; pfp?: string } = {};
  try {
    if (metadataStr && metadataStr.startsWith('{')) {
      metadata = JSON.parse(metadataStr);
    } else if (metadataStr) {
      metadata.bio = metadataStr;
    }
  } catch (e) {
    // Ignore parsing errors
  }

  const isValidUser = wallet && wallet !== '0x0000000000000000000000000000000000000000' && isActive;

  const [isShareModalOpen, setIsShareModalOpen] = React.useState(false);
  const [baseUrl, setBaseUrl] = React.useState("https://swiftlink.me");
  
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      setBaseUrl(`${window.location.protocol}//${window.location.host}`);
    }
  }, []);

  const paymentLink = `${baseUrl}/pay/${username}`;

  if (isResolving) {
    return (
      <div className="container flex items-center justify-center min-h-[calc(100vh-64px)]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isValidUser) {
    return (
      <div className="container flex items-center justify-center min-h-[calc(100vh-64px)] py-12 text-center">
        <div className="max-w-md glass rounded-2xl p-10 glow-border">
          <div className="inline-flex p-4 bg-red-500/10 rounded-2xl mb-6">
            <Link2 className="h-8 w-8 text-red-400" />
          </div>
          <h1 className="text-2xl font-black mb-3">User Not Found</h1>
          <p className="text-sm text-muted-foreground mb-6">
            <span className="font-bold text-foreground">@{username}</span> hasn&apos;t registered on SwiftLink yet.
          </p>
          <Button asChild variant="outline" className="rounded-xl border-white/10 hover:bg-white/5">
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container max-w-2xl min-h-[calc(100vh-64px)] py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Profile Header */}
          <div className="glass rounded-none [clip-path:polygon(0_20px,20px_0,100%_0,100%_calc(100%-20px),calc(100%-20px)_100%,0_100%)] overflow-hidden glow-border mb-6">
            <div className="h-32 bg-gradient-to-r from-primary/30 via-accent/20 to-primary/30 relative">
              <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay shimmer" />
              <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
            </div>
            
            <div className="px-8 pb-8 pt-0 relative">
              <div className="flex justify-between items-end mb-4 -mt-12 relative z-10">
                <div className="relative group cursor-pointer">
                  <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full group-hover:bg-primary/40 transition-colors duration-500" />
                  {metadata.pfp ? (
                    <img 
                      src={metadata.pfp} 
                      alt={username} 
                      className="w-24 h-24 border-0 object-cover bg-background relative z-10 [clip-path:polygon(50%_0%,100%_25%,100%_75%,50%_100%,0%_75%,0%_25%)] shadow-2xl"
                    />
                  ) : (
                    <div className="w-24 h-24 bg-primary/10 flex items-center justify-center text-primary backdrop-blur-md relative z-10 [clip-path:polygon(50%_0%,100%_25%,100%_75%,50%_100%,0%_75%,0%_25%)] border border-primary/30 shadow-[0_0_15px_rgba(53,208,127,0.3)]">
                      <span className="text-4xl font-black uppercase">{username[0]}</span>
                    </div>
                  )}
                </div>
                
                <Button 
                  asChild 
                  className="relative overflow-hidden bg-primary/10 hover:bg-primary/20 text-primary border-none rounded-none [clip-path:polygon(15px_0,100%_0,100%_calc(100%-15px),calc(100%-15px)_100%,0_100%,0_15px)] h-12 px-6 group transition-all duration-300 glow-green"
                  size="lg"
                >
                  <Link href={`/pay/${username}`}>
                    <span className="absolute inset-0 border border-primary/50 [clip-path:polygon(15px_0,100%_0,100%_calc(100%-15px),calc(100%-15px)_100%,0_100%,0_15px)] pointer-events-none" />
                    <span className="relative z-10 flex items-center font-black tracking-widest uppercase text-sm">
                      Pay Me
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 group-hover:text-white transition-all" />
                    </span>
                  </Link>
                </Button>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="text-3xl font-black">@{username}</h1>
                  <ShieldCheck className="h-5 w-5 text-emerald-400" />
                </div>
                
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(wallet as string);
                    toast.success("Address copied to clipboard!");
                  }}
                  className="flex items-center gap-2 text-sm font-mono text-muted-foreground hover:text-foreground transition-colors group mb-4"
                >
                  {shortenAddress(wallet as string)}
                  <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>

                <p className="text-muted-foreground">
                  {metadata.bio || `Welcome to my SwiftLink profile! You can send me crypto payments easily on the Celo network.`}
                </p>
              </div>
            </div>
          </div>

          {/* Action Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div 
              className="glass rounded-none [clip-path:polygon(0_15px,15px_0,100%_0,100%_calc(100%-15px),calc(100%-15px)_100%,0_100%)] p-6 glow-border group cursor-pointer hover:bg-white/[0.04] transition-colors"
              onClick={() => setIsShareModalOpen(true)}
            >
              <div className="h-12 w-12 rounded-none [clip-path:polygon(0_10px,10px_0,100%_0,100%_calc(100%-10px),calc(100%-10px)_100%,0_100%)] bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-primary/20 transition-all border border-primary/20">
                <QrCode className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-bold mb-1 tracking-wide uppercase text-sm">QR Code</h3>
              <p className="text-sm text-muted-foreground">Show QR code to receive payments in person.</p>
            </div>
            <div 
              className="glass rounded-none [clip-path:polygon(0_15px,15px_0,100%_0,100%_calc(100%-15px),calc(100%-15px)_100%,0_100%)] p-6 glow-border group cursor-pointer hover:bg-white/[0.04] transition-colors"
              onClick={() => setIsShareModalOpen(true)}
            >
              <div className="h-12 w-12 rounded-none [clip-path:polygon(0_10px,10px_0,100%_0,100%_calc(100%-10px),calc(100%-10px)_100%,0_100%)] bg-accent/10 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-accent/20 transition-all border border-accent/20">
                <Link2 className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-bold mb-1 tracking-wide uppercase text-sm">Share Link</h3>
              <p className="text-sm text-muted-foreground">Copy your payment link to share on socials.</p>
            </div>
          </div>
        </motion.div>
      </div>

      <ShareModal 
        isOpen={isShareModalOpen} 
        onClose={() => setIsShareModalOpen(false)} 
        paymentLink={paymentLink}
        username={username}
      />
    </>
  );
}
