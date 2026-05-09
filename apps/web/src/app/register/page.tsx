'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CheckCircle2, AlertCircle, Loader2, Link2 } from 'lucide-react';
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
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

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
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md text-center"
        >
          <Card className="border-2 border-green-500/20 shadow-2xl shadow-green-500/5 bg-background/50 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <div className="flex justify-center mb-6">
                <div className="h-20 w-20 rounded-full bg-green-500/10 flex items-center justify-center">
                  <CheckCircle2 className="h-10 w-10 text-green-500" />
                </div>
              </div>
              <CardTitle className="text-3xl font-black">You&apos;re Live! 🚀</CardTitle>
              <CardDescription className="text-base mt-2">
                Your payment link is ready to share with the world.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 bg-primary/5 rounded-xl border-2 border-primary/10">
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Your Link</p>
                <p className="text-lg font-black text-primary">swiftlink.me/pay/{username}</p>
              </div>
              <Button className="w-full h-14 text-lg font-bold shadow-xl" size="lg" asChild>
                <a href="/dashboard">Go to Dashboard →</a>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-64px)] py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Card className="border-2 shadow-xl bg-background/50 backdrop-blur-sm">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <Link2 className="h-8 w-8 text-primary" />
              </div>
            </div>
            <CardTitle className="text-3xl font-bold">Claim your link</CardTitle>
            <CardDescription className="text-lg">
              Choose a unique username for your payment link.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-sm font-semibold">Your Username</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">
                  swiftlink.me/pay/
                </span>
                <Input
                  id="username"
                  placeholder="john"
                  className={`pl-[125px] h-12 text-lg font-medium transition-all ${
                    isAvailable ? "border-green-500 shadow-[0_0_15px_rgba(34,197,94,0.2)] ring-1 ring-green-500/20" : ""
                  }`}
                  value={username}
                  onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, ''))}
                  disabled={isPending || isConfirming}
                />
              </div>
              
              <div className="min-h-[24px] px-1">
                {isChecking && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground animate-pulse">
                    <Loader2 className="h-3 w-3 animate-spin" />
                    Checking availability...
                  </div>
                )}
                {isAvailable && (
                  <div className="flex items-center gap-2 text-sm text-green-500 font-medium">
                    <CheckCircle2 className="h-3 w-3" />
                    Username is available!
                  </div>
                )}
                {isTaken && (
                  <div className="flex items-center gap-2 text-sm text-destructive font-medium">
                    <AlertCircle className="h-3 w-3" />
                    Username is already taken.
                  </div>
                )}
              </div>
            </div>

            {!isConnected && (
              <div className="p-4 bg-muted/50 rounded-lg border border-border text-center">
                <p className="text-sm text-muted-foreground mb-3">Please connect your wallet to continue</p>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full h-12 text-lg font-bold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all active:scale-[0.98]" 
              size="lg"
              disabled={!isAvailable || !isConnected || isPending || isConfirming}
              onClick={handleRegister}
            >
              {(isPending || isConfirming) ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  {isPending ? 'Requesting...' : 'Confirming...'}
                </>
              ) : (
                'Register Username'
              )}
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
