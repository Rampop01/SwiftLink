import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { QRCodeModal } from "@/components/QRCodeModal";

interface DashboardHeaderProps {
  username?: string;
  paymentLink: string;
}

export function DashboardHeader({ username, paymentLink }: DashboardHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
      <div>
        <h1 className="text-4xl font-black tracking-[-0.03em]">Dashboard</h1>
        <p className="text-muted-foreground font-medium">
          Welcome back{username ? `, @${username}` : ""}
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        {username && <QRCodeModal username={username} url={paymentLink} />}
        <Button variant="outline" asChild className="gap-2 h-10 px-5 rounded-xl text-sm font-semibold border-white/10 hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-all">
          <Link href="/request">
            <FileText className="h-3.5 w-3.5" />
            Request
          </Link>
        </Button>
      </div>
    </div>
  );
}
