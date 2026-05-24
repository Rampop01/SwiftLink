"use client"

import * as React from "react"
import { useAccount, useReadContract, useBalance, usePublicClient, useWatchContractEvent } from "wagmi"
import { SWIFTLINK_ABI, SWIFTLINK_ADDRESS } from "@/lib/contracts"
import { TransactionModal } from "@/components/TransactionModal"
import { toast } from "sonner"
import { formatUnits } from "viem"
import { Wallet } from "lucide-react"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardLinkCard } from "@/components/dashboard/dashboard-link-card"
import { DashboardBalanceCard } from "@/components/dashboard/dashboard-balance-card"
import { DashboardStats } from "@/components/dashboard/dashboard-stats"
import { RecentActivityFeed } from "@/components/dashboard/recent-activity-feed"

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
  const [selectedEvent, setSelectedEvent] = React.useState<ActivityEvent | null>(null)
  const [isTxModalOpen, setIsTxModalOpen] = React.useState(false)

  const fetchEvents = React.useCallback(async () => {
    if (!address || !publicClient) return
    
    try {
      const logs = await publicClient.getLogs({
        address: SWIFTLINK_ADDRESS,
        event: SWIFTLINK_ABI.find(x => x.type === 'event' && x.name === 'PaymentReceived') as any,
        args: { to: address },
        fromBlock: 67700000n // Celo mainnet safe recent block
      })

      const formattedEvents = await Promise.all(logs.map(async (log: any) => {
        const block = await publicClient.getBlock({ blockNumber: log.blockNumber })
        return {
          from: log.args.from,
          amount: formatUnits(log.args.amount, 18),
          timestamp: Number(block.timestamp) * 1000,
          hash: log.transactionHash,
          token: log.args.token === '0x0000000000000000000000000000000000000000' ? 'CELO' : 'cUSD'
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
        const tokenSymbol = newEvent.args.token === '0x0000000000000000000000000000000000000000' ? 'CELO' : 'cUSD';
        toast.success(`Received ${formatUnits(newEvent.args.amount, 18)} ${tokenSymbol}! ✨`);
        fetchEvents();
      }
    },
  })

  const totalCusd = events.filter(e => e.token === 'cUSD').reduce((acc, event) => acc + parseFloat(event.amount), 0);
  const totalCelo = events.filter(e => e.token === 'CELO').reduce((acc, event) => acc + parseFloat(event.amount), 0);
  const uniquePayers = new Set(events.map(event => event.from)).size;

  const [baseUrl, setBaseUrl] = React.useState("https://swiftlink.me")
  
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      setBaseUrl(`${window.location.protocol}//${window.location.host}`)
    }
  }, [])

  const paymentLink = username ? `${baseUrl}/pay/${username}` : ""

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
      <DashboardHeader username={username} paymentLink={paymentLink} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <DashboardLinkCard username={username} paymentLink={paymentLink} />
        <DashboardBalanceCard balanceData={balanceData as any} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <DashboardStats totalCusd={totalCusd} totalCelo={totalCelo} uniquePayers={uniquePayers} />
        
        <RecentActivityFeed 
          events={events} 
          isLoadingEvents={isLoadingEvents} 
          username={username}
          paymentLink={paymentLink}
          address={address}
          onEventClick={(event) => {
            setSelectedEvent(event);
            setIsTxModalOpen(true);
          }}
        />
      </div>

      <TransactionModal 
        isOpen={isTxModalOpen} 
        onClose={() => setIsTxModalOpen(false)} 
        event={selectedEvent} 
      />
    </div>
  )
}

