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
        <div className="glass-strong rounded-2xl p-6 glow-border relative overflow-hidden">
           <div className="absolute top-0 right-0 p-4 opacity-5">
             <Activity className="h-24 w-24" />
           </div>
           <p className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground mb-1">Total Transactions</p>
           <div className="text-3xl font-black text-gradient mt-4">0</div>
        </div>
        <div className="glass-strong rounded-2xl p-6 glow-border relative overflow-hidden">
           <div className="absolute top-0 right-0 p-4 opacity-5">
             <Wallet className="h-24 w-24" />
           </div>
           <p className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground mb-1">Volume (CELO)</p>
           <div className="text-3xl font-black text-gradient mt-4">0.00</div>
        </div>
        <div className="glass-strong rounded-2xl p-6 glow-border relative overflow-hidden">
           <div className="absolute top-0 right-0 p-4 opacity-5">
             <UserPlus className="h-24 w-24" />
           </div>
           <p className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground mb-1">Registered Users</p>
           <div className="text-3xl font-black text-gradient mt-4">0</div>
        </div>
      </div>

      <Card className="rounded-[2rem] border-white/5 bg-black/40 backdrop-blur-xl">
        <CardContent className="p-0">
          <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/[0.02] rounded-t-[2rem]">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Latest Events
            </h2>
            <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground bg-white/5 px-3 py-1.5 rounded-full">
              <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              Auto-refreshing
            </div>
          </div>
          
          <div className="p-6">
            <div className="text-center py-20 text-muted-foreground">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/5 mb-4">
                <Search className="h-5 w-5 opacity-50" />
              </div>
              <p className="font-medium">Connecting to network...</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
