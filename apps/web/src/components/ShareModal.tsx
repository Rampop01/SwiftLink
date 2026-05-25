"use client";
import * as React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Copy, Twitter, MessageCircle, Send, QrCode } from 'lucide-react';
import { toast } from 'sonner';
import { QRCodeSVG } from 'qrcode.react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  paymentLink: string;
  username?: string;
}

export function ShareModal({ isOpen, onClose, paymentLink, username }: ShareModalProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText(paymentLink);
    toast.success("Link copied to clipboard!");
    onClose();
  };

  const text = encodeURIComponent(`Pay me via SwiftLink! ⚡️`);
  const url = encodeURIComponent(paymentLink);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md glass glow-border rounded-[2rem] border-white/10 p-0 overflow-hidden">
        <div className="bg-gradient-to-br from-primary/20 via-background to-background p-8 pb-6 text-center">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black text-center mb-6">Share Payment Link</DialogTitle>
          </DialogHeader>
          
          <div className="flex justify-center mb-8">
            <div className="p-4 bg-white rounded-3xl shadow-xl shadow-primary/20 ring-4 ring-white/10 group hover:scale-105 transition-transform duration-300">
              <QRCodeSVG 
                value={paymentLink} 
                size={200}
                bgColor={"#ffffff"}
                fgColor={"#000000"}
                level={"Q"}
                includeMargin={false}
                imageSettings={{
                  src: "/favicon.ico", // Or a small swiftlink logo
                  x: undefined,
                  y: undefined,
                  height: 40,
                  width: 40,
                  excavate: true,
                }}
              />
            </div>
          </div>

          <div className="text-center mb-6 space-y-1">
            <p className="font-bold text-lg">@{username || 'SwiftLink User'}</p>
            <p className="text-xs font-mono text-muted-foreground break-all px-4">{paymentLink}</p>
          </div>
          
          <div className="grid grid-cols-4 gap-2">
            <Button 
              variant="outline" 
              className="h-20 flex flex-col gap-2 rounded-2xl bg-white/[0.02] border-white/5 hover:bg-primary/10 hover:border-primary/20 hover:text-primary transition-all group"
              onClick={() => window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank')}
            >
              <Twitter className="h-6 w-6 text-foreground group-hover:text-blue-400 transition-colors" />
              <span className="text-[10px] font-bold">X</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex flex-col gap-2 rounded-2xl bg-white/[0.02] border-white/5 hover:bg-primary/10 hover:border-primary/20 hover:text-primary transition-all group"
              onClick={() => window.open(`https://t.me/share/url?url=${url}&text=${text}`, '_blank')}
            >
              <Send className="h-6 w-6 text-foreground group-hover:text-blue-500 transition-colors" />
              <span className="text-[10px] font-bold">Telegram</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex flex-col gap-2 rounded-2xl bg-white/[0.02] border-white/5 hover:bg-primary/10 hover:border-primary/20 hover:text-primary transition-all group"
              onClick={() => window.open(`https://wa.me/?text=${text}%20${url}`, '_blank')}
            >
              <MessageCircle className="h-6 w-6 text-foreground group-hover:text-green-500 transition-colors" />
              <span className="text-[10px] font-bold">WhatsApp</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex flex-col gap-2 rounded-2xl bg-white/[0.02] border-white/5 hover:bg-primary/10 hover:border-primary/20 hover:text-primary transition-all group"
              onClick={handleCopy}
            >
              <Copy className="h-6 w-6 text-foreground group-hover:text-primary transition-colors" />
              <span className="text-[10px] font-bold">Copy</span>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
