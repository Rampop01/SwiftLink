"use client"

import { useAccount, useChainId, useSwitchChain } from "wagmi"
import { celo } from "wagmi/chains"
import { AlertTriangle, ArrowRight } from "lucide-react"

export function NetworkBanner() {
  const { isConnected } = useAccount()
  const chainId = useChainId()
  const { switchChain } = useSwitchChain()

  // Only show if connected AND on wrong network
  if (!isConnected || chainId === celo.id) return null

  return (
    <div className="w-full bg-amber-500/10 border-b border-amber-500/20 backdrop-blur-xl">
      <div className="container flex items-center justify-center gap-3 py-2.5 px-4 max-w-screen-2xl">
        <AlertTriangle className="h-4 w-4 shrink-0 text-amber-400" />
        <p className="text-xs sm:text-sm font-semibold text-amber-200">
          You&apos;re connected to the wrong network.
        </p>
        <button
          onClick={() => switchChain({ chainId: celo.id })}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-amber-400 hover:text-amber-300 transition-colors underline underline-offset-2"
        >
          Switch to Celo
          <ArrowRight className="h-3 w-3" />
        </button>
      </div>
    </div>
  )
}
