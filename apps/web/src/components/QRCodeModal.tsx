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
import { QrCode, Download, Share2 } from "lucide-react"
import { toast } from "sonner"

interface QRCodeModalProps {
  username: string
  url: string
}

export function QRCodeModal({ username, url }: QRCodeModalProps) {
  const fullUrl = `https://${url}`

  const downloadQR = () => {
    const svg = document.getElementById("swiftlink-qr")
    if (!svg) return

    const svgData = new XMLSerializer().serializeToString(svg)
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    const img = new Image()
    
    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height
      ctx?.drawImage(img, 0, 0)
      const pngFile = canvas.toDataURL("image/png")
      const downloadLink = document.createElement("a")
      downloadLink.download = `swiftlink-qr-${username}.png`
      downloadLink.href = pngFile
      downloadLink.click()
      toast.success("QR Code downloaded!")
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
      toast.success("Link copied to clipboard!")
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
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
        <div className="flex flex-col items-center justify-center space-y-8 py-6">
          <div className="p-4 bg-white rounded-2xl shadow-inner border-8 border-primary/5">
            <QRCodeSVG
              id="swiftlink-qr"
              value={fullUrl}
              size={240}
              level="H"
              imageSettings={{
                src: "/logo-icon.png", // We'll need to add a logo later
                x: undefined,
                y: undefined,
                height: 40,
                width: 40,
                excavate: true,
              }}
            />
          </div>
          
          <div className="w-full grid grid-cols-2 gap-4">
            <Button variant="secondary" className="gap-2 h-12" onClick={downloadQR}>
              <Download className="h-4 w-4" />
              Download
            </Button>
            <Button variant="default" className="gap-2 h-12" onClick={shareQR}>
              <Share2 className="h-4 w-4" />
              Share Link
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
