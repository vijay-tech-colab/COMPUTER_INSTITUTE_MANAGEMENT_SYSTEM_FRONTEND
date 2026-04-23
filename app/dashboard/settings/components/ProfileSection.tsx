"use client";

import React from "react";
import { User, Mail, Phone, Building2, Camera } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/useAuth.hook";
import { cn } from "@/lib/utils";

function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn("inline-flex items-center justify-center font-bold px-2 py-0.5 rounded border", className)}>
      {children}
    </span>
  );
}

export function ProfileSection() {
  const { useProfile, useUpdateProfile } = useAuth;
  const { data: profile } = useProfile();
  const updateProfileMutation = useUpdateProfile();

  const form = useForm({
    defaultValues: {
      name: profile?.user?.name || "",
      email: profile?.user?.email || "",
      phone: profile?.user?.phone || "",
      branch: profile?.user?.branch || "Main Branch",
    },
  });

  React.useEffect(() => {
    if (profile?.user) {
      form.reset({
        name: profile.user.name,
        email: profile.user.email,
        phone: profile.user.phone,
        branch: profile.user.branch,
      });
    }
  }, [profile, form]);

  const onUpdateProfile = async (values: any) => {
    try {
      await updateProfileMutation.mutateAsync(values);
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  return (
    <Card className="border-border/80 shadow-sm overflow-hidden bg-card/50 backdrop-blur-sm">
      <CardHeader className="p-5 border-b border-border/50 bg-muted/30">
        <div className="space-y-0.5">
          <CardTitle className="text-lg font-bold">Public Profile</CardTitle>
          <CardDescription className="text-[11px]">Manage your public presence in the institute.</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="flex items-center gap-5">
          <div className="relative group">
            <Avatar className="h-20 w-20 border-2 border-background ring-1 ring-border shadow-md">
              <AvatarImage src={profile?.user?.avatar?.url} />
              <AvatarFallback className="bg-primary text-primary-foreground text-xl font-bold">
                {profile?.user?.name?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
            <button className="absolute -bottom-1 -right-1 h-7 w-7 bg-primary text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-md cursor-pointer border-2 border-background">
              <Camera className="h-3.5 w-3.5" />
            </button>
          </div>
          <div className="space-y-1">
            <h3 className="font-bold text-base">{profile?.user?.name || "User Name"}</h3>
            <p className="text-[11px] text-muted-foreground">{profile?.user?.email}</p>
            <div className="flex gap-1.5 pt-1">
              <Badge className="h-5 px-1.5 text-[9px] uppercase tracking-wider bg-primary/10 text-primary border-primary/20 hover:bg-primary/10">
                {profile?.user?.role}
              </Badge>
              <Badge className="h-5 px-1.5 text-[9px] uppercase tracking-wider bg-muted text-muted-foreground border-border/50 hover:bg-muted">
                {profile?.user?.branch}
              </Badge>
            </div>
          </div>
        </div>

        <Separator className="opacity-50" />

        <form onSubmit={form.handleSubmit(onUpdateProfile)} className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          <div className="space-y-1.5">
            <Label className="text-[11px] font-bold text-muted-foreground/80 pl-0.5">Full Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 h-3.5 w-3.5 text-muted-foreground/60" />
              <Input {...form.register("name")} placeholder="Your name" className="pl-9 h-9 text-sm rounded-lg focus-visible:ring-1" />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label className="text-[11px] font-bold text-muted-foreground/80 pl-0.5">Email Address</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-3.5 w-3.5 text-muted-foreground/60" />
              <Input {...form.register("email")} placeholder="email@example.com" className="pl-9 h-9 text-sm rounded-lg focus-visible:ring-1" />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label className="text-[11px] font-bold text-muted-foreground/80 pl-0.5">Phone Number</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-2.5 h-3.5 w-3.5 text-muted-foreground/60" />
              <Input {...form.register("phone")} placeholder="+91 00000 00000" className="pl-9 h-9 text-sm rounded-lg focus-visible:ring-1" />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label className="text-[11px] font-bold text-muted-foreground/80 pl-0.5">Branch Name</Label>
            <div className="relative">
              <Building2 className="absolute left-3 top-2.5 h-3.5 w-3.5 text-muted-foreground/60" />
              <Input {...form.register("branch")} placeholder="Branch location" className="pl-9 h-9 text-sm rounded-lg focus-visible:ring-1" />
            </div>
          </div>
          <div className="md:col-span-2 pt-2 flex justify-end">
            <Button type="submit" disabled={updateProfileMutation.isPending} size="sm" className="h-9 px-6 font-bold rounded-lg shadow-sm active:scale-95 transition-transform">
              {updateProfileMutation.isPending ? "Updating..." : "Update Profile"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
