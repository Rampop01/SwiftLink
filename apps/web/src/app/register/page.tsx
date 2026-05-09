'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CheckCircle2, AlertCircle, Loader2, Link2, ArrowRight } from 'lucide-react';
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { SWIFTLINK_ABI, SWIFTLINK_ADDRESS } from '@/lib/contracts';
import { toast } from 'sonner';

export default function RegisterPage({ searchParams }: { searchParams: { username?: string } }) {
  const { address, isConnected } = useAccount();
  const [username, setUsername] = React.useState(searchParams.username || '');
  
  const { data: profileData, isLoading: isChecking } = useReadContract({
    address: SWIFTLINK_ADDRESS,
    abi: SWIFTLINK_ABI,
    functionName: 'profiles',
    args: [username],
    query: {
      enabled: username.length >= 3,
    },
  });

  const owner = profileData?.[1];
  const isAvailable = username.length >= 3 && !isChecking && owner === '0x0000000000000000000000000000000000000000';
  const isTaken = username.length >= 3 && !isChecking && owner !== '0x0000000000000000000000000000000000000000' && owner !== undefined;

  const { writeContract, data: hash, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  const handleRegister = () => {
    if (!isAvailable) return;
    writeContract({
      address: SWIFTLINK_ADDRESS,
      abi: SWIFTLINK_ABI,
      functionName: 'registerUsername',
      args: [username, ""],
    });
  };

  React.useEffect(() => {
    if (isSuccess) {
      toast.success('Username registered successfully! 🎉');
    }
  }, [isSuccess]);

  if (isSuccess) {
    return (
      <div className="container flex items-center justify-center min-h-[calc(100vh-64px)] py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md text-center"
        >
          <div className="glass-strong rounded-2xl p-10 glow-border">
            <div className="flex justify-center mb-8">
              <div className="h-20 w-20 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
                <CheckCircle2 className="h-10 w-10 text-emerald-400" />
              </div>
            </div>
            <h2 className="text-3xl font-black mb-2">You&apos;re Live! 🚀</h2>
            <p className="text-muted-foreground mb-8">Your payment link is ready to share.</p>
            <div className="p-4 bg-white/[0.03] rounded-xl border border-white/[0.06] mb-8">
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground mb-2">Your Link</p>
              <p className="text-lg font-black text-gradient">swiftlink.me/pay/{username}</p>
            </div>
            <Button className="w-full h-12 text-base font-bold rounded-xl shadow-lg shadow-primary/20 group" size="lg" asChild>
              <a href="/dashboard">
                Go to Dashboard
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-64px)] py-12">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="glass rounded-2xl p-8 glow-border">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Link2 className="h-6 w-6 text-primary" />
              </div>
            </div>
            <h1 className="text-3xl font-black tracking-[-0.02em] mb-2">Claim your link</h1>
            <p className="text-sm text-muted-foreground">Choose a unique username for your payment URL.</p>
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="username" className="text-xs font-bold uppercase tracking-[0.1em] text-muted-foreground">Username</Label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-muted-foreground font-medium">
                  swiftlink.me/pay/
                </span>
                <Input
                  id="username"
                  placeholder="john"
                  className={`pl-[130px] h-12 text-base font-semibold bg-white/[0.03] border-white/[0.08] rounded-xl transition-all focus-visible:ring-primary/30 ${
                    isAvailable ? "border-emerald-500/30 shadow-[0_0_20px_rgba(52,211,153,0.1)]" : ""
                  }`}
                  value={username}
                  onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, ''))}
                  disabled={isPending || isConfirming}
                />
              </div>
              
              <div className="min-h-[20px]">
                {isChecking && (
                  <div className="flex items-center gap-2 text-xs text-muted-foreground animate-pulse">
                    <Loader2 className="h-3 w-3 animate-spin" />
                    Checking...
                  </div>
                )}
                {isAvailable && (
                  <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold">
                    <CheckCircle2 className="h-3 w-3" />
                    Available!
                  </div>
                )}
                {isTaken && (
                  <div className="flex items-center gap-2 text-xs text-red-400 font-semibold">
                    <AlertCircle className="h-3 w-3" />
                    Already taken
                  </div>
                )}
              </div>
            </div>

            {!isConnected && (
              <div className="p-4 glass rounded-xl text-center">
                <p className="text-sm text-muted-foreground">Connect your wallet to continue</p>
              </div>
            )}

            <Button 
              className="w-full h-12 text-base font-bold rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all active:scale-[0.98]" 
              size="lg"
              disabled={!isAvailable || !isConnected || isPending || isConfirming}
              onClick={handleRegister}
            >
              {(isPending || isConfirming) ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {isPending ? 'Requesting...' : 'Confirming...'}
                </>
              ) : (
                'Register Username'
              )}
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
