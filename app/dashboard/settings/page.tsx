"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SettingsSidebar } from "./components/SettingsSidebar";
import { ProfileSection } from "./components/ProfileSection";
import { AppearanceSection } from "./components/AppearanceSection";
import { SecuritySection, NotificationsSection } from "./components/PlaceholderSections";
import { Cog } from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="flex flex-col gap-8 w-full max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Themed Settings Header */}
      <div className="space-y-1.5 px-1">
        <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
          <div className="p-2 rounded-xl bg-primary/10 text-primary">
            <Cog className="h-6 w-6 animate-[spin_4s_linear_infinite]" />
          </div>
          Account Settings
        </h1>
        <p className="text-sm text-muted-foreground font-medium pl-1">
          Manage your account preferences and interface <span className="text-primary font-bold">appearance</span>.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-10 items-start">
        {/* Navigation Sidebar */}
        <div className="w-full lg:w-60 lg:sticky lg:top-20">
          <SettingsSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>

        {/* Actionable Content Area */}
        <div className="flex-1 w-full min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="w-full"
            >
              {activeTab === "profile" && <ProfileSection />}
              {activeTab === "appearance" && <AppearanceSection />}
              {activeTab === "security" && <SecuritySection />}
              {activeTab === "notifications" && <NotificationsSection />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
