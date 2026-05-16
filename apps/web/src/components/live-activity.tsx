"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Zap } from "lucide-react";
import Link from "next/link";

import { usePublicClient, useWatchContractEvent } from "wagmi";
import { SWIFTLINK_ABI, SWIFTLINK_ADDRESS } from "@/lib/contracts";
import { formatUnits } from "viem";

interface Activity {
  id: string;
  user: string;
  amount: string;
  time: string;
}

export function LiveActivity() {
  const [activities, setActivities] = React.useState<Activity[]>([
    { id: "p1", user: "alex.celo", amount: "10.00 CELO", time: "just now" },
    { id: "p2", user: "sarah.eth", amount: "5.50 CELO", time: "2m ago" },
  ]);
  const [index, setIndex] = React.useState(0);
  const publicClient = usePublicClient();

  const fetchRecentEvents = React.useCallback(async () => {
    if (!publicClient) return;
    try {
      const logs = await publicClient.getLogs({
        address: SWIFTLINK_ADDRESS,
        event: {
          type: 'event',
          name: 'PaymentReceived',
          inputs: [
            { type: 'address', name: 'from', indexed: true },
            { type: 'address', name: 'to', indexed: true },
            { type: 'uint256', name: 'amount' },
            { type: 'address', name: 'token' }
          ],
        },
        fromBlock: BigInt(20000000), // Recent blocks
        maxBlocks: 10000,
      });

      const formatted = await Promise.all(logs.slice(-5).map(async (log: any) => {
        const username = await publicClient.readContract({
          address: SWIFTLINK_ADDRESS,
          abi: SWIFTLINK_ABI,
          functionName: 'addressToUsername',
          args: [log.args.to],
        });
        return {
          id: log.transactionHash,
          user: username || "anonymous",
          amount: `${parseFloat(formatUnits(log.args.amount, 18)).toFixed(2)} CELO`,
          time: "verified"
        };
      }));

      if (formatted.length > 0) {
        setActivities(formatted);
      }
    } catch (e) {
      console.error(e);
    }
  }, [publicClient]);

  React.useEffect(() => {
    fetchRecentEvents();
  }, [fetchRecentEvents]);

  useWatchContractEvent({
    address: SWIFTLINK_ADDRESS,
    abi: SWIFTLINK_ABI,
    eventName: 'PaymentReceived',
    onLogs() {
      fetchRecentEvents();
    },
  });

  React.useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % activities.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [activities.length]);

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto">
      <div className="flex items-center gap-2 mb-4">
        <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Live Activity</span>
      </div>
      
      <Link 
        href={`/pay/${activities[index].user}`}
        className="relative h-16 w-full overflow-hidden glass rounded-2xl border border-white/5 flex items-center px-6 hover:border-primary/30 transition-all group/activity"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activities[index].id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center justify-between w-full"
          >
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center group-hover/activity:scale-110 transition-transform">
                <CheckCircle2 className="h-4 w-4 text-primary" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-foreground group-hover/activity:text-primary transition-colors">@{activities[index].user}</span>
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{activities[index].time}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-3 w-3 text-primary fill-primary" />
              <span className="text-sm font-black text-primary">{activities[index].amount}</span>
            </div>
          </motion.div>
        </AnimatePresence>
      </Link>
    </div>
  );
}
