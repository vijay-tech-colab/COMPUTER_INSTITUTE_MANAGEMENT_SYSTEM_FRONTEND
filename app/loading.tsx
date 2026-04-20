"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#121417] px-4 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -z-10 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-600/10 blur-[120px]" />

      <div className="relative flex items-center justify-center">
        {/* Central Text */}
        <motion.div
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute z-50 text-xs font-bold tracking-[0.2em] text-cyan-200 uppercase"
        >
          Loading
        </motion.div>

        {/* Outer Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="h-48 w-48 rounded-full border-t border-r border-cyan-500/30 border-l-transparent border-b-transparent"
        />

        {/* Middle Ring - Incomplete segments */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          className="absolute h-36 w-36 rounded-full border-2 border-dashed border-cyan-400/40"
        />

        {/* Inner Ring - Fast & Thick */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute h-24 w-24 rounded-full border-t-2 border-b-2 border-cyan-400 border-l-transparent border-r-transparent"
        />

        {/* Extra Decorative Arcs */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute h-64 w-64 rounded-full border border-cyan-600/10 border-t-transparent border-r-transparent"
        />

        {/* Floating Particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -20, 0],
              opacity: [0, 0.5, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut",
            }}
            className="absolute rounded-full bg-cyan-400/20"
            style={{
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              left: `${Math.random() * 200 - 100}px`,
              top: `${Math.random() * 200 - 100}px`,
            }}
          />
        ))}
      </div>

      {/* Progress Line */}
      <div className="mt-20 w-32 h-[1px] bg-cyan-950 relative overflow-hidden">
        <motion.div
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
        />
      </div>
    </div>
  );
}
