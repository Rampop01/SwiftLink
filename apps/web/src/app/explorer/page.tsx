"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { 
  Search, 
  Activity, 
  ArrowDownLeft, 
  UserPlus, 
  ExternalLink,
  Wallet,
  Clock,
  ArrowRight
} from "lucide-react"
import { usePublicClient } from "wagmi"
import { SWIFTLINK_ABI, SWIFTLINK_ADDRESS } from "@/lib/contracts"
import { formatUnits } from "viem"

export default function ExplorerPage() {
  const publicClient = usePublicClient()
  const [events, setEvents] = React.useState<any[]>([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [stats, setStats] = React.useState({ txns: 0, volume: 0, users: 0 })

  const fetchEvents = React.useCallback(async () => {
    if (!publicClient) return
    
    try {
      // Fetch latest Payment events
      const paymentLogs = await publicClient.getLogs({
        address: SWIFTLINK_ADDRESS,
        event: SWIFTLINK_ABI.find(x => x.type === 'event' && x.name === 'PaymentReceived') as any,
        fromBlock: 'earliest' // In production, we'd limit this or use an indexer
      })

      // Fetch latest Registration events
      const registrationLogs = await publicClient.getLogs({
        address: SWIFTLINK_ADDRESS,
        event: SWIFTLINK_ABI.find(x => x.type === 'event' && x.name === 'ProfileRegistered') as any,
        fromBlock: 'earliest'
      })

      // Calculate stats
      const volume = paymentLogs.reduce((acc, log: any) => acc + parseFloat(formatUnits(log.args.amount, 18)), 0)
      setStats({
        txns: paymentLogs.length,
        volume: volume,
        users: registrationLogs.length
      })

      // Format events
      const formattedPayments = await Promise.all(paymentLogs.map(async (log: any) => {
        const block = await publicClient.getBlock({ blockNumber: log.blockNumber })
        return {
          type: 'payment',
          from: log.args.from,
          to: log.args.to,
          amount: formatUnits(log.args.amount, 18),
          timestamp: Number(block.timestamp) * 1000,
          hash: log.transactionHash
        }
      }))

      const formattedRegistrations = await Promise.all(registrationLogs.map(async (log: any) => {
        const block = await publicClient.getBlock({ blockNumber: log.blockNumber })
        return {
          type: 'registration',
          user: log.args.user,
          username: log.args.username,
          timestamp: Number(block.timestamp) * 1000,
          hash: log.transactionHash
        }
      }))

      // Combine and sort by timestamp
      const allEvents = [...formattedPayments, ...formattedRegistrations].sort((a, b) => b.timestamp - a.timestamp)
      setEvents(allEvents)
    } catch (error) {
      console.error("Error fetching explorer events:", error)
    } finally {
      setIsLoading(false)
    }
  }, [publicClient])

  React.useEffect(() => {
    fetchEvents()
    // Auto refresh every 30s
    const interval = setInterval(fetchEvents, 30000)
    return () => clearInterval(interval)
  }, [fetchEvents])

  return (
    <div className="container py-12 max-w-5xl animate-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.15em] text-primary">Live Feed</span>
          </div>
          <h1 className="text-4xl font-black tracking-[-0.03em]">On-Chain Explorer</h1>
          <p className="text-muted-foreground font-medium mt-2">
            Real-time transparency. Watch SwiftLink activity happen live on Celo.
          </p>
        </div>
      </div>
      
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
           <p className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground mb-1">Volume (CELO)</p>
           <div className="text-3xl font-black text-gradient mt-4">{isLoading ? "-" : stats.volume.toFixed(2)}</div>
        </div>
        <div className="glass-strong rounded-2xl p-6 glow-border relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
             <UserPlus className="h-24 w-24" />
           </div>
           <p className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground mb-1">Registered Users</p>
           <div className="text-3xl font-black text-gradient mt-4">{isLoading ? "-" : stats.users}</div>
        </div>
      </div>

      <Card className="rounded-[2rem] border-white/5 bg-black/40 backdrop-blur-xl overflow-hidden">
        <CardContent className="p-0">
          <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Latest Events
            </h2>
            <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground bg-white/5 px-3 py-1.5 rounded-full">
              <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              Auto-refreshing (30s)
            </div>
          </div>
          
          <div className="divide-y divide-white/5">
            {isLoading ? (
              <div className="text-center py-20 text-muted-foreground">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/5 mb-4 animate-pulse">
                  <Search className="h-5 w-5 opacity-50" />
                </div>
                <p className="font-medium animate-pulse">Connecting to network...</p>
              </div>
            ) : events.length === 0 ? (
              <div className="text-center py-20 text-muted-foreground">
                <p>No activity found on the network yet.</p>
              </div>
            ) : (
              <AnimatePresence>
                {events.map((event, idx) => (
                  <motion.div
                    key={event.hash + idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: Math.min(idx * 0.05, 0.5) }}
                    className="p-4 sm:p-6 hover:bg-white/[0.02] transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group"
                  >
                    <div className="flex items-center gap-4">
                      {event.type === 'payment' ? (
                        <div className="h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center border border-green-500/20 group-hover:scale-110 transition-transform">
                          <ArrowDownLeft className="h-5 w-5 text-green-500" />
                        </div>
                      ) : (
                        <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20 group-hover:scale-110 transition-transform">
                          <UserPlus className="h-5 w-5 text-blue-500" />
                        </div>
                      )}
                      
                      <div>
                        {event.type === 'payment' ? (
                          <>
                            <p className="font-bold text-base mb-1">Payment Processed</p>
                            <p className="text-xs text-muted-foreground font-mono flex items-center gap-1.5 flex-wrap">
                              <span className="text-foreground/70">{event.from.slice(0, 6)}...{event.from.slice(-4)}</span>
                              <ArrowRight className="h-3 w-3" />
                              <span className="text-foreground/70">{event.to.slice(0, 6)}...{event.to.slice(-4)}</span>
                            </p>
                          </>
                        ) : (
                          <>
                            <p className="font-bold text-base mb-1 text-blue-400">New Handle Claimed</p>
                            <p className="text-xs text-muted-foreground">
                              User claimed <span className="font-bold text-foreground">swiftlink/pay/{event.username}</span>
                            </p>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-2">
                      {event.type === 'payment' ? (
                        <p className="font-black text-green-500 text-lg">+{parseFloat(event.amount).toFixed(2)} CELO</p>
                      ) : (
                        <p className="font-bold text-blue-400 text-sm tracking-widest uppercase">Verified</p>
                      )}
                      <div className="flex items-center gap-3">
                        <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">
                          {new Date(event.timestamp).toLocaleTimeString()}
                        </p>
                        <a 
                          href={`https://celoscan.io/tx/${event.hash}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
