'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Link2, Send, ShieldCheck, Wallet, CheckCircle2 } from 'lucide-react';
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { SWIFTLINK_ABI, SWIFTLINK_ADDRESS, CUSD_ADDRESS, ERC20_ABI } from '@/lib/contracts';
import { toast } from 'sonner';
import { parseUnits } from 'viem';

export default function PayClient({ params, searchParams }: { params: { username: string }, searchParams: { amount?: string, desc?: string } }) {
  const { username } = params;
  const { address, isConnected } = useAccount();
  const [amount, setAmount] = React.useState(searchParams.amount || '');
  const [description] = React.useState(searchParams.desc || '');
  
  const { data: profileData, isLoading: isResolving } = useReadContract({
    address: SWIFTLINK_ADDRESS,
    abi: SWIFTLINK_ABI,
    functionName: 'profiles',
    args: [username],
  });

  const recipient = profileData?.[1];
  const isValidUser = recipient && recipient !== '0x0000000000000000000000000000000000000000' && profileData?.[3] === true;

  const [tokenType, setTokenType] = React.useState<'cUSD' | 'CELO'>('cUSD');

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
    });
  };

  React.useEffect(() => {
    if (isSuccess) {
      if (isApproving) {
        toast.success(`Approved ${amount} ${tokenType}`);
        refetchAllowance();
      } else {
        toast.success(`Sent ${amount} ${tokenType} to ${username}!`);
        setAmount('');
      }
    }
  }, [isSuccess, isApproving, amount, tokenType, username, refetchAllowance]);

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
        <div className="glass rounded-2xl overflow-hidden glow-border">
          {/* Green accent bar */}
          <div className="h-1 bg-gradient-to-r from-primary via-accent to-primary" />
          
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
            <div className="p-3 bg-white/[0.03] rounded-xl border border-white/[0.06] text-center">
              <p className="text-[10px] text-muted-foreground uppercase tracking-[0.15em] font-bold mb-1">Recipient</p>
              <p className="text-xs font-mono text-muted-foreground">
                {(recipient as string) || 'Resolving...'}
              </p>
            </div>

            {/* Token Toggle */}
            <div className="flex p-1 bg-white/[0.03] rounded-xl border border-white/[0.06]">
              {(['cUSD', 'CELO'] as const).map(token => (
                <button 
                  key={token}
                  className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${
                    tokenType === token 
                      ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                  onClick={() => setTokenType(token)}
                >
                  {token}
                </button>
              ))}
            </div>

            {/* Amount */}
            <div className="space-y-2">
              <Label htmlFor="amount" className="text-xs font-bold uppercase tracking-[0.1em] text-muted-foreground flex justify-between">
                Amount
                <span className="text-[10px] normal-case font-normal tracking-normal">{tokenType} · Celo Mainnet</span>
              </Label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl font-black text-muted-foreground/40">
                  {tokenType === 'cUSD' ? '$' : 'Ⓒ'}
                </span>
                <Input
                  id="amount"
                  type="number"
                  placeholder="0.00"
                  className="pl-10 h-14 text-2xl font-black bg-white/[0.03] border-white/[0.08] rounded-xl focus-visible:ring-primary/30"
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
                className="w-full h-14 text-base font-bold rounded-xl shadow-xl shadow-primary/20 hover:shadow-primary/30 active:scale-[0.98] transition-all group" 
                size="lg"
                disabled={!amount || isPending || isConfirming || !isConnected || amountInWei === 0n}
                onClick={handleApprove}
              >
                {(isPending || isConfirming) ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    {isPending ? 'Approving...' : 'Confirming...'}
                  </>
                ) : (
                  <>
                    Approve {tokenType}
                    <CheckCircle2 className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            ) : (
              <Button 
                className="w-full h-14 text-base font-bold rounded-xl shadow-xl shadow-primary/20 hover:shadow-primary/30 active:scale-[0.98] transition-all group" 
                size="lg"
                disabled={!amount || isPending || isConfirming || !isConnected || amountInWei === 0n}
                onClick={handlePay}
              >
                {(isPending || isConfirming) ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    {isPending ? 'Requesting...' : 'Sending...'}
                  </>
                ) : (
                  <>
                    Send Payment
                    <Send className="ml-2 h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </>
                )}
              </Button>
            )}

            {!isConnected && (
              <p className="text-xs text-center text-muted-foreground">Connect wallet to send.</p>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
