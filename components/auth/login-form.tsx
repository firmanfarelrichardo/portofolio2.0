"use client";

import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { authenticate } from "@/actions/auth-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const router = useRouter();
  const [state, dispatch] = useActionState(authenticate, undefined);

  useEffect(() => {
    if (state === "success") {
      router.push("/dashboard");
      router.refresh();
    }
  }, [state, router]);

  return (
    <Card className="border-border/50 shadow-xl bg-card/80 backdrop-blur-sm overflow-hidden">
      {/* Garis aksen di atas kartu untuk sentuhan estetika */}
      <div className="h-1.5 w-full bg-gradient-to-r from-primary to-secondary" />
      
      <CardContent className="pt-8 pb-8 px-6 sm:px-8">
        <form action={dispatch} className="space-y-6">
          
          {/* Input Group: Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="font-medium">Email Address</Label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="admin@firman.com"
              required
              className="h-11 bg-background/50 focus:bg-background border-border focus:border-primary transition-all duration-300"
            />
          </div>

          {/* Input Group: Password */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="font-medium">Password</Label>
            </div>
            <Input
              id="password"
              type="password"
              name="password"
              required
              className="h-11 bg-background/50 focus:bg-background border-border focus:border-primary transition-all duration-300"
            />
          </div>

          {/* Pesan Error (Jika ada) */}
          {state && state !== "success" && (
            <div className="p-3 text-sm font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 rounded-md border border-red-100 dark:border-red-900/30 flex items-center animate-in slide-in-from-top-2">
              <span className="mr-2">⚠️</span> {state}
            </div>
          )}

          {/* Tombol Submit */}
          <SubmitButton />
          
        </form>
      </CardContent>
    </Card>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button 
      type="submit" 
      className="w-full h-11 font-bold text-base shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all duration-300 group" 
      disabled={pending}
    >
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Memverifikasi...
        </>
      ) : (
        <>
          Masuk Dashboard
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </>
      )}
    </Button>
  );
}