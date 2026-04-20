"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Cpu, ArrowRight, Shield, Zap, BarChart3, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Page() {
  const features = [
    { icon: Zap, title: "Lighting Fast", description: "Optimized for speed and efficiency." },
    { icon: Shield, title: "Secure", description: "Enterprise-grade security for your data." },
    { icon: BarChart3, title: "Analytics", description: "Real-time insights and reports." },
    { icon: Globe, title: "Cloud Ready", description: "Access from anywhere, anytime." },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 font-sans">
      {/* Navbar */}
      <header className="sticky top-0 z-40 w-full border-b border-zinc-200 bg-white/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-8">
          <Link href="/" className="flex items-center gap-2 cursor-pointer group">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 transition-transform group-hover:scale-105">
              <Cpu className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-heading font-bold tracking-tight text-zinc-900">CIMS</span>
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            <Link href="#features" className="text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors cursor-pointer">Features</Link>
            <Link href="#pricing" className="text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors cursor-pointer">Pricing</Link>
            <Link href="#docs" className="text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors cursor-pointer">Documentation</Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" className="hidden sm:inline-flex cursor-pointer transition-all active:scale-95">Sign in</Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-zinc-900 hover:bg-zinc-800 text-white cursor-pointer transition-all active:scale-95 shadow-sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-8">
            <div className="flex flex-col items-center text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600"
              >
                Now in Private Beta
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mt-6 max-w-3xl text-4xl font-heading font-extrabold tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl"
              >
                Manage your <span className="text-blue-600">Institute</span> like a Pro.
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-4 max-w-2xl text-base text-zinc-600 font-sans"
              >
                The all-in-one platform for computer institutes to manage students, fees, schedules, and analytics with ease.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-10 flex flex-wrap justify-center gap-4"
              >
                <Link href="/signup">
                  <Button size="lg" className="h-12 px-8 text-base bg-zinc-900 hover:bg-zinc-800 text-white group cursor-pointer transition-all active:scale-[0.98]">
                    Start Managing <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/login">
                  <Button size="lg" variant="outline" className="h-12 px-8 text-base border-zinc-200 cursor-pointer transition-all active:scale-[0.98]">
                    Live Demo
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
          
          {/* Decorative Background Elements */}
          <div className="absolute top-1/2 left-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-100 blur-[120px] opacity-40 pointer-events-none" />
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-8">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group relative flex flex-col items-center rounded-2xl border border-zinc-100 bg-zinc-50/50 p-8 text-center transition-all hover:bg-white hover:shadow-xl hover:shadow-zinc-200/50 cursor-default"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm transition-all group-hover:bg-blue-600 group-hover:text-white">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-6 text-xl font-heading font-bold text-zinc-900">{feature.title}</h3>
                  <p className="mt-2 text-zinc-500 text-sm font-sans">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-zinc-200 bg-white py-12">
        <div className="container mx-auto px-4 text-center sm:px-8">
          <p className="text-zinc-500 text-sm font-sans">© 2026 CIMS. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}