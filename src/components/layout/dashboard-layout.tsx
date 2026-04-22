"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Bus, 
  Bell, 
  BarChart3, 
  Wrench, 
  Network, 
  Database, 
  LineChart,
  Settings,
  LogOut,
  Cpu
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { name: 'Overview', href: '/', icon: LayoutDashboard },
  { name: 'Vehicles', href: '/vehicles', icon: Bus },
  { name: 'Alerts', href: '/alerts', icon: Bell },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Maintenance', href: '/maintenance', icon: Wrench },
  { name: 'CNDC / Network', href: '/network', icon: Network },
  { name: 'DBMS / Entity', href: '/dbms', icon: Database },
  { name: 'Inferential Stats', href: '/stats', icon: LineChart },
];

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-sidebar hidden md:flex flex-col">
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
            <Cpu className="text-white w-6 h-6" />
          </div>
          <div>
            <h1 className="font-headline font-bold text-xl tracking-tight text-sidebar-foreground">DIGGI FLAPS</h1>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">Smart Monitoring</p>
          </div>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group",
                pathname === item.href 
                  ? "bg-primary text-white" 
                  : "text-sidebar-foreground hover:bg-primary/10 hover:text-primary"
              )}
            >
              <item.icon className={cn("w-5 h-5", pathname === item.href ? "text-white" : "text-muted-foreground group-hover:text-primary")} />
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-border mt-auto">
          <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-red-400 hover:bg-red-400/10 transition-all w-full">
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Header */}
        <header className="h-16 border-b border-border bg-card/50 backdrop-blur-md flex items-center justify-between px-8 z-10">
          <div className="flex items-center gap-4">
            <h2 className="font-headline font-semibold text-lg">
              {navItems.find(item => item.href === pathname)?.name || 'Dashboard'}
            </h2>
            <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 rounded-full border border-green-500/20">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] font-bold text-green-500 uppercase">System Live</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-semibold">Admin Panel</p>
              <p className="text-[10px] text-muted-foreground">Academic Project - 2024</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-muted border border-border overflow-hidden ring-2 ring-primary/20">
               <img src="https://picsum.photos/seed/user1/40/40" alt="User" />
            </div>
          </div>
        </header>

        {/* Scrollable Area */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          {children}
        </div>
      </main>
    </div>
  );
}
