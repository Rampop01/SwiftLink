"use client"

import * as React from "react"
import { ExplorerHeader } from "@/components/explorer/explorer-header"
import { ExplorerStats } from "@/components/explorer/explorer-stats"
import { EventFeed } from "@/components/explorer/event-feed"
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
      <ExplorerHeader />
      <ExplorerStats isLoading={isLoading} stats={stats} />
      <EventFeed isLoading={isLoading} events={events} />
    </div>
  )
}
