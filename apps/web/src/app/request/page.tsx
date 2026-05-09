"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { 
  Sparkles, 
  Copy, 
  Check, 
  ArrowLeft, 
  DollarSign, 
  FileText,
  Loader2,
  Share2
} from "lucide-react"
import { useAccount, useReadContract } from "wagmi"
import { SWIFTLINK_ABI, SWIFTLINK_ADDRESS } from "@/lib/contracts"
import { toast } from "sonner"
import Link from "next/link"

export default function RequestPage() {
  const { address, isConnected } = useAccount()
  const [amount, setAmount] = React.useState("")
  const [concept, setConcept] = React.useState("")
  const [description, setDescription] = React.useState("")
  const [isGenerating, setIsGenerating] = React.useState(false)
  const [copied, setCopied] = React.useState(false)

  // Get username
  const { data: username } = useReadContract({
    address: SWIFTLINK_ADDRESS,
    abi: SWIFTLINK_ABI,
    functionName: "addressToUsername",
    args: [address as `0x${string}`],
  })

  const generateAIDescription = async () => {
    if (!concept) {
      toast.error("Please enter a concept first (e.g. 'Web Design')")
      return
    }

    setIsGenerating(true)
    // Simulating AI generation for a "Proof of Ship" demo
    // In a production app, this would call an API route with OpenAI/Gemini
    await new Promise(r => setTimeout(r, 1500))
    
    const templates = [
      `Professional ${concept} services tailored to your specific project requirements. Deliverables include full source files, documentation, and ongoing support to ensure maximum value.`,
      `High-quality ${concept} execution focusing on efficiency, performance, and modern standards. This payment covers the agreed-upon milestones and final project delivery.`,
      `Custom ${concept} solution developed specifically for your business needs. Includes strategic consultation, implementation, and quality assurance testing.`
    ]
    
    setDescription(templates[Math.floor(Math.random() * templates.length)])
    setIsGenerating(false)
    toast.success("AI generated a professional description!")
  }

  const generatedLink = username 
    ? `swiftlink.me/pay/${username}?amount=${amount}&desc=${encodeURIComponent(description)}`
    : ""

  const copyLink = () => {
    if (!generatedLink) return
    navigator.clipboard.writeText(`https://${generatedLink}`)
    setCopied(true)
    toast.success("Request link copied!")
    setTimeout(() => setCopied(false), 2000)
  }

  if (!isConnected) {
    return (
      <div className="container py-24 flex justify-center">
        <div className="max-w-md w-full text-center p-10 glass rounded-2xl glow-border">
          <h2 className="text-2xl font-black mb-2">Connect Wallet</h2>
          <p className="text-sm text-muted-foreground mb-6">You need to be connected to generate payment requests.</p>
          <Button asChild className="rounded-xl font-semibold">
            <Link href="/">Back Home</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-12 max-w-2xl animate-in">
      <div className="mb-12 flex items-center gap-4">
        <Button variant="ghost" size="icon" className="rounded-xl" asChild>
          <Link href="/dashboard"><ArrowLeft className="h-5 w-5" /></Link>
        </Button>
        <div>
          <h1 className="text-4xl font-black tracking-tighter">Request Payment</h1>
          <p className="text-muted-foreground font-medium">Generate a custom invoice link for your client</p>
        </div>
      </div>

      <div className="grid gap-6">
        <div className="glass rounded-2xl p-6 glow-border">
          <div className="flex items-center gap-2 mb-6">
            <FileText className="h-4 w-4 text-primary" />
            <p className="text-sm font-bold">Invoice Details</p>
          </div>
          <CardContent className="space-y-6 p-0">
            <div className="space-y-2">
              <Label htmlFor="amount">Requested Amount (cUSD)</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="amount" 
                  placeholder="0.00" 
                  className="pl-9 h-12 text-lg font-medium bg-white/[0.03] border-white/[0.08] rounded-xl"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="concept">What is this for?</Label>
              <div className="flex gap-2">
                <Input 
                  id="concept" 
                  placeholder="e.g. Website Development" 
                  className="h-12"
                  value={concept}
                  onChange={(e) => setConcept(e.target.value)}
                />
                <Button 
                  type="button" 
                  variant="secondary" 
                  className="h-12 gap-2 px-6 bg-primary/10 text-primary hover:bg-primary/20 border-primary/20 border transition-all"
                  onClick={generateAIDescription}
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Sparkles className="h-4 w-4" />
                  )}
                  AI Magic
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Professional Description</Label>
              <Textarea 
                id="description" 
                placeholder="The AI will help you write something professional here..." 
                className="min-h-[120px] resize-none focus-visible:ring-primary/20"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {description && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
            >
              <div className="glass rounded-2xl p-6 border-dashed border-primary/30 glow-border">
                <div className="mb-4">
                  <p className="text-sm font-bold uppercase tracking-wider text-primary">Your Shareable Link</p>
                </div>
                <div className="mb-6">
                  <div className="flex items-center gap-2 p-3 bg-white/[0.03] rounded-xl border border-white/[0.06] shadow-sm">
                    <span className="text-sm font-mono truncate flex-1">{generatedLink}</span>
                    <Button size="icon" variant="ghost" onClick={copyLink} className="h-8 w-8 hover:bg-white/10">
                      {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <div>
                  <Button className="w-full gap-2 h-12 rounded-xl font-bold shadow-lg shadow-primary/20 hover:shadow-primary/30" onClick={copyLink}>
                    <Share2 className="h-4 w-4" />
                    Copy & Send to Client
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
