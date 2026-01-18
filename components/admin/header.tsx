"use client";

import Link from "next/link";
import { Menu, Package2, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"; // Perlu 'sheet'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"; // Perlu 'dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // Perlu 'avatar'
import { ThemeToggle } from "@/components/ui/theme-toggle"; // Yang sudah ada
import { Sidebar } from "./sidebar";

export function Header() {
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      
      {/* Mobile Sidebar Trigger */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col p-0">
           <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
           {/* Reuse komponen Sidebar untuk mobile */}
           <Sidebar className="border-none" />
        </SheetContent>
      </Sheet>

      {/* Spacer / Breadcrumb area (Bisa diisi nanti) */}
      <div className="w-full flex-1">
         <h1 className="text-lg font-semibold md:text-xl">Dashboard</h1>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2">
        <ThemeToggle />
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
               <Avatar className="h-8 w-8">
                  {/* Nanti diganti dengan image user asli */}
                  <AvatarImage src="" alt="User" /> 
                  <AvatarFallback><User className="h-4 w-4"/></AvatarFallback>
               </Avatar>
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive focus:bg-destructive/10">Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}