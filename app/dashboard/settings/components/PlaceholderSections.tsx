"use client";

import React from "react";
import { Lock } from "lucide-react";

export function SecuritySection() {
  return (
    <div className="flex flex-col items-center justify-center py-20 bg-muted/20 rounded-2xl border border-dashed border-border/50">
      <div className="h-10 w-10 rounded-full bg-background flex items-center justify-center shadow-sm border border-border mb-3">
        <Lock className="h-5 w-5 text-muted-foreground" />
      </div>
      <p className="text-sm font-bold text-muted-foreground">Security Settings Coming Soon</p>
      <p className="text-[11px] text-muted-foreground/60 max-w-[200px] text-center mt-1">We're working hard to bring you more customization options.</p>
    </div>
  );
}

export function NotificationsSection() {
  return (
    <div className="flex flex-col items-center justify-center py-20 bg-muted/20 rounded-2xl border border-dashed border-border/50">
      <div className="h-10 w-10 rounded-full bg-background flex items-center justify-center shadow-sm border border-border mb-3">
        <Lock className="h-5 w-5 text-muted-foreground" />
      </div>
      <p className="text-sm font-bold text-muted-foreground">Notification Settings Coming Soon</p>
      <p className="text-[11px] text-muted-foreground/60 max-w-[200px] text-center mt-1">We're working hard to bring you more customization options.</p>
    </div>
  );
}
