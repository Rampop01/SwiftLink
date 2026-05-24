'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Users, Send, CheckCircle2 } from 'lucide-react';
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { SWIFTLINK_BATCH_ABI, SWIFTLINK_BATCH_ADDRESS, CUSD_ADDRESS, ERC20_ABI } from '@/lib/contracts';
import { toast } from 'sonner';
import { parseUnits } from 'viem';

export default function BatchClient() {
  const { address, isConnected } = useAccount();
  const [usernamesInput, setUsernamesInput] = React.useState('');
  const [amountPerUser, setAmountPerUser] = React.useState('');
  const [tokenType, setTokenType] = React.useState<'cUSD' | 'CELO'>('cUSD');

  const usernames = usernamesInput
    .split(',')
    .map(u => u.trim().toLowerCase().replace(/[^a-z0-9]/g, ''))
    .filter(u => u.length >= 3);

  const amountInWei = React.useMemo(() => {
    try {
      return amountPerUser ? parseUnits(amountPerUser, 18) : 0n;
    } catch {
      return 0n;
    }
  }, [amountPerUser]);

  const totalAmountInWei = amountInWei * BigInt(usernames.length);

  // Check allowance for ERC20
  const { data: allowanceData, refetch: refetchAllowance } = useReadContract({
    address: tokenType === 'cUSD' ? CUSD_ADDRESS : undefined,
    abi: ERC20_ABI,
    functionName: 'allowance',
    args: address ? [address, SWIFTLINK_BATCH_ADDRESS] : undefined,
    query: {
      enabled: !!address && tokenType === 'cUSD',
    }
  });

  const needsApproval = tokenType === 'cUSD' && (allowanceData as bigint || 0n) < totalAmountInWei;

  const { writeContract, data: hash, isPending, error: writeError } = useWriteContract();
  const { isLoading: isConfirming, isSuccess, error: confirmError } = useWaitForTransactionReceipt({ hash });

  const [isApproving, setIsApproving] = React.useState(false);

  const handleApprove = () => {
    if (totalAmountInWei === 0n) return;
    setIsApproving(true);
    writeContract({
      address: CUSD_ADDRESS,
      abi: ERC20_ABI,
      functionName: 'approve',
      args: [SWIFTLINK_BATCH_ADDRESS, totalAmountInWei],
    });
  };

  const handlePay = () => {
    if (totalAmountInWei === 0n || usernames.length === 0) return;
    const tokenAddress = tokenType === 'cUSD' ? CUSD_ADDRESS : '0x0000000000000000000000000000000000000000';
    setIsApproving(false);
    
    const amountsArray = usernames.map(() => amountInWei);

    writeContract({
      address: SWIFTLINK_BATCH_ADDRESS,
      abi: SWIFTLINK_BATCH_ABI,
      functionName: 'batchPayUsers',
      args: [usernames, tokenAddress, amountsArray],
      value: tokenType === 'CELO' ? totalAmountInWei : 0n,
    });
  };

  React.useEffect(() => {
    if (isSuccess) {
      if (isApproving) {
        toast.success(`Approved ${amountPerUser} ${tokenType} per user (Total: ${Number(amountPerUser) * usernames.length})`);
        refetchAllowance();
      } else {
        toast.success(`Sent batch payment to ${usernames.length} users!`);
        setUsernamesInput('');
        setAmountPerUser('');
      }
    }
  }, [isSuccess, isApproving, amountPerUser, tokenType, usernames.length, refetchAllowance]);

  React.useEffect(() => {
    if (writeError || confirmError) {
      toast.error(writeError?.message || confirmError?.message || 'Transaction failed');
    }
  }, [writeError, confirmError]);

  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-64px)] py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <div className="glass rounded-2xl overflow-hidden glow-border">
          <div className="h-1 bg-gradient-to-r from-accent via-primary to-accent" />
          
          <div className="text-center p-6 sm:p-8 pb-4">
            <div className="flex justify-center mb-5">
              <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center text-accent border border-accent/20">
                <Users className="h-8 w-8" />
              </div>
            </div>
            <h1 className="text-2xl font-black mb-1">Batch Payments</h1>
            <p className="text-sm text-muted-foreground">Send tokens to multiple users in one transaction.</p>
          </div>

          <div className="px-6 sm:px-8 pb-6 sm:pb-8 space-y-5">
            <div className="space-y-2">
              <Label htmlFor="usernames" className="text-xs font-bold uppercase tracking-[0.1em] text-muted-foreground">
                Recipients (Comma separated)
              </Label>
              <textarea
                id="usernames"
                rows={3}
                placeholder="alice, bob, charlie"
                className="w-full p-3 text-sm font-mono bg-white/[0.03] border border-white/[0.08] rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30 resize-none"
                value={usernamesInput}
                onChange={(e) => setUsernamesInput(e.target.value)}
                disabled={isPending || isConfirming}
              />
              <p className="text-[10px] text-accent font-bold text-right">
                {usernames.length} valid users parsed
              </p>
            </div>

            <div className="flex p-1 bg-white/[0.03] rounded-xl border border-white/[0.06]">
              {(['cUSD', 'CELO'] as const).map(token => (
                <button 
                  key={token}
                  className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${
                    tokenType === token 
                      ? 'bg-accent text-accent-foreground shadow-lg shadow-accent/20' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                  onClick={() => setTokenType(token)}
                >
                  {token}
                </button>
              ))}
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount" className="text-xs font-bold uppercase tracking-[0.1em] text-muted-foreground flex flex-col sm:flex-row sm:justify-between gap-1">
                <span>Amount per user</span>
                <span className="text-[10px] normal-case font-normal tracking-normal text-muted-foreground">
                  Total: {amountPerUser && usernames.length ? (Number(amountPerUser) * usernames.length).toFixed(4) : '0.00'} {tokenType}
                </span>
              </Label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl font-black text-muted-foreground/40">
                  {tokenType === 'cUSD' ? '$' : 'Ⓒ'}
                </span>
                <Input
                  id="amount"
                  type="number"
                  placeholder="0.00"
                  className="pl-10 h-14 text-2xl font-black bg-white/[0.03] border-white/[0.08] rounded-xl focus-visible:ring-accent/30"
                  value={amountPerUser}
                  onChange={(e) => setAmountPerUser(e.target.value)}
                  disabled={isPending || isConfirming}
                />
              </div>
            </div>

            {needsApproval ? (
              <Button 
                className="w-full h-14 text-base font-bold rounded-xl shadow-xl shadow-accent/20 hover:shadow-accent/30 active:scale-[0.98] transition-all bg-accent hover:bg-accent/90 group" 
                size="lg"
                disabled={!amountPerUser || isPending || isConfirming || !isConnected || usernames.length === 0}
                onClick={handleApprove}
              >
                {(isPending || isConfirming) ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    {isPending ? 'Approving...' : 'Confirming...'}
                  </>
                ) : (
                  <>
                    Approve Total {tokenType}
                    <CheckCircle2 className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            ) : (
              <Button 
                className="w-full h-14 text-base font-bold rounded-xl shadow-xl shadow-accent/20 hover:shadow-accent/30 active:scale-[0.98] transition-all bg-accent hover:bg-accent/90 group" 
                size="lg"
                disabled={!amountPerUser || isPending || isConfirming || !isConnected || usernames.length === 0}
                onClick={handlePay}
              >
                {(isPending || isConfirming) ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    {isPending ? 'Requesting...' : 'Sending...'}
                  </>
                ) : (
                  <>
                    Send Batch Payment
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
