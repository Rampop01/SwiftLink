"use client"

import * as React from "react"
import { QRCodeSVG } from "qrcode.react"
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogTrigger
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { QrCode, Download, Share2, Check, Copy } from "lucide-react"
import { toast } from "sonner"

interface QRCodeModalProps {
  username: string
  url: string
}

export function QRCodeModal({ username, url }: QRCodeModalProps) {
  const fullUrl = `https://${url}`
  const [downloaded, setDownloaded] = React.useState(false)
  const [copied, setCopied] = React.useState(false)

  const downloadQR = () => {
    const svg = document.getElementById("swiftlink-qr")
    if (!svg) return

    const svgData = new XMLSerializer().serializeToString(svg)
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    const img = new Image()
    
    img.onload = () => {
      canvas.width = img.width * 2
      canvas.height = img.height * 2
      ctx?.scale(2, 2)
      ctx?.drawImage(img, 0, 0)
      const pngFile = canvas.toDataURL("image/png")
      const downloadLink = document.createElement("a")
      downloadLink.download = `swiftlink-qr-${username}.png`
      downloadLink.href = pngFile
      downloadLink.click()
      setDownloaded(true)
      toast.success("QR Code downloaded!")
      setTimeout(() => setDownloaded(false), 2000)
    }
    
    img.src = "data:image/svg+xml;base64," + btoa(svgData)
  }

  const shareQR = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `SwiftLink - @${username}`,
          text: `Pay me on SwiftLink: ${fullUrl}`,
          url: fullUrl,
        })
      } catch (err) {
        console.error(err)
      }
    } else {
      navigator.clipboard.writeText(fullUrl)
      setCopied(true)
      toast.success("Link copied to clipboard!")
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const copyLink = () => {
    navigator.clipboard.writeText(fullUrl)
    setCopied(true)
    toast.success("Link copied!")
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2 h-10 px-5 rounded-xl text-sm font-semibold border-white/10 hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-all">
          <QrCode className="h-4 w-4" />
          My QR
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">Your SwiftLink QR</DialogTitle>
          <DialogDescription className="text-center">
            Scan this code to pay @{username} instantly.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center space-y-6 py-4">
          <div className="p-5 bg-white rounded-2xl shadow-inner border-8 border-primary/10">
            <QRCodeSVG
              id="swiftlink-qr"
              value={fullUrl}
              size={220}
              level="H"
              fgColor="#07955F"
              bgColor="#FFFFFF"
            />
          </div>

          {/* Copyable URL */}
          <button 
            onClick={copyLink}
            className="flex items-center gap-2 px-4 py-2.5 bg-white/[0.03] rounded-xl border border-white/[0.08] hover:border-primary/30 transition-all w-full group"
          >
            <span className="text-xs font-mono text-muted-foreground truncate flex-1 text-left group-hover:text-foreground transition-colors">
              {fullUrl}
            </span>
            {copied ? (
              <Check className="h-3.5 w-3.5 shrink-0 text-primary" />
            ) : (
              <Copy className="h-3.5 w-3.5 shrink-0 text-muted-foreground group-hover:text-primary transition-colors" />
            )}
          </button>
          
          {/* Action Buttons */}
          <div className="w-full grid grid-cols-2 gap-3">
            <Button 
              variant="outline" 
              className="gap-2 h-12 rounded-xl font-bold border-white/10 hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-all" 
              onClick={downloadQR}
            >
              {downloaded ? (
                <Check className="h-4 w-4 text-primary" />
              ) : (
                <Download className="h-4 w-4" />
              )}
              {downloaded ? "Saved!" : "Download"}
            </Button>
            <Button 
              className="gap-2 h-12 rounded-xl font-bold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all" 
              onClick={shareQR}
            >
              <Share2 className="h-4 w-4" />
              Share Link
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
