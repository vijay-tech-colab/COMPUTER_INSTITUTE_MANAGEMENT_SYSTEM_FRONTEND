"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sun, Moon, Monitor, Sparkles, Zap, Check } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";

export function AppearanceSection() {
  const { theme, colorTheme, glassEnabled, setTheme, setColorTheme, setGlassEnabled } = useTheme();

  const colors = [
    { id: "blue", name: "Blue", hex: "#3b82f6" },
    { id: "purple", name: "Purple", hex: "#a855f7" },
    { id: "green", name: "Green", hex: "#22c55e" },
    { id: "orange", name: "Orange", hex: "#f97316" },
    { id: "red", name: "Red", hex: "#ef4444" },
  ];

  const themeModes = [
    { id: "light" as const, name: "Light", icon: Sun },
    { id: "dark" as const, name: "Dark", icon: Moon },
    { id: "system" as const, name: "System", icon: Monitor },
  ];

  return (
    <Card className="border-border/80 shadow-sm bg-card/50 backdrop-blur-sm overflow-hidden">
      <CardHeader className="p-5 border-b border-border/50 bg-muted/30">
        <div className="space-y-0.5">
          <CardTitle className="text-lg font-bold">Appearance</CardTitle>
          <CardDescription className="text-[11px]">Personalize the interface controls and colors.</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-8">
        {/* Theme Mode Segmented Style */}
        <div className="space-y-3">
          <Label className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground pl-0.5">Display Mode</Label>
          <div className="flex p-1 bg-muted/50 rounded-xl border border-border/50 w-full max-w-md">
            {themeModes.map((mode) => (
              <button
                key={mode.id}
                onClick={() => setTheme(mode.id)}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold rounded-lg transition-all relative",
                  theme === mode.id ? "text-primary" : "text-muted-foreground hover:text-foreground"
                )}
              >
                <mode.icon className="h-3.5 w-3.5" />
                <span>{mode.name}</span>
                {theme === mode.id && (
                  <motion.div
                    layoutId="mode-pill"
                    className="absolute inset-0 bg-background shadow-sm border border-border/50 rounded-lg -z-10"
                    transition={{ type: "spring", bounce: 0.1, duration: 0.4 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        <Separator className="opacity-50" />

        {/* Glass Effects Toggle */}
        <div className="flex items-center justify-between group">
          <div className="space-y-0.5">
            <Label className="text-sm font-bold flex items-center gap-2">
              Glass Effects
              <Sparkles className="h-3.5 w-3.5 text-primary animate-pulse" />
            </Label>
            <p className="text-[10px] text-muted-foreground">Enable translucent backgrounds and blur effects.</p>
          </div>
          <button
            onClick={() => setGlassEnabled(!glassEnabled)}
            className={cn(
              "relative h-5 w-10 rounded-full transition-colors duration-200 outline-none",
              glassEnabled ? "bg-primary" : "bg-muted-foreground/30"
            )}
          >
            <motion.div
              animate={{ x: glassEnabled ? 20 : 2 }}
              className="absolute top-1 h-3 w-3 bg-white rounded-full shadow-sm"
            />
          </button>
        </div>

        <Separator className="opacity-50" />

        {/* Color Swatches Style */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground pl-0.5">Accent Color</Label>
            <span className="text-[10px] font-bold text-primary capitalize tracking-wider flex items-center gap-1">
              <Zap className="h-3 w-3" /> {colorTheme}
            </span>
          </div>
          <div className="flex flex-wrap gap-4">
            {colors.map((color) => (
              <button
                key={color.id}
                //@ts-ignore
                onClick={() => setColorTheme(color.id)}
                className={cn(
                  "group relative h-10 w-10 rounded-xl flex items-center justify-center transition-all hover:scale-110 active:scale-95 shadow-sm",
                  colorTheme === color.id ? "ring-2 ring-primary ring-offset-2 ring-offset-background" : "hover:ring-2 hover:ring-muted-foreground/30 hover:ring-offset-1"
                )}
                style={{ backgroundColor: color.hex }}
                title={color.name}
              >
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
                {colorTheme === color.id && <Check className="h-5 w-5 text-white drop-shadow-md" />}
              </button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
