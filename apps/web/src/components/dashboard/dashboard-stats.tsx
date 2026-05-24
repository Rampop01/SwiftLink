import { Card, CardContent } from "@/components/ui/card";
import { Tooltip } from "@/components/ui/tooltip";
import { ArrowDownLeft, Users } from "lucide-react";

interface DashboardStatsProps {
  totalCusd: number;
  totalCelo: number;
  uniquePayers: number;
}

export function DashboardStats({ totalCusd, totalCelo, uniquePayers }: DashboardStatsProps) {
  return (
    <div className="md:col-span-1 space-y-6">
      <Card className="rounded-[1.5rem]">
        <CardContent className="pt-8 pb-8">
          <div className="flex items-center justify-between mb-4">
            <Tooltip content="Sum of all payments received across supported tokens">
              <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground border-b border-dashed border-white/20 cursor-help">Total Volume</p>
            </Tooltip>
            <div className="h-8 w-8 rounded-full bg-green-500/10 flex items-center justify-center">
              <ArrowDownLeft className="h-4 w-4 text-green-500" />
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <div className="text-3xl font-black">{totalCusd.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground font-medium">cUSD</p>
            </div>
            <div>
              <div className="text-3xl font-black">{totalCelo.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground font-medium">CELO</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="rounded-[1.5rem]">
        <CardContent className="pt-8 pb-8">
          <div className="flex items-center justify-between mb-4">
            <Tooltip content="Number of unique wallet addresses that paid you">
              <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground border-b border-dashed border-white/20 cursor-help">Unique Payers</p>
            </Tooltip>
            <div className="h-8 w-8 rounded-full bg-blue-500/10 flex items-center justify-center">
              <Users className="h-4 w-4 text-blue-500" />
            </div>
          </div>
          <div className="text-4xl font-black">{uniquePayers}</div>
          <p className="text-xs text-muted-foreground mt-2 font-medium">Verified addresses</p>
        </CardContent>
      </Card>
    </div>
  );
}
