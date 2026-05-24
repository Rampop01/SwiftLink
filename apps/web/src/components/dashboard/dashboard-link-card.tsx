import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Copy, Link2, Share2, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

interface DashboardLinkCardProps {
  username?: string;
  paymentLink: string;
}

export function DashboardLinkCard({ username, paymentLink }: DashboardLinkCardProps) {
  const copyToClipboard = () => {
    if (!paymentLink) return;
    navigator.clipboard.writeText(paymentLink);
    toast.success("Link copied to clipboard!");
  };

  const shareLink = () => {
    if (navigator.share) {
      navigator.share({
        title: 'SwiftLink Payment Link',
        text: `Pay me via SwiftLink:`,
        url: paymentLink,
      }).catch(console.error);
    } else {
      copyToClipboard();
    }
  };

  return (
    <div className="md:col-span-2 glass rounded-2xl p-6 relative overflow-hidden group glow-border">
      <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
        <Link2 className="h-32 w-32 -rotate-12" />
      </div>
      <div className="flex items-center gap-3 mb-1">
        <p className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground">Your Payment Link</p>
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20">
          <ShieldCheck className="h-2.5 w-2.5 text-primary" />
          <span className="text-[9px] font-black uppercase tracking-wider text-primary">Verified</span>
        </div>
      </div>
      <p className="text-sm text-muted-foreground mb-5">Share this link to receive cUSD and CELO</p>
      {username ? (
        <div className="flex items-center gap-2 p-4 bg-white/[0.03] rounded-xl border border-white/[0.06] transition-all hover:border-primary/30 hover-glow hover-shine group/link">
          <span className="text-base font-bold truncate flex-1 text-primary group-hover/link:text-foreground transition-colors">{paymentLink}</span>
          <Button size="icon" variant="ghost" onClick={copyToClipboard} className="h-9 w-9 rounded-lg hover:bg-white/10">
            <Copy className="h-4 w-4" />
          </Button>
          <Button 
            size="icon" 
            variant="ghost" 
            className="h-9 w-9 rounded-lg hover:bg-white/10"
            onClick={shareLink}
          >
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div className="p-6 bg-white/[0.02] rounded-xl border border-dashed border-white/[0.08] text-center">
          <p className="text-sm text-muted-foreground mb-4">Register a username to get your link</p>
          <Button size="sm" className="rounded-xl font-semibold" asChild>
            <Link href="/register">Register Handle</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
