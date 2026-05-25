'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Link2, Send, ShieldCheck, Wallet, CheckCircle2, ArrowUpRight, PlusCircle, Copy } from 'lucide-react';
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { SWIFTLINK_ABI, SWIFTLINK_ADDRESS, CUSD_ADDRESS, ERC20_ABI } from '@/lib/contracts';
import { toast } from 'sonner';
import { parseUnits } from 'viem';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';

export default function PayClient({ params, searchParams }: { params: { username: string }, searchParams: { amount?: string, desc?: string, token?: string } }) {
  const { username } = params;
  const { address, isConnected } = useAccount();
  // Strip any non-numeric characters (e.g. "$ 5" -> "5") from the incoming amount param
  const requestedAmount = (searchParams.amount || '').replace(/[^0-9.]/g, '').trim();
  const [amount, setAmount] = React.useState(requestedAmount);
  const [description] = React.useState(searchParams.desc || '');
  
  const { data: profileData, isLoading: isResolving } = useReadContract({
    address: SWIFTLINK_ADDRESS,
    abi: SWIFTLINK_ABI,
    functionName: 'profiles',
    args: [username],
  });

  const recipient = profileData?.[1];
  const isValidUser = recipient && recipient !== '0x0000000000000000000000000000000000000000' && profileData?.[3] === true;

  const requestedToken = (searchParams.token === 'cUSD' || searchParams.token === 'CELO') ? searchParams.token : null;
  const [tokenType, setTokenType] = React.useState<'cUSD' | 'CELO'>(requestedToken || 'cUSD');

  // Check allowance for ERC20
  const { data: allowanceData, refetch: refetchAllowance } = useReadContract({
    address: tokenType === 'cUSD' ? CUSD_ADDRESS : undefined,
    abi: ERC20_ABI,
    functionName: 'allowance',
    args: address ? [address, SWIFTLINK_ADDRESS] : undefined,
    query: {
      enabled: !!address && tokenType === 'cUSD',
    }
  });

  const amountInWei = React.useMemo(() => {
    try {
      return amount ? parseUnits(amount, 18) : 0n;
    } catch {
      return 0n;
    }
  }, [amount]);

  const needsApproval = tokenType === 'cUSD' && (allowanceData as bigint || 0n) < amountInWei;

  const { writeContract, data: hash, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  // Distinguish between approval and payment based on state
  const [isApproving, setIsApproving] = React.useState(false);

  const handleApprove = () => {
    if (!amount || isNaN(Number(amount))) return;
    setIsApproving(true);
    writeContract({
      address: CUSD_ADDRESS,
      abi: ERC20_ABI,
      functionName: 'approve',
      args: [SWIFTLINK_ADDRESS, amountInWei],
    }, {
      onError: (error) => {
        console.error(error);
        setIsApproving(false);
        toast.error(error.message.split('\n')[0] || 'Approval failed');
      }
    });
  };

  const handlePay = () => {
    if (!amount || isNaN(Number(amount))) {
      toast.error('Please enter a valid amount');
      return;
    }
    const tokenAddress = tokenType === 'cUSD' ? CUSD_ADDRESS : '0x0000000000000000000000000000000000000000';
    setIsApproving(false);
    writeContract({
      address: SWIFTLINK_ADDRESS,
      abi: SWIFTLINK_ABI,
      functionName: 'payUser',
      args: [username, tokenAddress, amountInWei],
      value: tokenType === 'CELO' ? amountInWei : 0n,
    }, {
      onError: (error) => {
        console.error(error);
        toast.error(error.message.split('\n')[0] || 'Payment failed to initiate');
      }
    });
  };

  const [paymentSuccessData, setPaymentSuccessData] = React.useState<{ hash: string, amount: string, token: string } | null>(null);

  React.useEffect(() => {
    if (isSuccess) {
      if (isApproving) {
        toast.success(`Approved ${amount} ${tokenType}`);
        refetchAllowance();
      } else {
        toast.success(`Sent ${amount} ${tokenType} to ${username}!`);
        setPaymentSuccessData({ hash: hash as string, amount, token: tokenType });
      }
    }
  }, [isSuccess, isApproving, amount, tokenType, username, refetchAllowance, hash]);

  if (isResolving) {
    return (
      <div className="container flex items-center justify-center min-h-[calc(100vh-64px)] py-12">
        <div className="w-full max-w-md glass rounded-2xl p-8 glow-border">
          <div className="flex flex-col items-center mb-8">
            <Skeleton className="w-16 h-16 rounded-2xl mb-4 bg-white/5" />
            <Skeleton className="w-48 h-8 mb-2 bg-white/5" />
            <Skeleton className="w-32 h-4 bg-white/5" />
          </div>
          <div className="space-y-6">
            <div className="space-y-2">
              <Skeleton className="w-full h-14 rounded-xl bg-white/5" />
            </div>
            <Skeleton className="w-full h-14 rounded-xl bg-white/5" />
          </div>
        </div>
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
            <a href="/">Back to Home</a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-64px)] py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        {paymentSuccessData ? (
          <div className="glass rounded-none [clip-path:polygon(0_20px,20px_0,100%_0,100%_calc(100%-20px),calc(100%-20px)_100%,0_100%)] overflow-hidden glow-border p-10 text-center relative border-none">
            <div className="absolute inset-0 bg-emerald-500/5 glow-green pointer-events-none" />
            
            <motion.div 
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="inline-flex items-center justify-center w-24 h-24 rounded-none [clip-path:polygon(50%_0%,100%_25%,100%_75%,50%_100%,0%_75%,0%_25%)] bg-emerald-500/10 mb-8 border border-emerald-500/30 relative shadow-[0_0_30px_rgba(16,185,129,0.2)]"
            >
              <div className="absolute inset-0 bg-emerald-400/20 blur-xl" />
              <CheckCircle2 className="w-12 h-12 text-emerald-400 relative z-10" />
            </motion.div>
            
            <motion.h2 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-4xl font-black mb-3 text-white tracking-tight"
            >
              PAYMENT SENT
            </motion.h2>
            
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="p-6 bg-white/[0.02] rounded-none [clip-path:polygon(0_10px,10px_0,100%_0,100%_calc(100%-10px),calc(100%-10px)_100%,0_100%)] border border-white/[0.08] mb-10 mt-6 relative overflow-hidden"
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
              <p className="text-xs text-muted-foreground uppercase tracking-[0.2em] font-bold mb-2">Transaction Value</p>
              <div className="text-4xl font-black text-primary flex items-center justify-center gap-2 glow-text">
                {paymentSuccessData.amount} <span className="text-xl text-primary/70">{paymentSuccessData.token}</span>
              </div>
              <p className="text-sm font-medium mt-3 text-white/80">Delivered to @{username}</p>
              
              {requestedAmount && (
                <div className="mt-5 pt-5 border-t border-white/[0.06]">
                  {Number(paymentSuccessData.amount) >= Number(requestedAmount) ? (
                    <div className="inline-flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider bg-emerald-400/10 px-4 py-2 rounded-none [clip-path:polygon(0_5px,5px_0,100%_0,100%_calc(100%-5px),calc(100%-5px)_100%,0_100%)] border border-emerald-400/20">
                      <CheckCircle2 className="w-4 h-4" />
                      Requested Amount Paid
                    </div>
                  ) : (
                    <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider bg-amber-400/10 px-4 py-2 rounded-none [clip-path:polygon(0_5px,5px_0,100%_0,100%_calc(100%-5px),calc(100%-5px)_100%,0_100%)] border border-amber-400/20">
                      <ShieldCheck className="w-4 h-4" />
                      Partial Payment (Req: {requestedAmount})
                    </div>
                  )}
                </div>
              )}
            </motion.div>

            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="space-y-4"
            >
              <Button asChild variant="outline" className="w-full h-14 rounded-none [clip-path:polygon(10px_0,100%_0,100%_calc(100%-10px),calc(100%-10px)_100%,0_100%,0_10px)] bg-white/[0.03] hover:bg-white/[0.08] border-white/10 group text-sm uppercase tracking-widest font-bold">
                <a href={`https://celoscan.io/tx/${paymentSuccessData.hash}`} target="_blank" rel="noopener noreferrer">
                  View on Explorer
                  <ArrowUpRight className="ml-2 h-4 w-4 text-muted-foreground group-hover:text-white transition-colors" />
                </a>
              </Button>
              
              <Button asChild className="w-full h-14 rounded-none [clip-path:polygon(10px_0,100%_0,100%_calc(100%-10px),calc(100%-10px)_100%,0_100%,0_10px)] shadow-lg shadow-primary/20 hover:shadow-primary/40 group bg-primary/20 hover:bg-primary/30 text-primary border-none relative overflow-hidden text-sm uppercase tracking-widest font-bold glow-green">
                <Link href="/register">
                  <span className="absolute inset-0 border border-primary/50 [clip-path:polygon(10px_0,100%_0,100%_calc(100%-10px),calc(100%-10px)_100%,0_100%,0_10px)] pointer-events-none" />
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Create your own SwiftLink
                </Link>
              </Button>
            </motion.div>
          </div>
        ) : (
          <div className="glass rounded-none [clip-path:polygon(0_20px,20px_0,100%_0,100%_calc(100%-20px),calc(100%-20px)_100%,0_100%)] overflow-hidden glow-border relative border-none">
          {/* Animated Neon accent bar */}
          <div className="h-1.5 w-full bg-gradient-to-r from-transparent via-primary to-transparent shimmer absolute top-0 inset-x-0 z-20" />
          
          {/* Header */}
          <div className="text-center p-8 pb-4">
            <div className="flex justify-center mb-5">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary border border-primary/20">
                <span className="text-2xl font-black uppercase">{username[0]}</span>
              </div>
            </div>
            <h1 className="text-2xl font-black mb-1">Pay @{username}</h1>
            <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
              <ShieldCheck className="h-3 w-3 text-emerald-400" />
              <span>Verified SwiftLink User</span>
            </div>
            {description && (
              <div className="mt-5 p-4 bg-white/[0.03] rounded-xl border border-white/[0.06] text-sm italic text-muted-foreground">
                &ldquo;{description}&rdquo;
              </div>
            )}
          </div>

          {/* Body */}
          <div className="px-8 pb-8 space-y-5">
            <div className="p-3 bg-white/[0.03] rounded-xl border border-white/[0.06] text-center relative group">
              <p className="text-[10px] text-muted-foreground uppercase tracking-[0.15em] font-bold mb-1">Recipient</p>
              <div className="flex items-center justify-center gap-2">
                <p className="text-xs font-mono text-muted-foreground">
                  {(recipient as string) || 'Resolving...'}
                </p>
                {recipient && (
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(recipient as string);
                      toast.success('Address copied!');
                    }}
                    className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-white/10 rounded-md"
                    title="Copy Address"
                  >
                    <Copy className="h-3 w-3 text-muted-foreground" />
                  </button>
                )}
              </div>
            </div>

            {/* Token Toggle */}
            <div className="flex p-1 bg-white/[0.03] rounded-none [clip-path:polygon(0_10px,10px_0,100%_0,100%_calc(100%-10px),calc(100%-10px)_100%,0_100%)] border border-white/[0.06] relative">
              {(['cUSD', 'CELO'] as const).map(token => (
                <button 
                  key={token}
                  className={`flex-1 py-2.5 text-sm font-bold rounded-none transition-all duration-300 relative ${
                    tokenType === token 
                      ? 'text-primary-foreground shadow-lg shadow-primary/20 z-10' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                  } ${requestedToken ? 'opacity-50 cursor-not-allowed' : ''} [clip-path:polygon(0_10px,10px_0,100%_0,100%_calc(100%-10px),calc(100%-10px)_100%,0_100%)]`}
                  onClick={() => {
                    if (!requestedToken) setTokenType(token)
                  }}
                  disabled={!!requestedToken}
                >
                  {tokenType === token && (
                    <div className="absolute inset-0 bg-primary/20 border border-primary/50 -z-10 [clip-path:polygon(0_10px,10px_0,100%_0,100%_calc(100%-10px),calc(100%-10px)_100%,0_100%)]" />
                  )}
                  {token}
                </button>
              ))}
            </div>

            {/* Amount */}
            <div className="space-y-2">
              <Label htmlFor="amount" className="text-xs font-bold uppercase tracking-[0.1em] text-muted-foreground flex justify-between">
                Amount
                <span className="text-[10px] normal-case font-normal tracking-normal text-primary/70">{tokenType} · Celo Mainnet</span>
              </Label>
              <div className="relative group">
                <div className="absolute inset-0 bg-primary/20 blur-md opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 rounded-none [clip-path:polygon(0_10px,10px_0,100%_0,100%_calc(100%-10px),calc(100%-10px)_100%,0_100%)]" />
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-black text-primary/60 z-10 transition-colors group-focus-within:text-primary glow-text">
                  {tokenType === 'cUSD' ? '$' : 'Ⓒ'}
                </span>
                <Input
                  id="amount"
                  type="number"
                  placeholder="0.00"
                  className="pl-12 h-16 text-3xl font-black bg-white/[0.02] border-white/[0.08] rounded-none [clip-path:polygon(0_10px,10px_0,100%_0,100%_calc(100%-10px),calc(100%-10px)_100%,0_100%)] focus-visible:ring-0 focus-visible:border-primary/50 relative z-10 tracking-wider shadow-[inset_0_0_20px_rgba(255,255,255,0.02)] focus:shadow-[inset_0_0_20px_rgba(53,208,127,0.1)] transition-all placeholder:text-white/10"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  disabled={isPending || isConfirming}
                />
              </div>
            </div>

            <div className="flex items-center gap-2 p-3 bg-primary/5 rounded-xl border border-primary/10 text-xs text-primary/80">
              <Wallet className="h-3.5 w-3.5 flex-shrink-0" />
              <span>Near-zero gas fees on the Celo network.</span>
            </div>

            {needsApproval ? (
              <Button 
                className="w-full h-16 text-base font-bold rounded-none relative overflow-hidden bg-primary/10 hover:bg-primary/20 text-primary border-none [clip-path:polygon(15px_0,100%_0,100%_calc(100%-15px),calc(100%-15px)_100%,0_100%,0_15px)] active:scale-[0.98] transition-all group glow-green" 
                size="lg"
                disabled={!amount || isPending || isConfirming || !isConnected || amountInWei === 0n}
                onClick={handleApprove}
              >
                <span className="absolute inset-0 border border-primary/50 [clip-path:polygon(15px_0,100%_0,100%_calc(100%-15px),calc(100%-15px)_100%,0_100%,0_15px)] pointer-events-none" />
                <span className="relative z-10 flex items-center justify-center font-black tracking-widest uppercase">
                  {(isPending || isConfirming) ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      {isPending ? 'Approving...' : 'Confirming...'}
                    </>
                  ) : (
                    <>
                      Approve {tokenType}
                      <CheckCircle2 className="ml-2 h-5 w-5 group-hover:text-white transition-colors" />
                    </>
                  )}
                </span>
              </Button>
            ) : (
              <Button 
                className="w-full h-16 text-base font-bold rounded-none relative overflow-hidden bg-primary/10 hover:bg-primary/20 text-primary border-none [clip-path:polygon(15px_0,100%_0,100%_calc(100%-15px),calc(100%-15px)_100%,0_100%,0_15px)] active:scale-[0.98] transition-all group glow-green" 
                size="lg"
                disabled={!amount || isPending || isConfirming || !isConnected || amountInWei === 0n}
                onClick={handlePay}
              >
                <span className="absolute inset-0 border border-primary/50 [clip-path:polygon(15px_0,100%_0,100%_calc(100%-15px),calc(100%-15px)_100%,0_100%,0_15px)] pointer-events-none" />
                <span className="relative z-10 flex items-center justify-center font-black tracking-widest uppercase">
                  {(isPending || isConfirming) ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      {isPending ? 'Requesting...' : 'Sending...'}
                    </>
                  ) : (
                    <>
                      Send Payment
                      <Send className="ml-2 h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-white transition-all" />
                    </>
                  )}
                </span>
              </Button>
            )}

            {!isConnected && (
              <p className="text-xs text-center text-muted-foreground uppercase tracking-wider font-bold">Connect wallet to send.</p>
            )}
          </div>
        </div>
        )}
      </motion.div>
    </div>
  );
}
