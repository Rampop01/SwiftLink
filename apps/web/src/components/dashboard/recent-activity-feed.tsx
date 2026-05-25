import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDownLeft, Share2, Link2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

interface ActivityEvent {
  from: string;
  amount: string;
  timestamp: number;
  hash: string;
  token?: string;
}

interface RecentActivityFeedProps {
  events: ActivityEvent[];
  isLoadingEvents: boolean;
  username?: string;
  paymentLink: string;
  address?: string;
  onEventClick: (event: ActivityEvent) => void;
}

export function RecentActivityFeed({ 
  events, 
  isLoadingEvents, 
  username, 
  paymentLink, 
  address, 
  onEventClick 
}: RecentActivityFeedProps) {
  
  const exportCsv = () => {
    const csv = [
      ["Date", "From", "Amount", "Token", "Hash"].join(","),
      ...events.map(e => [
        new Date(e.timestamp).toISOString(),
        e.from,
        e.amount,
        e.token || 'Unknown',
        e.hash
      ].join(","))
    ].join("\n");
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', `swiftlink_activity_${username || 'user'}.csv`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    toast.success("Transaction history exported!");
  };

  const shareLink = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My SwiftLink',
          text: 'Pay me via SwiftLink:',
          url: paymentLink,
        });
      } catch (error: any) {
        if (error.name !== 'AbortError') {
          navigator.clipboard.writeText(paymentLink);
          toast.success("Link copied to clipboard!");
        }
      }
    } else {
      navigator.clipboard.writeText(paymentLink);
      toast.success("Link copied to clipboard!");
    }
  };

  return (
    <Card className="md:col-span-3 rounded-[2rem]">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
        <div>
          <CardTitle className="text-2xl font-bold">Recent Activity</CardTitle>
          <CardDescription className="font-medium text-primary/60">Live updates from the Celo network</CardDescription>
        </div>
        {events.length > 0 && (
          <Button 
            variant="outline" 
            size="sm" 
            className="h-8 px-3 rounded-lg text-xs font-bold border-white/5 hover:bg-white/5 gap-2"
            onClick={exportCsv}
          >
            <ArrowDownLeft className="h-3 w-3 rotate-180" />
            Export CSV
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {isLoadingEvents ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-3 w-48" />
                    </div>
                  </div>
                  <div className="space-y-2 text-right">
                    <Skeleton className="h-4 w-16 ml-auto" />
                    <Skeleton className="h-3 w-12 ml-auto" />
                  </div>
                </div>
              ))}
            </div>
          ) : events.length > 0 ? (
              <div className="space-y-4">
                {events.map((event, idx) => (
                  <motion.div 
                    key={event.hash}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="flex items-center justify-between p-4 rounded-2xl bg-primary/[0.02] border border-primary/5 hover:border-primary/20 transition-all group cursor-pointer"
                    onClick={() => onEventClick(event)}
                  >
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="h-10 w-10 shrink-0 rounded-full bg-green-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <ArrowDownLeft className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-bold text-sm">Payment Received</p>
                        <p className="text-xs text-muted-foreground font-mono">from {event.from.slice(0, 6)}...{event.from.slice(-4)}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-black text-green-600">
                        +{parseFloat(event.amount).toFixed(2)} <span className="text-xs">{event.token || ''}</span>
                      </p>
                      <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">
                        {new Date(event.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
          ) : username ? (
            <div className="text-center py-24 border border-dashed border-white/5 rounded-[2.5rem] bg-white/[0.01] hover:bg-white/[0.02] transition-colors group">
              <div className="relative inline-flex mb-8">
                <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full group-hover:scale-150 transition-transform duration-700" />
                <div className="relative h-20 w-20 rounded-3xl bg-primary/10 flex items-center justify-center border border-primary/20">
                  <ArrowDownLeft className="h-10 w-10 text-primary opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">No payments yet</h3>
              <p className="text-sm text-muted-foreground max-w-xs mx-auto mb-8 font-medium">Your activity feed is waiting for its first transaction. Share your link to get started!</p>
              <Button 
                variant="outline" 
                className="rounded-xl border-white/10 hover:bg-white/5 font-bold"
                onClick={shareLink}
              >
                <Share2 className="mr-2 h-4 w-4" />
                Share My Link
              </Button>
            </div>
          ) : (
            <div className="p-8 rounded-2xl bg-yellow-500/5 border-2 border-yellow-500/10 text-yellow-700 font-bold flex flex-col items-center gap-4 text-center">
              <Link2 className="h-10 w-10 opacity-40" />
              <div>
                <p className="text-lg">Handle Required</p>
                <p className="text-sm font-medium opacity-70">Register a username to see your activity feed and start receiving payments.</p>
              </div>
              <Button size="sm" variant="outline" className="border-yellow-500/20 hover:bg-yellow-500/10" asChild>
                <a href="/register">Go to Register</a>
              </Button>
            </div>
          )}
          
          {address && (
            <Button variant="ghost" className="w-full h-12 rounded-xl text-sm font-bold text-muted-foreground hover:text-primary transition-colors" asChild>
              <a href={`https://celoscan.io/address/${address}`} target="_blank" rel="noopener noreferrer">
                View all on Celoscan
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
