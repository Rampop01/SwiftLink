"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Copy, 
  TrendingUp, 
  Users, 
  Wallet, 
  ArrowDownLeft,
  Share2,
  Link2,
  FileText
} from "lucide-react"
import { useAccount, useReadContract, useBalance, usePublicClient, useWatchContractEvent } from "wagmi"
import { SWIFTLINK_ABI, SWIFTLINK_ADDRESS } from "@/lib/contracts"
import { QRCodeModal } from "@/components/QRCodeModal"
import { Skeleton } from "@/components/ui/skeleton"
import { Tooltip } from "@/components/ui/tooltip"
import { toast } from "sonner"
import Link from "next/link"
import { formatUnits } from "viem"

interface ActivityEvent {
  from: string;
  amount: string;
  timestamp: number;
  hash: string;
}

export default function DashboardPage() {
  const { address, isConnected } = useAccount()
  
  // Get username for the connected address
  const { data: username } = useReadContract({
    address: SWIFTLINK_ADDRESS,
    abi: SWIFTLINK_ABI,
    functionName: "addressToUsername",
    args: [address as `0x${string}`],
    query: {
      enabled: !!address,
    },
  })

  // Get real balance
  const { data: balanceData } = useBalance({
    address: address,
  })

  const publicClient = usePublicClient()
  const [events, setEvents] = React.useState<ActivityEvent[]>([])
  const [isLoadingEvents, setIsLoadingEvents] = React.useState(true)

  const fetchEvents = React.useCallback(async () => {
    if (!address || !publicClient) return
    
    try {
      const logs = await publicClient.getLogs({
        address: SWIFTLINK_ADDRESS,
        event: SWIFTLINK_ABI.find(x => x.type === 'event' && x.name === 'PaymentReceived') as any,
        args: { to: address },
        fromBlock: 'earliest'
      })

      const formattedEvents = await Promise.all(logs.map(async (log: any) => {
        const block = await publicClient.getBlock({ blockNumber: log.blockNumber })
        return {
          from: log.args.from,
          amount: formatUnits(log.args.amount, 18),
          timestamp: Number(block.timestamp) * 1000,
          hash: log.transactionHash
        }
      }))

      setEvents(formattedEvents.sort((a, b) => b.timestamp - a.timestamp))
    } catch (error) {
      console.error("Error fetching events:", error)
    } finally {
      setIsLoadingEvents(false)
    }
  }, [address, publicClient])

  React.useEffect(() => {
    fetchEvents()
  }, [fetchEvents])

  // Watch for new events
  useWatchContractEvent({
    address: SWIFTLINK_ADDRESS,
    abi: SWIFTLINK_ABI,
    eventName: 'PaymentReceived',
    args: { to: address },
    onLogs(logs) {
      const newEvent = logs[0] as any;
      if (newEvent.args.to === address) {
        toast.success(`Received ${formatUnits(newEvent.args.amount, 18)} CELO! ✨`);
        fetchEvents();
      }
    },
  })

  const totalVolume = events.reduce((acc, event) => acc + parseFloat(event.amount), 0);
  const uniquePayers = new Set(events.map(event => event.from)).size;

  const paymentLink = username ? `swiftlink/pay/${username}` : ""

  const copyToClipboard = () => {
    if (!paymentLink) return
    navigator.clipboard.writeText(`https://${paymentLink}`)
    toast.success("Link copied to clipboard!")
  }

  if (!isConnected) {
    return (
      <div className="container flex items-center justify-center min-h-[calc(100vh-64px)]">
        <div className="max-w-md w-full text-center p-10 glass rounded-2xl glow-border">
          <Wallet className="h-16 w-16 mx-auto mb-6 text-primary opacity-30" />
          <h2 className="text-3xl font-black mb-3">Connect Wallet</h2>
          <p className="text-muted-foreground mb-8">Connect your wallet to access your SwiftLink dashboard.</p>
          <p className="text-sm font-bold text-primary">Use the button in the header →</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-12 max-w-7xl animate-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-black tracking-[-0.03em]">Dashboard</h1>
          <p className="text-muted-foreground font-medium">
            Welcome back{username ? `, @${username}` : ""}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {username && <QRCodeModal username={username} url={paymentLink} />}
          <Button variant="outline" asChild className="gap-2 h-10 px-5 rounded-xl text-sm font-semibold border-white/10 hover:bg-white/5">
            <Link href="/request">
              <FileText className="h-3.5 w-3.5" />
              Request
            </Link>
          </Button>
          <Button className="gap-2 h-10 px-5 rounded-xl text-sm font-semibold shadow-lg shadow-primary/20">
            <TrendingUp className="h-3.5 w-3.5" />
            Withdraw
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {/* Your Link Card */}
        <div className="md:col-span-2 glass rounded-2xl p-6 relative overflow-hidden group glow-border">
          <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
            <Link2 className="h-32 w-32 -rotate-12" />
          </div>
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground mb-1">Your Payment Link</p>
          <p className="text-sm text-muted-foreground mb-5">Share this link to receive cUSD and CELO</p>
          {username ? (
            <div className="flex items-center gap-2 p-4 bg-white/[0.03] rounded-xl border border-white/[0.06] transition-all hover:border-primary/30">
              <span className="text-base font-bold truncate flex-1 text-primary">{paymentLink}</span>
              <Button size="icon" variant="ghost" onClick={copyToClipboard} className="h-9 w-9 rounded-lg hover:bg-white/10">
                <Copy className="h-4 w-4" />
              </Button>
              <Button 
                size="icon" 
                variant="ghost" 
                className="h-9 w-9 rounded-lg hover:bg-white/10"
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: 'SwiftLink Payment Link',
                      text: `Pay me via SwiftLink:`,
                      url: `https://${paymentLink}`,
                    }).catch(console.error);
                  } else {
                    copyToClipboard();
                  }
                }}
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

        {/* Balance Card */}
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
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Stats Column */}
        <div className="md:col-span-1 space-y-6">
          <Card className="rounded-[1.5rem]">
            <CardContent className="pt-8 pb-8">
              <div className="flex items-center justify-between mb-4">
                <Tooltip content="Sum of all payments received in CELO">
                  <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground border-b border-dashed border-white/20 cursor-help">Total Volume</p>
                </Tooltip>
                <div className="h-8 w-8 rounded-full bg-green-500/10 flex items-center justify-center">
                  <ArrowDownLeft className="h-4 w-4 text-green-500" />
                </div>
              </div>
              <div className="text-4xl font-black">{totalVolume.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground mt-2 font-medium">CELO Received</p>
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

        {/* Activity Table */}
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
                onClick={() => {
                  const csv = [
                    ["Date", "From", "Amount", "Hash"].join(","),
                    ...events.map(e => [
                      new Date(e.timestamp).toISOString(),
                      e.from,
                      e.amount,
                      e.hash
                    ].join(","))
                  ].join("\n");
                  const blob = new Blob([csv], { type: 'text/csv' });
                  const url = window.URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.setAttribute('hidden', '');
                  a.setAttribute('href', url);
                  a.setAttribute('download', `swiftlink_activity_${username}.csv`);
                  document.body.appendChild(a);
                  a.click();
                  document.body.removeChild(a);
                  toast.success("Transaction history exported!");
                }}
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
                        className="flex items-center justify-between p-4 rounded-2xl bg-primary/[0.02] border border-primary/5 hover:border-primary/20 transition-all group"
                      >
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-full bg-green-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <ArrowDownLeft className="h-5 w-5 text-green-600" />
                          </div>
                          <div>
                            <p className="font-bold text-sm">Payment Received</p>
                            <p className="text-xs text-muted-foreground font-mono">from {event.from.slice(0, 6)}...{event.from.slice(-4)}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-black text-green-600">+{parseFloat(event.amount).toFixed(2)}</p>
                          <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">
                            {new Date(event.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
              ) : username ? (
                <div className="text-center py-20 border-2 border-dashed border-primary/10 rounded-[2rem] bg-primary/[0.02]">
                  <ArrowDownLeft className="h-16 w-16 mx-auto mb-6 text-primary opacity-10" />
                  <p className="text-xl font-bold text-muted-foreground/60">No recent transactions yet</p>
                  <p className="text-sm text-muted-foreground/40 mt-2 max-w-xs mx-auto">
                    Share your payment link to start receiving funds instantly.
                  </p>
                </div>
              ) : (
                <div className="p-8 rounded-2xl bg-yellow-500/5 border-2 border-yellow-500/10 text-yellow-700 font-bold flex flex-col items-center gap-4 text-center">
                  <Link2 className="h-10 w-10 opacity-40" />
                  <div>
                    <p className="text-lg">Handle Required</p>
                    <p className="text-sm font-medium opacity-70">Register a username to see your activity feed and start receiving payments.</p>
                  </div>
                  <Button size="sm" variant="outline" className="border-yellow-500/20 hover:bg-yellow-500/10" asChild>
                    <Link href="/register">Go to Register</Link>
                  </Button>
                </div>
              )}
              
              <Button variant="ghost" className="w-full h-12 rounded-xl text-sm font-bold text-muted-foreground hover:text-primary transition-colors" asChild>
                <a href={`https://celoscan.io/address/${address}`} target="_blank" rel="noopener noreferrer">
                  View all on Celoscan
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
