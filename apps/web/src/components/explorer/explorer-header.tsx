export function ExplorerHeader() {
  return (
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
  );
}
