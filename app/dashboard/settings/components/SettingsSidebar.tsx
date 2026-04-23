"use client";

import React from "react";
import { motion } from "framer-motion";
import { User, Lock, Bell, Palette } from "lucide-react";
import { cn } from "@/lib/utils";

interface SettingsSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function SettingsSidebar({ activeTab, setActiveTab }: SettingsSidebarProps) {
  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "security", label: "Security", icon: Lock },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "appearance", label: "Appearance", icon: Palette },
  ];

  return (
    <aside className="w-full lg:w-56 space-y-0.5">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group relative overflow-hidden",
            activeTab === tab.id
              ? "text-primary font-semibold"
              : "text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 hover:text-zinc-900 dark:hover:text-white"
          )}
        >
          <tab.icon className={cn("h-4 w-4 shrink-0 transition-colors", activeTab === tab.id ? "text-primary" : "text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300")} />
          <span className="text-sm truncate">{tab.label}</span>
          {activeTab === tab.id && (
            <motion.div
              layoutId="active-bg"
              className="absolute inset-0 bg-primary/10 dark:bg-primary/20 -z-10"
              transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
            />
          )}
          {activeTab === tab.id && (
            <motion.div
              layoutId="active-bar"
              className="absolute left-0 top-2 bottom-2 w-0.5 bg-primary rounded-full"
            />
          )}
        </button>
      ))}
    </aside>
  );
}
