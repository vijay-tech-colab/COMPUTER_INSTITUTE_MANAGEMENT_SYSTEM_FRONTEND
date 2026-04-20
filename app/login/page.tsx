"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Cpu, Lock, Mail, ArrowRight, Home, Lightbulb } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { loginSchema, LoginValues } from "@/lib/schemas/auth.schema";

export default function LoginPage() {
  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  function onSubmit(values: LoginValues) {
    console.log(values);
    // Add signup logic here
  }


  return (
    <div className="flex min-h-screen w-full bg-slate-50 overflow-hidden">
      {/* Left Side: Hero Section */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative hidden w-1/2 flex-col justify-between bg-zinc-900 p-12 text-white lg:flex"
      >
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/auth-bg.png"
            alt="Hardware and Technology"
            fill
            className="object-cover opacity-40 mix-blend-luminosity grayscale group-hover:grayscale-0 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/60 to-transparent" />
        </div>

        <div className="relative z-20 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 shadow-lg shadow-blue-500/20">
            <Cpu className="h-6 w-6 text-white" />
          </div>
          <span className="text-2xl font-bold tracking-tight">CIMS</span>
        </div>

        <div className="relative z-20 space-y-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-4xl font-heading font-bold leading-tight"
          >
            Empowering the <span className="text-blue-500">Next Generation</span> of Tech Leaders.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="max-w-md text-base text-zinc-400 font-sans"
          >
            Manage your institute with precision and scale. Our platform provides the tools you need to succeed in the digital era.
          </motion.p>
        </div>

        <div className="relative z-20">
          <blockquote className="space-y-2 border-l-2 border-blue-500 pl-6 italic font-sans">
            <p className="text-base text-zinc-300">
              &ldquo;This system has transformed how we manage students and staff. It&apos;s seamless, fast, and intuitive.&rdquo;
            </p>
            <footer className="text-xs font-medium text-zinc-500">— Director, CIMS</footer>
          </blockquote>
        </div>
      </motion.div>

      {/* Right Side: Login Form */}
      <div className="flex w-full items-center justify-center p-8 lg:w-1/2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-sm space-y-6"
        >
          <div className="space-y-1">
            <h1 className="text-3xl font-heading font-bold tracking-tight text-zinc-900">Sign in</h1>
            <p className="text-sm text-zinc-500">Welcome back. Please enter your details.</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-zinc-700 cursor-pointer">Email address</FormLabel>
                    <FormControl>
                      <div className="relative group">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-zinc-400 group-focus-within:text-blue-500 transition-colors pointer-events-none" />
                        <Input
                          {...field}
                          type="email"
                          placeholder="m@example.com"
                          className="pl-10 h-11 bg-white border-zinc-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all cursor-text shadow-sm"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel className="text-zinc-700 cursor-pointer">Password</FormLabel>
                      <Link href="#" className="text-sm font-medium text-blue-600 hover:text-blue-500 cursor-pointer transition-colors underline-offset-4 hover:underline">
                        Forgot password?
                      </Link>
                    </div>
                    <FormControl>
                      <div className="relative group">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-zinc-400 group-focus-within:text-blue-500 transition-colors pointer-events-none" />
                        <Input
                          {...field}
                          type="password"
                          placeholder="••••••••"
                          className="pl-10 h-11 bg-white border-zinc-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all cursor-text shadow-sm"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="remember"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="border-zinc-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 cursor-pointer"
                      />
                    </FormControl>
                    <FormLabel className="text-sm font-normal text-zinc-600 cursor-pointer select-none">
                      Keep me logged in for 30 days
                    </FormLabel>
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full h-11 bg-zinc-900 hover:bg-zinc-800 text-white font-semibold transition-all group overflow-hidden relative cursor-pointer active:scale-[0.98]">
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Sign in <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Button>
            </form>
          </Form>

          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-zinc-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-slate-50 px-3 text-zinc-400 font-medium">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="h-11 border-zinc-200 hover:bg-zinc-50 hover:text-zinc-900 cursor-pointer transition-all active:scale-[0.98]">
              <Lightbulb className="mr-2 h-4 w-4 text-blue-500" /> Google
            </Button>
            <Button variant="outline" className="h-11 border-zinc-200 hover:bg-zinc-50 hover:text-zinc-900 cursor-pointer transition-all active:scale-[0.98]">
              <Home className="mr-2 h-4 w-4 text-zinc-700" /> GitHub
            </Button>
          </div>

          <p className="text-center text-sm text-zinc-600">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="font-semibold text-blue-600 hover:text-blue-500 underline-offset-4 hover:underline cursor-pointer">
              Sign up for free
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
