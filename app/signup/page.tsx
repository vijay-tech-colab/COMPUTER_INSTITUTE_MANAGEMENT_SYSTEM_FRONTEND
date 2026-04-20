"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Cpu, Lock, Mail, User, ArrowRight, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SignupPage() {
  const benefits = [
    "Unlimited student records",
    "Automated fee management",
    "Advanced performance analytics",
    "Multi-branch support"
  ];

  return (
    <div className="flex min-h-screen w-full bg-slate-50 overflow-hidden">
      {/* Right Side: Hero Section (using Flex Order to flip) */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative hidden w-1/2 flex-col justify-between bg-zinc-900 p-12 text-white lg:flex lg:order-last"
      >
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/auth-bg.png"
            alt="Hardware and Technology"
            fill
            className="object-cover opacity-30 mix-blend-soft-light grayscale transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-zinc-900 via-zinc-900/40 to-transparent" />
        </div>

        <div className="relative z-20 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 shadow-lg shadow-blue-500/20">
            <Cpu className="h-6 w-6 text-white" />
          </div>
          <span className="text-2xl font-bold tracking-tight">CIMS</span>
        </div>

        <div className="relative z-20 space-y-8">
          <div className="space-y-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-4xl font-heading font-bold leading-tight"
            >
              Start your <span className="text-blue-500">Journey</span> today.
            </motion.h2>
            <p className="max-w-md text-base text-zinc-400 font-sans">
              Join hundreds of institutes already scaling their operations with our world-class management system.
            </p>
          </div>

          <ul className="space-y-4">
            {benefits.map((benefit, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + (i * 0.1), duration: 0.5 }}
                className="flex items-center gap-3 text-zinc-300 font-sans"
              >
                <CheckCircle2 className="h-5 w-5 text-blue-500" />
                <span>{benefit}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        <div className="relative z-20 text-sm text-zinc-500 font-sans">
          © 2026 CIMS Inc. All rights reserved. Built for excellence.
        </div>
      </motion.div>

      {/* Left Side: Signup Form */}
      <div className="flex w-full items-center justify-center p-8 lg:w-1/2">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6 }}
           className="w-full max-w-sm space-y-6"
        >
          <div className="space-y-1 text-center lg:text-left">
            <h1 className="text-3xl font-heading font-bold tracking-tight text-zinc-900">Create account</h1>
            <p className="text-sm text-zinc-500">Get started by filling out the details below.</p>
          </div>

          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="signup-fullname" className="text-sm font-medium text-zinc-700 cursor-pointer">Full Name</Label>
              <div className="relative group">
                <User className="absolute left-3 top-3 h-4 w-4 text-zinc-400 group-focus-within:text-blue-500 transition-colors pointer-events-none" />
                <Input
                  id="signup-fullname"
                  type="text"
                  placeholder="John Doe"
                  className="pl-10 h-11 bg-white border-zinc-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all cursor-text shadow-sm"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="signup-email" className="text-sm font-medium text-zinc-700 cursor-pointer">Email address</Label>
              <div className="relative group">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-zinc-400 group-focus-within:text-blue-500 transition-colors pointer-events-none" />
                <Input
                  id="signup-email"
                  type="email"
                  placeholder="m@example.com"
                  className="pl-10 h-11 bg-white border-zinc-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all cursor-text shadow-sm"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="signup-password" title="password" className="text-sm font-medium text-zinc-700 cursor-pointer">Password</Label>
              <div className="relative group">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-zinc-400 group-focus-within:text-blue-500 transition-colors pointer-events-none" />
                <Input
                  id="signup-password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-10 h-11 bg-white border-zinc-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all cursor-text shadow-sm"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="signup-confirm-password" title="confirm-password" className="text-sm font-medium text-zinc-700 cursor-pointer">Confirm Password</Label>
              <div className="relative group">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-zinc-400 group-focus-within:text-blue-500 transition-colors pointer-events-none" />
                <Input
                  id="signup-confirm-password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-10 h-11 bg-white border-zinc-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all cursor-text shadow-sm"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Button className="w-full h-11 bg-zinc-900 hover:bg-zinc-800 text-white font-semibold transition-all group overflow-hidden relative cursor-pointer active:scale-[0.98]">
              <span className="relative z-10 flex items-center justify-center gap-2">
                Create Account <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Button>
            
            <p className="text-xs text-zinc-500 text-center font-sans">
              By creating an account, you agree to our <Link href="#" className="underline hover:text-zinc-800 cursor-pointer transition-colors">Terms</Link> and <Link href="#" className="underline hover:text-zinc-800 cursor-pointer transition-colors">Privacy Policy</Link>.
            </p>
          </div>

          <p className="text-center text-sm text-zinc-600">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-blue-600 hover:text-blue-500 underline-offset-4 hover:underline cursor-pointer">
              Sign in here
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
