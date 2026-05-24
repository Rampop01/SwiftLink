"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tooltip } from "@/components/ui/tooltip";
import { ArrowDownLeft, Users, Activity } from "lucide-react";

interface DashboardStatsProps {
  totalCusd: number;
  totalCelo: number;
  uniquePayers: number;
  totalTxns?: number;
}

function useCountUp(target: number, duration = 1200) {
  const [count, setCount] = React.useState(0);
  React.useEffect(() => {
    if (target === 0) { setCount(0); return; }
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(target * eased);
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, duration]);
  return count;
}

export function DashboardStats({ totalCusd, totalCelo, uniquePayers, totalTxns = 0 }: DashboardStatsProps) {
  const animatedCusd = useCountUp(totalCusd);
  const animatedCelo = useCountUp(totalCelo);
  const animatedPayers = useCountUp(uniquePayers);
  const animatedTxns = useCountUp(totalTxns);

  return (
    <div className="md:col-span-1 space-y-4">
      <Card className="rounded-[1.5rem]">
        <CardContent className="pt-6 pb-6">
          <div className="flex items-center justify-between mb-4">
            <Tooltip content="Sum of all payments received across supported tokens">
              <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground border-b border-dashed border-white/20 cursor-help">Total Volume</p>
            </Tooltip>
            <div className="h-8 w-8 rounded-full bg-green-500/10 flex items-center justify-center">
              <ArrowDownLeft className="h-4 w-4 text-green-500" />
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <div className="text-3xl font-black tabular-nums">{animatedCusd.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground font-medium">cUSD</p>
            </div>
            <div>
              <div className="text-3xl font-black tabular-nums">{animatedCelo.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground font-medium">CELO</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-[1.5rem]">
        <CardContent className="pt-6 pb-6">
          <div className="flex items-center justify-between mb-4">
            <Tooltip content="Number of unique wallet addresses that paid you">
              <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground border-b border-dashed border-white/20 cursor-help">Unique Payers</p>
            </Tooltip>
            <div className="h-8 w-8 rounded-full bg-blue-500/10 flex items-center justify-center">
              <Users className="h-4 w-4 text-blue-500" />
            </div>
          </div>
          <div className="text-4xl font-black tabular-nums">{Math.round(animatedPayers)}</div>
          <p className="text-xs text-muted-foreground mt-2 font-medium">Verified addresses</p>
        </CardContent>
      </Card>

      <Card className="rounded-[1.5rem]">
        <CardContent className="pt-6 pb-6">
          <div className="flex items-center justify-between mb-4">
            <Tooltip content="Total number of payment transactions received">
              <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground border-b border-dashed border-white/20 cursor-help">Transactions</p>
            </Tooltip>
            <div className="h-8 w-8 rounded-full bg-purple-500/10 flex items-center justify-center">
              <Activity className="h-4 w-4 text-purple-500" />
            </div>
          </div>
          <div className="text-4xl font-black tabular-nums">{Math.round(animatedTxns)}</div>
          <p className="text-xs text-muted-foreground mt-2 font-medium">All time</p>
        </CardContent>
      </Card>
    </div>
  );
}
