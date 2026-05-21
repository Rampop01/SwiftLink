"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Search, Clock, ArrowDownLeft, UserPlus, ArrowRight, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface EventFeedProps {
  isLoading: boolean;
  events: any[];
}

export function EventFeed({ isLoading, events }: EventFeedProps) {
  return (
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
  );
}
