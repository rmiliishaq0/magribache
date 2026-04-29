import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center p-24 space-y-6 w-full h-[60vh] animate-in fade-in duration-500">
      <div className="relative flex items-center justify-center">
        <div className="absolute inset-0 rounded-full blur-xl bg-primary/20 animate-pulse"></div>
        <Loader2 className="h-14 w-14 animate-spin text-primary relative z-10" />
      </div>
      <div className="space-y-2 text-center">
        <h2 className="text-xl font-semibold text-foreground tracking-tight">Loading</h2>
        <p className="text-sm text-muted-foreground animate-pulse">Preparing your content...</p>
      </div>
    </div>
  );
}