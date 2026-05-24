import { Activity, Wallet, UserPlus } from "lucide-react";

interface ExplorerStatsProps {
  isLoading: boolean;
  stats: {
    txns: number;
    volumeCusd: number;
    volumeCelo: number;
    users: number;
  };
}

export function ExplorerStats({ isLoading, stats }: ExplorerStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="glass-strong rounded-2xl p-6 glow-border relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
          <Activity className="h-24 w-24" />
        </div>
        <p className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground mb-1">Total Transactions</p>
        <div className="text-3xl font-black text-gradient mt-4">{isLoading ? "-" : stats.txns}</div>
      </div>
      <div className="glass-strong rounded-2xl p-6 glow-border relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
          <Wallet className="h-24 w-24" />
        </div>
        <p className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground mb-1">Total Volume</p>
        <div className="flex flex-col gap-1 mt-4">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-gradient">{isLoading ? "-" : stats.volumeCusd.toFixed(2)}</span>
            <span className="text-sm font-bold text-muted-foreground">cUSD</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-gradient">{isLoading ? "-" : stats.volumeCelo.toFixed(2)}</span>
            <span className="text-sm font-bold text-muted-foreground">CELO</span>
          </div>
        </div>
      </div>
      <div className="glass-strong rounded-2xl p-6 glow-border relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
          <UserPlus className="h-24 w-24" />
        </div>
        <p className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground mb-1">Registered Users</p>
        <div className="text-3xl font-black text-gradient mt-4">{isLoading ? "-" : stats.users}</div>
      </div>
    </div>
  );
}
