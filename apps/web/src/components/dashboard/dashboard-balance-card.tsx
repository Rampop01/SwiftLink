import { Wallet } from "lucide-react";

interface DashboardBalanceCardProps {
  balanceData?: {
    formatted: string;
    symbol: string;
  };
}

export function DashboardBalanceCard({ balanceData }: DashboardBalanceCardProps) {
  return (
    <div className="glass-strong rounded-2xl p-6 relative overflow-hidden glow-border">
      <div className="absolute top-0 right-0 w-24 h-24 bg-primary/15 blur-[50px] -mr-8 -mt-8" />
      <p className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground mb-1 flex items-center gap-2">
        <Wallet className="h-3.5 w-3.5" /> Wallet Balance
      </p>
      <div className="text-4xl font-black tracking-[-0.03em] mt-6 mb-3 text-gradient">
        {balanceData ? `${parseFloat(balanceData.formatted).toFixed(2)}` : "0.00"}
      </div>
      <p className="text-xs text-muted-foreground font-semibold">
        {balanceData?.symbol || "CELO"} · Celo Mainnet
      </p>
    </div>
  );
}
