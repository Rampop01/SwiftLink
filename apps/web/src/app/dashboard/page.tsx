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

  const paymentLink = username ? `swiftlink.me/pay/${username}` : ""

  const copyToClipboard = () => {
    if (!paymentLink) return
    navigator.clipboard.writeText(`https://${paymentLink}`)
    toast.success("Link copied to clipboard!")
  }

  if (!isConnected) {
    return (
      <div className="container flex items-center justify-center min-h-[calc(100vh-64px)]">
        <Card className="max-w-md w-full text-center p-8 border-2 shadow-xl">
          <Wallet className="h-16 w-16 mx-auto mb-6 text-primary opacity-20" />
          <h2 className="text-3xl font-black mb-3">Connect Wallet</h2>
          <p className="text-muted-foreground mb-8">Please connect your wallet to view your personalized SwiftLink dashboard.</p>
          <div className="flex justify-center">
             {/* RainbowKit button should be in the navbar, but we provide a hint here */}
             <p className="text-sm font-bold text-primary">Use the button in the header to connect</p>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="container py-12 max-w-7xl animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h1 className="text-5xl font-black tracking-tighter">Dashboard</h1>
          <p className="text-lg text-muted-foreground font-medium">
            Welcome back{username ? `, @${username}` : ""}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          {username && <QRCodeModal username={username} url={paymentLink} />}
          <Button variant="outline" asChild className="gap-2 h-12 px-6 rounded-xl font-bold">
            <Link href="/request">
              <FileText className="h-4 w-4" />
              Request
            </Link>
          </Button>
          <Button className="gap-2 h-12 px-6 rounded-xl font-bold shadow-xl shadow-primary/20">
            <TrendingUp className="h-4 w-4" />
            Withdraw
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {/* Your Link Card */}
        <Card className="md:col-span-2 border-2 border-primary/20 bg-primary/5 relative overflow-hidden group rounded-[2rem]">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
            <Link2 className="h-40 w-40 -rotate-12" />
          </div>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Your Payment Link</CardTitle>
            <CardDescription className="text-base">Share this link to receive cUSD and CELO instantly</CardDescription>
          </CardHeader>
          <CardContent>
            {username ? (
              <div className="flex items-center gap-3 p-5 bg-background rounded-2xl border-2 border-primary/10 shadow-lg transition-all hover:border-primary/30">
                <span className="text-xl font-bold truncate flex-1 text-primary">{paymentLink}</span>
                <Button size="icon" variant="ghost" onClick={copyToClipboard} className="h-12 w-12 rounded-xl">
                  <Copy className="h-5 w-5" />
                </Button>
                <Button size="icon" variant="ghost" className="h-12 w-12 rounded-xl">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            ) : (
              <div className="p-8 bg-background/50 rounded-2xl border-2 border-dashed border-primary/20 text-center">
                <p className="text-lg font-medium text-muted-foreground mb-6">You haven't registered a username yet</p>
                <Button size="lg" className="rounded-full px-10 font-bold" asChild>
                  <Link href="/register">Register My Handle</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Balance Card */}
        <Card className="bg-foreground text-background rounded-[2rem] shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[60px] -mr-16 -mt-16" />
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2 font-bold opacity-80">
              <Wallet className="h-5 w-5" />
              Wallet Balance
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-5xl font-black tracking-tighter mb-2">
              {balanceData ? `${parseFloat(balanceData.formatted).toFixed(2)} ${balanceData.symbol}` : "0.00 CELO"}
            </div>
            <div className="inline-flex items-center gap-1 px-3 py-1 bg-background/10 rounded-full text-xs font-bold uppercase tracking-widest opacity-60">
              Live from Celo Mainnet
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Stats Column */}
        <div className="md:col-span-1 space-y-6">
          <Card className="rounded-[1.5rem]">
            <CardContent className="pt-8 pb-8">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Total Payments</p>
                <div className="h-8 w-8 rounded-full bg-green-500/10 flex items-center justify-center">
                  <ArrowDownLeft className="h-4 w-4 text-green-500" />
                </div>
              </div>
              <div className="text-4xl font-black">--</div>
              <p className="text-xs text-muted-foreground mt-2 font-medium">Coming soon</p>
            </CardContent>
          </Card>
          <Card className="rounded-[1.5rem]">
            <CardContent className="pt-8 pb-8">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Unique Payers</p>
                <div className="h-8 w-8 rounded-full bg-blue-500/10 flex items-center justify-center">
                  <Users className="h-4 w-4 text-blue-500" />
                </div>
              </div>
              <div className="text-4xl font-black">--</div>
              <p className="text-xs text-muted-foreground mt-2 font-medium">Coming soon</p>
            </CardContent>
          </Card>
        </div>

        {/* Activity Table */}
        <Card className="md:col-span-3 rounded-[2rem]">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Recent Activity</CardTitle>
            <CardDescription className="font-medium text-primary/60">Live updates from the Celo network</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {isLoadingEvents ? (
                <div className="flex flex-col items-center justify-center py-20 animate-pulse">
                  <div className="h-12 w-12 rounded-full bg-primary/10 mb-4" />
                  <div className="h-4 w-32 bg-primary/10 rounded" />
                </div>
              ) : events.length > 0 ? (
                <div className="space-y-4">
                  {events.map((event, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 rounded-2xl bg-primary/[0.02] border border-primary/5 hover:border-primary/20 transition-all group">
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
                    </div>
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
