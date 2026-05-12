"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ExternalLink, ArrowDownLeft, Clock, Wallet, Hash } from "lucide-react"
import { Button } from "@/components/ui/button"

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: {
    from: string;
    amount: string;
    timestamp: number;
    hash: string;
  } | null;
}

export function TransactionModal({ isOpen, onClose, event }: TransactionModalProps) {
  if (!event) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg glass-strong rounded-[2.5rem] border border-white/10 shadow-2xl overflow-hidden"
          >
            <div className="p-8">
              <div className="flex justify-between items-start mb-8">
                <div className="h-16 w-16 rounded-3xl bg-green-500/10 flex items-center justify-center">
                  <ArrowDownLeft className="h-8 w-8 text-green-500" />
                </div>
                <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full hover:bg-white/5">
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <h2 className="text-3xl font-black mb-1">Transaction</h2>
              <p className="text-muted-foreground mb-10 font-medium">Detailed receipt for on-chain activity</p>

              <div className="space-y-6">
                <div className="flex justify-between items-center p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span className="text-xs font-bold uppercase tracking-wider">Timestamp</span>
                  </div>
                  <span className="text-sm font-bold">{new Date(event.timestamp).toLocaleString()}</span>
                </div>

                <div className="flex justify-between items-center p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Wallet className="h-4 w-4" />
                    <span className="text-xs font-bold uppercase tracking-wider">Sender</span>
                  </div>
                  <span className="text-sm font-mono font-bold">{event.from.slice(0, 12)}...{event.from.slice(-10)}</span>
                </div>

                <div className="flex justify-between items-center p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <TrendingUp className="h-4 w-4" />
                    <span className="text-xs font-bold uppercase tracking-wider">Amount</span>
                  </div>
                  <span className="text-xl font-black text-green-500">+{parseFloat(event.amount).toFixed(4)} CELO</span>
                </div>

                <div className="flex justify-between items-center p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Hash className="h-4 w-4" />
                    <span className="text-xs font-bold uppercase tracking-wider">Hash</span>
                  </div>
                  <span className="text-xs font-mono opacity-60 truncate ml-4">{event.hash.slice(0, 20)}...</span>
                </div>
              </div>

              <div className="mt-10 flex gap-4">
                <Button 
                  className="flex-1 h-14 rounded-2xl font-bold text-base shadow-xl shadow-primary/20 group"
                  onClick={() => window.open(`https://celoscan.io/tx/${event.hash}`, '_blank')}
                >
                  View on Celoscan
                  <ExternalLink className="ml-2 h-4 w-4 opacity-40 group-hover:opacity-100 transition-opacity" />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

import { TrendingUp } from "lucide-react"
