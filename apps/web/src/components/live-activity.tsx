"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Zap } from "lucide-react";

const activities = [
  { id: 1, user: "alex.celo", amount: "10 cUSD", time: "just now" },
  { id: 2, user: "sarah.eth", amount: "5 CELO", time: "2m ago" },
  { id: 3, user: "mike_dev", amount: "25 cUSD", time: "5m ago" },
  { id: 4, user: "crypto_queen", amount: "100 cUSD", time: "8m ago" },
  { id: 5, user: "web3_builder", amount: "2 CELO", time: "12m ago" },
  { id: 6, user: "lucas_design", amount: "50 cUSD", time: "15m ago" },
  { id: 7, user: "elena.stable", amount: "15 cUSD", time: "18m ago" },
  { id: 8, user: "vitalik.fans", amount: "1 CELO", time: "22m ago" },
  { id: 9, user: "nomad_pay", amount: "200 cUSD", time: "25m ago" },
  { id: 10, user: "celo_maxi", amount: "50 CELO", time: "30m ago" },
];

export function LiveActivity() {
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % activities.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto">
      <div className="flex items-center gap-2 mb-4">
        <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Live Activity</span>
      </div>
      
      <div className="relative h-16 w-full overflow-hidden glass rounded-2xl border border-white/5 flex items-center px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activities[index].id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center justify-between w-full"
          >
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <CheckCircle2 className="h-4 w-4 text-primary" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-foreground">@{activities[index].user}</span>
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{activities[index].time}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-3 w-3 text-primary fill-primary" />
              <span className="text-sm font-black text-primary">{activities[index].amount}</span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
