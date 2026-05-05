'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Link2, Send, ShieldCheck, Wallet } from 'lucide-react';
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { SWIFTLINK_ABI, SWIFTLINK_ADDRESS, CUSD_SEPOLIA_ADDRESS } from '@/lib/contracts';
import { toast } from 'sonner';
import { parseUnits } from 'viem';

export default function PayPage({ params }: { params: { username: string } }) {
  const { username } = params;
  const { address, isConnected } = useAccount();
  const [amount, setAmount] = React.useState('');
  
  // Resolve address from username
  const { data: recipient, isLoading: isResolving } = useReadContract({
    address: SWIFTLINK_ADDRESS,
    abi: SWIFTLINK_ABI,
    functionName: 'usernameToAddress',
    args: [username],
  });

  const isValidUser = recipient && recipient !== '0x0000000000000000000000000000000000000000';

  const { writeContract, data: hash, isPending } = useWriteContract();
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const [tokenType, setTokenType] = React.useState<'cUSD' | 'CELO'>('cUSD');

  const handlePay = () => {
    if (!amount || isNaN(Number(amount))) {
      toast.error('Please enter a valid amount');
      return;
    }
    
    const tokenAddress = tokenType === 'cUSD' ? CUSD_SEPOLIA_ADDRESS : '0x0000000000000000000000000000000000000000';
    const amountInWei = parseUnits(amount, 18);

    writeContract({
      address: SWIFTLINK_ADDRESS,
      abi: SWIFTLINK_ABI,
      functionName: 'payUser',
      args: [username, tokenAddress, amountInWei],
      value: tokenType === 'CELO' ? amountInWei : 0n,
    });
  };

  React.useEffect(() => {
    if (isSuccess) {
      toast.success(`Sent ${amount} ${tokenType} to ${username}!`);
      setAmount('');
    }
  }, [isSuccess, amount, username, tokenType]);

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
        <div className="max-w-md space-y-6">
          <div className="inline-flex p-4 bg-destructive/10 rounded-full">
            <Link2 className="h-10 w-10 text-destructive" />
          </div>
          <h1 className="text-3xl font-bold">User Not Found</h1>
          <p className="text-muted-foreground">
            The username <span className="font-bold text-foreground">@{username}</span> has not been registered on SwiftLink yet.
          </p>
          <Button asChild variant="outline">
            <a href="/">Back to Home</a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-64px)] py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <Card className="border-2 shadow-2xl overflow-hidden">
          <div className="h-2 bg-primary" />
          <CardHeader className="text-center pb-2">
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary border-4 border-background shadow-lg">
                <span className="text-3xl font-bold uppercase">{username[0]}</span>
              </div>
            </div>
            <CardTitle className="text-2xl font-bold">Pay @{username}</CardTitle>
            <CardDescription className="flex items-center justify-center gap-1">
              <ShieldCheck className="h-3 w-3 text-green-500" />
              Verified SwiftLink User
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-4 bg-muted/50 rounded-xl border border-border/50 text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold mb-1">Recipient Address</p>
              <p className="text-sm font-mono break-all text-foreground/80">
                {recipient as string}
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex p-1 bg-muted rounded-lg">
                <button 
                  className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${tokenType === 'cUSD' ? 'bg-background shadow-sm text-primary' : 'text-muted-foreground'}`}
                  onClick={() => setTokenType('cUSD')}
                >
                  cUSD
                </button>
                <button 
                  className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${tokenType === 'CELO' ? 'bg-background shadow-sm text-primary' : 'text-muted-foreground'}`}
                  onClick={() => setTokenType('CELO')}
                >
                  CELO
                </button>
              </div>

              <div className="space-y-3">
                <Label htmlFor="amount" className="text-sm font-semibold flex justify-between">
                  Amount to Send
                  <span className="text-xs text-muted-foreground font-normal">{tokenType} (Celo Sepolia)</span>
                </Label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-muted-foreground">
                    {tokenType === 'cUSD' ? '$' : 'C'}
                  </span>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="0.00"
                    className="pl-10 h-16 text-3xl font-bold bg-muted/30 border-2 focus-visible:ring-primary/20 transition-all"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    disabled={isPending || isConfirming}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 p-3 bg-primary/5 rounded-lg border border-primary/10 text-xs text-primary/80">
              <Wallet className="h-4 w-4" />
              <span>Payments are processed on the Celo network with near-zero fees.</span>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button 
              className="w-full h-14 text-xl font-bold shadow-xl shadow-primary/20 hover:shadow-primary/30 active:scale-[0.98] transition-all group" 
              size="lg"
              disabled={!amount || isPending || isConfirming || !isConnected}
              onClick={handlePay}
            >
              {(isPending || isConfirming) ? (
                <>
                  <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                  {isPending ? 'Requesting...' : 'Sending...'}
                </>
              ) : (
                <>
                  Send Payment
                  <Send className="ml-2 h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </>
              )}
            </Button>
            {!isConnected && (
              <p className="text-xs text-center text-muted-foreground">
                Connect your wallet to send payments.
              </p>
            )}
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
