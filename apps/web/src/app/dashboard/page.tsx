'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Copy, 
  ExternalLink, 
  TrendingUp, 
  Users, 
  Wallet, 
  ArrowUpRight, 
  ArrowDownLeft,
  QrCode,
  Share2,
  Link2
} from 'lucide-react';
import { SWIFTLINK_ABI, SWIFTLINK_ADDRESS } from '@/lib/contracts';
import { QRCodeModal } from '@/components/QRCodeModal';
import { toast } from 'sonner';
import Link from 'next/link';
import { FileText } from 'lucide-react';

export default function DashboardPage() {
  const { address, isConnected } = useAccount();
  
  // Get username for the connected address
  const { data: username, isLoading: isResolving } = useReadContract({
    address: SWIFTLINK_ADDRESS,
    abi: SWIFTLINK_ABI,
    functionName: 'addressToUsername',
    args: [address as `0x${string}`],
    query: {
      enabled: !!address,
    },
  });

  const paymentLink = username ? `swiftlink.me/pay/${username}` : '';

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`https://${paymentLink}`);
    toast.success('Link copied to clipboard!');
  };

  if (!isConnected) {
    return (
      <div className="container flex items-center justify-center min-h-[calc(100vh-64px)]">
        <Card className="max-w-md w-full text-center p-8">
          <Wallet className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-2xl font-bold mb-2">Connect Your Wallet</h2>
          <p className="text-muted-foreground mb-6">Please connect your wallet to view your personalized dashboard.</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="container py-8 max-w-7xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back{username ? `, @${username}` : ''}</p>
        </div>
        <div className="flex gap-2">
          {username && <QRCodeModal username={username} url={paymentLink} />}
          <Button variant="outline" asChild className="gap-2">
            <Link href="/request">
              <FileText className="h-4 w-4" />
              Request
            </Link>
          </Button>
          <Button className="gap-2 shadow-lg shadow-primary/20">
            <TrendingUp className="h-4 w-4" />
            Withdraw
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Your Link Card */}
        <Card className="md:col-span-2 border-2 border-primary/20 bg-primary/5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Link2 className="h-24 w-24 -rotate-12" />
          </div>
          <CardHeader>
            <CardTitle className="text-xl">Your Payment Link</CardTitle>
            <CardDescription>Share this link to receive cUSD and USDC</CardDescription>
          </CardHeader>
          <CardContent>
            {username ? (
              <div className="flex items-center gap-2 p-4 bg-background rounded-xl border-2 border-primary/10 shadow-sm">
                <span className="text-lg font-bold truncate flex-1">{paymentLink}</span>
                <Button size="icon" variant="ghost" onClick={copyToClipboard}>
                  <Copy className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="p-4 bg-muted/50 rounded-xl border border-dashed border-muted-foreground/30 text-center">
                <p className="text-sm text-muted-foreground mb-3">You haven't registered a username yet</p>
                <Button size="sm" asChild>
                  <a href="/register">Register Now</a>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Balance Card */}
        <Card className="bg-foreground text-background">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Wallet className="h-5 w-5" />
              Total Earnings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-black mb-1">$1,240.50</div>
            <p className="text-sm text-background/60">+12% from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Stats Column */}
        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-muted-foreground">Total Payments</p>
                <ArrowDownLeft className="h-4 w-4 text-green-500" />
              </div>
              <div className="text-2xl font-bold">42</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-muted-foreground">Unique Payers</p>
                <Users className="h-4 w-4 text-blue-500" />
              </div>
              <div className="text-2xl font-bold">18</div>
            </CardContent>
          </Card>
        </div>

        {/* Activity Table */}
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-transparent hover:border-border transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-green-500/10 flex items-center justify-center">
                      <ArrowDownLeft className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-bold text-sm">Payment Received</p>
                      <p className="text-xs text-muted-foreground">From 0x71...2a4b</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">+$50.00</p>
                    <p className="text-[10px] text-muted-foreground">2 hours ago</p>
                  </div>
                </div>
              ))}
              <Button variant="ghost" className="w-full text-xs text-muted-foreground">
                View all transactions
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
